import argparse
import json
import mimetypes
from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler
from pathlib import Path
from urllib.parse import urlparse, unquote

from generate_index import parse_front_matter, normalize_tags, normalize_category


def _choose_build_root(cli_value: str | None) -> Path:
    if cli_value:
        return Path(cli_value)
    for candidate in (Path('website') / 'web', Path('build') / 'web'):
        if candidate.exists():
            return candidate
    raise SystemExit('No build root found. Use --build-root to set it.')


def _iter_md_files(source: Path):
    if source.is_file():
        if source.suffix.lower() == '.md':
            yield source
        return
    for md_file in source.rglob('*.md'):
        yield md_file


def _build_index_entries(source: Path, preview_posts_dir: Path):
    posts = []
    source = source.resolve()

    for md_file in _iter_md_files(source):
        content = md_file.read_text(encoding='utf-8')
        fm = parse_front_matter(content) or {}

        if source.is_file():
            relative_path = md_file.name
        else:
            relative_path = md_file.resolve().relative_to(source).as_posix()

        slug = (fm.get('slug') or md_file.stem).strip()
        title = (fm.get('title') or md_file.stem).strip()
        date = (fm.get('date') or '1970-01-01').strip()
        updated = (fm.get('updated') or fm.get('update') or fm.get('lastmod') or '').strip()
        tags = normalize_tags(fm.get('tags'))
        category = normalize_category(fm.get('category') or fm.get('categories'))

        posts.append({
            'slug': slug,
            'title': title or '(No title)',
            'date': date,
            'updated': updated or date,
            'excerpt': fm.get('excerpt'),
            'cover': fm.get('cover'),
            'tags': tags,
            'category': category,
            'path': f'/post/{slug}',
            'md': relative_path,
        })

        target = preview_posts_dir / relative_path
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(content, encoding='utf-8')

    posts.sort(key=lambda x: x['updated'], reverse=True)
    return posts


def _sync_assets(source: Path, preview_posts_dir: Path):
    if source.is_file():
        return
    for asset in source.rglob('*'):
        if asset.is_dir() or asset.suffix.lower() == '.md':
            continue
        rel = asset.resolve().relative_to(source).as_posix()
        target = preview_posts_dir / rel
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(asset.read_bytes())


class PreviewHandler(BaseHTTPRequestHandler):
    server_version = 'PreviewServer/1.0'

    def do_GET(self):
        self._serve()

    def do_HEAD(self):
        self._serve(head_only=True)

    def _serve(self, head_only: bool = False):
        parsed = urlparse(self.path)
        path = unquote(parsed.path)

        file_path = self.server.resolve_path(path)
        if file_path is None or not file_path.exists():
            self.send_error(404, 'File not found')
            return

        content_type = self.guess_type(str(file_path))
        try:
            with file_path.open('rb') as fh:
                data = fh.read()
        except OSError:
            self.send_error(404, 'File not found')
            return

        self.send_response(200)
        self.send_header('Content-Type', content_type)
        self.send_header('Content-Length', str(len(data)))
        self.end_headers()
        if not head_only:
            self.wfile.write(data)

    def guess_type(self, path):
        mime, _ = mimetypes.guess_type(path)
        if path.endswith('.wasm'):
            return 'application/wasm'
        return mime or 'application/octet-stream'


class PreviewServer(ThreadingHTTPServer):
    def __init__(self, server_address, handler_cls, base_dir, preview_posts_dir, fallback_posts_dir):
        super().__init__(server_address, handler_cls)
        self.base_dir = base_dir
        self.preview_posts_dir = preview_posts_dir
        self.fallback_posts_dir = fallback_posts_dir

    def resolve_path(self, url_path: str) -> Path | None:
        if url_path.startswith('/posts/'):
            rel = url_path[len('/posts/'):].lstrip('/')
            if rel == '':
                rel = 'index.json'
            candidate = self.preview_posts_dir / rel
            if candidate.exists():
                return candidate
            fallback = self.fallback_posts_dir / rel
            if fallback.exists():
                return fallback
            return None

        rel = url_path.lstrip('/')
        candidate = self.base_dir / rel
        if candidate.is_dir():
            candidate = candidate / 'index.html'
        if candidate.exists():
            return candidate

        if '.' not in Path(url_path).name:
            index_path = self.base_dir / 'index.html'
            if index_path.exists():
                return index_path

        return None


def main():
    parser = argparse.ArgumentParser(description='Preview markdown with the Flutter web build.')
    parser.add_argument('--source', required=True, help='Markdown file or directory to preview')
    parser.add_argument('--build-root', help='Path to built web root (default: website/web or build/web)')
    parser.add_argument('--preview-dir', default='.preview_posts', help='Directory to stage preview posts')
    parser.add_argument('--port', type=int, default=8000, help='Port to run the preview server on')
    parser.add_argument('--sync-assets', action='store_true', help='Also copy non-md files from source')
    args = parser.parse_args()

    source = Path(args.source)
    if not source.exists():
        raise SystemExit(f'Source not found: {source}')

    build_root = _choose_build_root(args.build_root).resolve()
    preview_dir = Path(args.preview_dir).resolve()
    preview_dir.mkdir(parents=True, exist_ok=True)

    posts = _build_index_entries(source, preview_dir)
    if args.sync_assets:
        _sync_assets(source, preview_dir)

    index_path = preview_dir / 'index.json'
    index_path.write_text(json.dumps({'posts': posts}, ensure_ascii=False, indent=2), encoding='utf-8')

    server = PreviewServer(
        ('', args.port),
        PreviewHandler,
        base_dir=build_root,
        preview_posts_dir=preview_dir,
        fallback_posts_dir=build_root / 'posts',
    )

    print('Preview server running:')
    print(f'  http://localhost:{args.port}/')
    print('Use /post/<slug> to open the post.')
    print(f'Build root: {build_root}')
    print(f'Preview posts: {preview_dir}')
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('Stopping...')


if __name__ == '__main__':
    main()
