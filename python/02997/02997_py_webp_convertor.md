---
### essential info 
title: python - Webp 변환 유틸
slug: '02997'
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

### webp
블로그 최적화를 위해서, webp 포맷을 자주 사용한다. <br>
그런데, 매번 온라인상에서 이미지를 올려서 변환하기도 좀 그렇고, 포토샵을 사용하기도 좀 그렇다.<br>

&nbsp; <br>
&nbsp; <br>
&nbsp; <br>

구글 dev 사이트에서 변환 프로그램을 다운받았는데, 매번 cmd를 입력해줘야 하는 방식이다. <br>
이 또한 귀찮으니, 파이썬으로 간단한 프로그램을 짜본다. 프로그램 위치는 아래와 같이 구성하고, <br>
당연히 python 실행은 윈도우즈 path에 걸어서 어디서든 동작하게 만들어 둔다.<br>
&nbsp; <br>
```text
아래 코드가 저장된 python.py 파일
 └─ ─ ─ ─ ─ ─ libwebp-1.4.0-windows-x64 폴더
```
&nbsp; <br>
&nbsp; <br>
&nbsp; <br>
바탕화면이든 어디든 batch 파일을 써서, 해당 python 프로그램이 실행될 수 있도록 해주면 끝이다. <br>
단, 본인의 python에 아래 패키지들이 사전에 install 되어있어야 한다.<br>
&nbsp; <br>
&nbsp; <br>
&nbsp; <br>
첫번째 탐색기가 뜨면 변환하고 싶은 파일을 선택해주고, 두번째 탐색기에서는 저장할 폴더를 선택해주면 된다. <br>
물론 코드를 좀 수정해서, 타겟 폴더를 원하는 폴더에 고정해줄 수도 있다.<br>
&nbsp; <br>
&nbsp; <br>
&nbsp; <br> 

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
&nbsp; <br>
&nbsp; <br>
&nbsp; <br>

결과물의 이미지 퀄리티가 떨어져 보이는건 느낌적인 느낌일까? <br>
아니다. <br>
전반적으로 화이트 영역의 컬러가 죽었다는 것을 나는 알게 되었다. 해당 프로그램 설명페이지에 있는 수많은 옵션들을 건드려봐야 알 수 있을 것 같기는하다.<br>

&nbsp; <br>
&nbsp; <br>
&nbsp; <br>

### 옵션 업데이트, exif 정보 유지
변환을 하면서, 리사이징 옵션 때문인지 모르겠지만, 옐로우 컬러의 열화가 있고, <br>
exif정보가 날아가는 문제가 있었는데, 아래 방식으로 좀 완화가 되는 듯하다. exiftool 프로그램을 다운 받은 뒤 동일한 경로에 추가한다.<br>

&nbsp; <br>
 
```text
아래 코드가 저장된 python.py 파일
 └─ ─ ─ ─ ─ ─ libwebp-1.4.0-windows-x64 폴더
 └─ ─ ─ ─ ─ ─ exiftool-13.12_64 폴더
```
&nbsp; <br>
&nbsp; <br>
&nbsp; <br>

파이썬 실행코드를 아래와 같이 수정하였다. <br> 
기존 700px로 리사이징하던 것을 702px로 변경했는데, 이는 내가 가지고 있는 카메라의 jpg 파일이 6000x4000이 기본값이기 때문이다. <br>
물론... 크롭을 하다보면 달라지겠지만, <br>
최대한 기본값에 대해서는 정수에 가깝게 width값을 리사이징을 하고 그 값을 기본으로 height 값을 계산하도록 했다.<br>

&nbsp; <br>
&nbsp; <br>
&nbsp; <br>

 
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
   
def get_image_height(image_path):
    # Open the image
    with Image.open(image_path) as img:
        # Get the width
        return img.height
   
if __name__ == '__main__':

    # 폴더선택
    root = tkinter.Tk()
    root.withdraw()

    file_path = filedialog.askopenfilenames(
        parent=root, initialdir="/", title='Please select target files')

    dir_path = filedialog.askdirectory(
        parent=root, initialdir="/", title='Please select saving directory')

    programPath = os.getcwd() + "/libwebp-1.4.0-windows-x64/bin/cwebp.exe"
    programPath_exif = os.getcwd() + "/exiftool-13.12_64/exiftool.exe"
   
    for fileConvertion in file_path :        
       
        filename = os.path.basename(fileConvertion)        
        name, extension = os.path.splitext(filename, )        

        # Example usage
        image_path = fileConvertion
       
        width = get_image_width(image_path)
        height = get_image_height(image_path)
       
       
        if width > 702 :

            changeheight =  int(round(height * 702 / width))
           
            command = programPath + ' "' + fileConvertion + '" -lossless -z 0 -exact -m 6 -resize 702 "' + str(changeheight) + '" -o "' + dir_path + '/' + name + '.webp"'
            # command = programPath + ' "' + fileConvertion + '" -z 0 -exact -m 6 -noalpha -o "' + dir_path + '/' + name + '.webp"'
            # command = programPath + ' "' + fileConvertion + '" -z 0 -exact -m 6 -resize 700 0 -noalpha -o "' + dir_path + '/' + name + '.webp"'
            # command = programPath + ' "' + fileConvertion + '" -lossless -z 0 -exact -m 6 -resize 700 0 -o "' + dir_path + '/' + name + '.webp"'
            # command = programPath + ' "' + fileConvertion + '" -lossless -q 100 -resize 700 0 -o "' + dir_path + '/' + name + '.webp"'
            # command = programPath + ' "' + fileConvertion + '" -q 100 -m 6 -preset photo -short -resize 700 0 -o "' + dir_path + '/' + name + '.webp"'
            command_exif = programPath_exif + ' -TagsFromFile' + ' "' + fileConvertion + '" "' + dir_path + '/' + name + '.webp"'
        else :
            command = programPath + ' "' + fileConvertion + '" -lossless -z 0 -exact -m 6 -o "' + dir_path + '/' + name + '.webp"'
            # command = programPath + ' "' + fileConvertion + '" -z 0 -exact -m 6 -noalpha -o "' + dir_path + '/' + name + '.webp"'
            # command = programPath + ' "' + fileConvertion + '" -lossless -z 0 -exact -m 6 -o "' + dir_path + '/' + name + '.webp"'
            # command = programPath + ' "' + fileConvertion + '" -lossless -q 100 -o "' + dir_path + '/' + name + '.webp"'
            # command = programPath + ' "' + fileConvertion + '" -q 100 -m 6 -preset photo -short -o "' + dir_path + '/' + name + '.webp"'
            command_exif = programPath_exif + ' -TagsFromFile' + ' "' + fileConvertion + '" "' + dir_path + '/' + name + '.webp"'
               
        os.system(command=command)
        os.system(command=command_exif)
```

&nbsp; <br>
&nbsp; <br>
&nbsp; <br> 

메뉴얼을 보고, 화질에 영향을 준다는 요소들을 전부 제외하거나 추가를 했다. <br>
여러번의 시행착오 끝에.. 대충 마음에 드는 정도까지 만들었다.<br>

&nbsp; <br>
&nbsp; <br>
&nbsp; <br> 

일단은 여기까지.<br>
&nbsp; <br>
끝.<br>
&nbsp; <br>
&nbsp; <br>
&nbsp; <br> 