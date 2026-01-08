---
### essential info 
title: Project is unviewable - EvilClippy
slug: '01993'
date: 2026-01-08
# updated: 2025-12-22
cover: https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/00_img/02_vba.webp
category: office
tags: 
#   - powerpoint
  - excel  
#   - macrotoolkit

### optional info  
# excerpt: 텍스트를 입력합니다. # 미설정 
# order: 10 # 미설정 
# draft: false #미설정 
---


## Project is unviewable
가끔 VBA add-in 코드를 확인하다보면, Project is unviewable이라고 메시지창이 뜨면서, 코드 확인이 불가능한 파일들이 있다. <br>
![img](https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/office_vba/01993/01993_01.png)
&nbsp; <br>
&nbsp; <br>
&nbsp; <br>
## EvilClippy
유료 프로그램으로 하는 것인줄 알고 있었는데, 구글링을 하다가, 설정하는 프로그램을 찾았다. <br> 
해당 코드로 protection 이외에 코드 난독화가 가능한것으로 보인다.<br>
:::btn https://github.com/outflanknl/EvilClippy EvilClippy github
&nbsp; <br>
&nbsp; <br>
&nbsp; <br>
## 사용방법
`readme` 파일에 나와있는 것처럼, `C#`으로 구성된 코드를 다운받아서 `Visual Studio`로 컴파일하면,<br>
```text
mcs /reference:OpenMcdf.dll,Systehttp://m.IO.Compression.FileSystem.dll /out:EvilClippy.exe *.cs
```
&nbsp; <br>
&nbsp; <br>
EvilClippy.exe 파일이 생성되는데, 이 파일로 VBA파일을 변환하면 된다.<br>
```text
EvilClippy.exe -u yourmacrofile.XXX
```
&nbsp; <br>
대략 아래와 같은 구성이 될 것이다. <br>
![img](https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/office_vba/01993/01993_02.png)
&nbsp; <br>
&nbsp; <br>
&nbsp; <br>
끝.<br>
&nbsp; <br>
&nbsp; <br>
&nbsp; <br>