---
### essential info 
title: 엑셀 - 셀 값 오류와 순환참조 에러
slug: 00998
date: 2025-12-22
updated: 2026-01-05
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


## 셀 단위 - 계산/처리/표시 오류
::sp2
### #DIV/0!
- 수식에서 어떤 값을 0 또는 빈 셀로 나누려고 할 때 발생
```vb
= A1 / B1 (B1이 0 또는 빈 셀)
```
::sp2
### #VALUE!
- 숫자가 와야 할 자리에 텍스트나 잘못된 데이터 형식이 들어간 경우 발생
```vb
= "A" + 1  
```
::sp2
### #REF!
- 존재하지 않는 셀을 수식이 참조하고 있을 때 발생
- 참조하던 셀/행/열의 삭제
- 잘못된 범위 지정

::sp2
### #NAME?
- 함수의 이름 오류, 정의된 이름 인식 불가시 발생

::sp2
### #NUM!
- 수식 결과가 엑셀이 처리할 수 없는 숫자 범위일 때 발생 (너무 크거나 작은 수, 음수의 제곱근 등)

::sp2
### #N/A
- 요청한 값을 찾을 수 없을 때 발생
- VLOOKUP, XLOOKUP, MATCH 실패

::sp2
### #NULL!
- 서로 겹치지 않는 범위의 교집합을 요청했을 때 발생

::sp2
### #######
- 오류라기보다는 셀에 값이 표시되지 못하는 상태 (열 너비 부족, 음수 날짜/시간)



::sp2
***
::sp2


## 워크북 단위 - 순환참조
엑셀에서 수식이 자기 자신을 직접 또는 간접적으로 다시 참조하는 구조를 의미한다. 이로 인해 계산이 끝나지 않거나, 엑셀이 임의의 값으로 계산을 중단하게 된다.
![img](https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/office/00998/00998_1.png)
::sp2

### 순환참조 찾고, 없애기
아래 그림처럼 L4 셀과 M4셀에 순환참조를 만들었다.(일부러 만들기도 쉽지 않다.) <br>
수식탭에 오류검사에 보면 친절하게 어느 셀에서 순환참조가 났는지 알려준다.
![img](https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/office/00998/00998_2.png)
::sp2

찾아서 수정해주면 끝이다. 너무 쉬운데, 방치하면 모두가 괴로워진다.
::sp
끝.
::sp2

