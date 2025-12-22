---
### essential info 
title: Move file by extention
slug: 02002
date: 2025-12-22
cover: https://picsum.photos/800/400

### optional info 
# updated: 2025-12-22
# excerpt: 
category: development
tags:
  - python
  - windows
draft: false
# order: 10
---

# Create folders by file extension and move the file
## What is it?
I created a program that, in a folder containing files with various types of extensions, generates folders only for the desired extensions and moves the corresponding files into them.  

When compiled into an exe file, it can run lightweight on Windows.
***

## code sample
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
&nbsp;  


***