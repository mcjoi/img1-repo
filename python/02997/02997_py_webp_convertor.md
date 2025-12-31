---
### essential info 
title: python - Webp 변환 유틸
slug: 02997
date: 2025-12-22
# updated: 2025-12-22 # 미설정 
cover: https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/00_img/01_python.webp
category: dev
tags:
  - windows
  - pyhton

### optional info 

# excerpt: 텍스트를 입력합니다. # 미설정 
# order: 10 # 미설정 
# draft: false #미설정 
---

## What is it?
한 때, 블로그 SEO를 위해 모든 이미지를 `WebP` 포맷으로 변환해서 올리던 적이 있었다.<br>
프로그램은 아래와 같이 구성이 된다.
:::sp
```text
python.py   ← The Python script file 
└── libwebp-1.4.0-windows-x64  ← Folder containing the WebP library  
```
:::sp
사용하기 편하게 파이썬을 사용했지만, 거의 사용하지 않았던 유틸이 되었다. <br>
이유를 정확하게 파악하기 어렵지만 `WebP` 변환 시 리사이즈 알고리즘 때문인지 묘하게 컬러가 튀틀리는 현상을 끝내 잡아내지 못했기 때문이다. 
:::sp
그냥 실행이 되는 것으로 만족한다.
:::sp 2
***
:::sp 2
`python code sample`

```python
import os
import tkinter
from tkinter import filedialog

from PIL import Image
from PIL.ExifTags import TAGS

def get_image_width(image_path):
    # Open the image
    with Image.open(image_path) as img:
        # Get the width
        return img.width            

if __name__ == '__main__':

    # 폴더선택
    root = tkinter.Tk()
    root.withdraw()

    file_path = filedialog.askopenfilenames(
        parent=root, initialdir="/", title='Please select target files') # 대상파일선택

    dir_path = filedialog.askdirectory(
        parent=root, initialdir="/", title='Please select saving directory') # 저장폴더선택

    programPath = os.getcwd() + "/libwebp-1.4.0-windows-x64/bin/cwebp.exe" # 프로그램저장경로(수정!!!)
   
    for fileConvertion in file_path :        
       
        filename = os.path.basename(fileConvertion)        
        name, extension = os.path.splitext(filename, )        

        # Example usage
        image_path = fileConvertion
        print(image_path)
        width = get_image_width(image_path)
        print(f"Image width: {width}")
        if width > 700 :
            command = programPath + ' "' + fileConvertion + '" -q 100 -resize 700 0 -o "' + dir_path + '/' + name + '.webp"'
            print(command)
        else :
            command = programPath + ' "' + fileConvertion + '" -q 100 -o "' + dir_path + '/' + name + '.webp"'
   
        os.system(command=command)
```


:::sp 2