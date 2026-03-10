import os
from PIL import Image

TARGET_WIDTH = 480
ROOT_DIR = "life/05878"

# 단일 파일 지정 (None이면 전체 폴더 처리)
TARGET_FILE = "03.jpg"

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


if __name__ == "__main__":
    if not os.path.isdir(ROOT_DIR):
        raise FileNotFoundError(f"'{ROOT_DIR}' 폴더를 찾을 수 없습니다.")

    if TARGET_FILE:
        src_path = os.path.join(ROOT_DIR, TARGET_FILE)

        if not os.path.isfile(src_path):
            raise FileNotFoundError(f"파일을 찾을 수 없습니다: {src_path}")

        resize_image(src_path)
    else:
        resize_images(ROOT_DIR)