---
### essential info 
title: 엑셀 - 순환참조 없애기
slug: 00998
date: 2025-12-22
# updated: 2025-12-22 # 미설정
cover: https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/00_img/05_excel.webp
category: excel
tags:
  # - powerpoint
  - excel  

### optional info  
# excerpt: 텍스트를 입력합니다. # 미설정 
# order: 10 # 미설정 
# draft: false #미설정 
---

### 순환참조
엑셀에서 수식이 자기 자신을 직접 또는 간접적으로 다시 참조하는 구조를 의미한다. 이로 인해 계산이 끝나지 않거나, 엑셀이 임의의 값으로 계산을 중단하게 된다.
![img](https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/life/00998/00998_1.png)

### 순환참조 찾고, 없애기
아래 그림처럼 L4 셀과 M4셀에 순환참조를 만들었다.(일부러 만들기도 쉽지 않다.) <br>
수식탭에 오류검사에 보면 친절하게 어느 셀에서 순환참조가 났는지 알려준다.
![img](https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/life/00998/00998_2.png)

::sp2
찾아서 수정해주면 끝이다. 너무 쉬운데, 방치하면 모두가 괴로워진다.
::sp
끝.
::sp2

