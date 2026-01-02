---
### essential info 
title: 엑셀 - 함수 - numberstring(숫자 한글로 바꾸기)
slug: 00995
date: 2025-12-22
# updated: 2025-12-22 # 미설정
cover: https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/00_img/05_excel.webp
category: office
tags:
  # - powerpoint
  - excel  

### optional info  
# excerpt: 텍스트를 입력합니다. # 미설정 
# order: 10 # 미설정 
# draft: false #미설정 
---

### numberstring
계약서는 왜 다 한글 아니면 워드로 되어있을까.. <br>
간단한 계약서는 엑셀로 바꾸는 것이 여러모로 편하다.
::sp
특히 "일금 일백만원정" 처럼 숫자를 한글로 바꿔야 하는 건 정말 해도 해도 짜증난다. <br>
간단하게 엑셀로 바꿔보자. NUMBERSTRING 함수만 있으면 된다.

```vb
=NUMBERSTRING(바꿀 값, 형식)
```
::sp

형식은 1, 2, 3 중에 고르자.(다른건 잘 안쓰게 된다)

```text
1 : 한글 #1
2 : 한자
3 : 한글 #2
```
::sp 

무슨 말인지는 그냥 그림만 보면 이해가 갈 것이다. "원정" 이라는 말도 아예 붙여 버렸다.
![img](https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/office/00995/00995_01.jpg)
::sp2


끝.

::sp2