import os
from PIL import Image

TARGET_WIDTH = 480
ROOT_DIR = "zz_gallery"

IMAGE_EXTENSIONS = (
    ".jpg", ".jpeg", ".png", ".webp", ".bmp", ".tiff"
)

def resize_images(root_dir):
    for current_path, dirnames, filenames in os.walk(root_dir):
        # 제외할 폴더 필터링
        dirnames[:] = [
            d for d in dirnames
            if not d.startswith(".") and d != "00_img"
        ]

        for filename in filenames:
            if not filename.lower().endswith(IMAGE_EXTENSIONS):
                continue

            src_path = os.path.join(current_path, filename)
            name, _ = os.path.splitext(filename)
            dst_path = os.path.join(current_path, f"{name}_480.jpg")

            # 이미 생성된 파일은 스킵
            if os.path.exists(dst_path):
                continue

            try:
                with Image.open(src_path) as img:
                    img = img.convert("RGB")
                    width, height = img.size

                    # 업스케일 방지
                    if width <= TARGET_WIDTH:
                        continue

                    new_height = int(height * TARGET_WIDTH / width)

                    resized = img.resize(
                        (TARGET_WIDTH, new_height),
                        Image.LANCZOS
                    )

                    resized.save(
                        dst_path,
                        format="JPEG",
                        quality=100,
                        subsampling=0,
                        optimize=True
                    )

                    print(f"✔ Saved: {dst_path}")

            except Exception as e:
                print(f"✖ Error: {src_path} -> {e}")

if __name__ == "__main__":
    if not os.path.isdir(ROOT_DIR):
        raise FileNotFoundError(f"'{ROOT_DIR}' 폴더를 찾을 수 없습니다.")

    resize_images(ROOT_DIR)
