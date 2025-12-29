---
### essential info 
title: pyhton - 확장자별 폴더생성, 이동 
slug: 02998
date: 2025-12-22
# updated: 2025-12-22 # 미설정 
cover: https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/img/00_noimage.webp
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
바탕화면이나, 영상/이미지가 섞여있는 카메라 촬영물 폴더를 정리하다보면, 한 폴더 안에 섞여 있는 여러 확장자들을 분리해낼 필요가 있다. <br>
이를 위해 폴더 안에 있는 확장자들을 확인해서 폴더를 생성하고, 각 파일을 해당하는 폴더 안으로 밀어넣는 기능을 코드로 짜두기로 한다.
- 사실상 큰 의미 없는 일이기도 하다.
::sp
오랜만에 접하는 파이썬, 기능도 많이 좋아졌지만, 라이브러리 찾기 귀찮아서 노가다 수준으로 작업 진행. <br>
룰은 mov, arw 파일만 폴더를 생성하여 옮겨준다.
- 필요하다만, 확장자 리스트를 변경하거나, 추가해주면 된다.
::sp 2
`sample_code.py`
```python
import os
import tkinter
from tkinter import filedialog
import shutil

# 폴더선택
root = tkinter.Tk()
root.withdraw()
dir_path = filedialog.askdirectory(
    parent=root, initialdir="/", title='Please select a directory')
print("\ndir_path : ", dir_path)

# 폴더내파일검사
global_cache = {}

def cached_listdir(path):
    res = global_cache.get(path)
    if res is None:
        res = os.listdir(path)
        global_cache[path] = res
    return res

def moveFile(ext, str):
    # 현재 파일 위치
    filePath = dir_path + '/' + item        
    # 옮길 파일 위치
    finalPath = dir_path + '/' + str + '/' + item           
    if os.path.isfile(filePath):
        shutil.move(filePath, finalPath)          

if __name__ == '__main__':   
    # 기본 폴더 생성
    newdir = ["RAW", "MOV"]
    for nd in newdir :
        newtDir = dir_path + '/' + nd
        if not os.path.isdir(newtDir):
            os.mkdir(newtDir)   

    # 각 기본 폴더에 옮겨질 확장자 리스트 정의
    extList = {"RAW" : ["arw", "nef"],
               "MOV" : ["mov", "mp4"],
               }     
    for item in cached_listdir(dir_path):       
        # RAW에 해당하는 확장자인 경우        
        for extItem in extList["RAW"] :
            if item.rpartition(".")[2] == extItem :
                moveFile(extItem, "RAW")
        # MOV에 해당하는 확장자인 경우
        for extItem in extList["MOV"] :
            if item.rpartition(".")[2] == extItem :
                moveFile(extItem, "MOV")
    print("complete")  
```

## 확장자를 추가할 필요가 있었다.
소니카메라에서 추출한 파일을 백업하기 위해 바탕화면에 옮기다보면, arw, jpg, mov 파일이 뒤죽박죽 섞여있는데, 일일이 옮기기 귀찮은 경우가 있다. 그래서 약간의 커스터마이징을 진행했다.

