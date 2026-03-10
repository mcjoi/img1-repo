import os
import argparse
from PIL import Image

TARGET_WIDTH = 480

IMAGE_EXTENSIONS = (
    ".jpg", ".jpeg", ".png", ".webp", ".bmp", ".tiff"
)


def resize_image(src_path):
    filename = os.path.basename(src_path)

    if not filename.lower().endswith(IMAGE_EXTENSIONS):
        return

    current_path = os.path.dirname(src_path)
    name, _ = os.path.splitext(filename)
    dst_path = os.path.join(current_path, f"{name}_480.jpg")

    if os.path.exists(dst_path):
        return

    try:
        with Image.open(src_path) as img:
            img = img.convert("RGB")
            width, height = img.size

            if width <= TARGET_WIDTH:
                return

            new_height = int(height * TARGET_WIDTH / width)

            resized = img.resize(
                (TARGET_WIDTH, new_height),
                Image.LANCZOS
            )

            resized.save(
                dst_path,
                format="JPEG",
                quality=95,
                subsampling=0,
                optimize=True
            )

            print(f"✔ Saved: {dst_path}")

    except Exception as e:
        print(f"✖ Error: {src_path} -> {e}")


def resize_images(root_dir):
    for current_path, dirnames, filenames in os.walk(root_dir):
        for filename in filenames:
            src_path = os.path.join(current_path, filename)
            resize_image(src_path)


def main():
    parser = argparse.ArgumentParser(description="이미지 480px 리사이즈")
    parser.add_argument(
        "path",
        help="처리할 폴더 또는 파일 경로"
    )

    args = parser.parse_args()
    target_path = args.path

    if not os.path.exists(target_path):
        raise FileNotFoundError(f"경로를 찾을 수 없습니다: {target_path}")

    # 파일일 경우
    if os.path.isfile(target_path):
        resize_image(target_path)

    # 폴더일 경우
    elif os.path.isdir(target_path):
        resize_images(target_path)


if __name__ == "__main__":
    main()