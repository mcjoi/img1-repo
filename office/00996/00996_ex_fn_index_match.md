---
### essential info 
title: 엑셀 - 함수 - index, match(조건값 찾기)
slug: 00996
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

:::youtube sLGsDbAlgUw

## 조건 값 찾기
조건 값 찾기의 다양한 방법 중, index, match는 중요하다. <br>
xlookup이 나오기 전까지는 조건보다 좌측에 위치한 컬럼값을 찾는 경우, 거의 유일한 방법이기도 했다. <br>
- 그 말은 지금은 그냥 xlookup 쓰면 된다는 뜻이다.

예시를 보면, 아래의 그림 중 서울 지역의 학생수를 찾으려고 한다.
![img](https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/office/00996/00996_01.jpg)
::sp2


### VLOOKUP과 MATCH함수
MATCH함수로 조건2에 대한 열번호를 알아낸 다음, VLOOKUP의 열을 찾는다. <br>
MATCH함수는 사실 영역 내에서 값이 몇번째인지 나타내는 함수로, 만약 혼자 엑셀을 상식선에서 쓰고 있다면 죽었다 깨나도 써먹을 일이 없을 함수이기도 하다.
- MATCH(찾을값,배열,정확한값을찾을지여부)
::sp
수식은 아래와 같다. VLOOKUP의 열변수를 적는 곳에 MATCH함수를 넣어주면 된다.
```vb
=VLOOKUP(H2,B3:E6,MATCH(H3,B2:E2,0),FALSE)
```
![img](https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/office/00996/00996_02.jpg)
::sp2

HLOOKUP은 VLOOKUP과 사용방법은 동일하다. 단, 이번에는 MATCH함수로 조건1에 대한 행번호를 찾아내는 것이고, <br>
HLOOKUP의 행을 찾는데 쓴다는 점이 되겠다. 다른 사항은 VLOOKUP + MATCH와 동일하다.
::sp
수식은 아래와 같다.
```vb
=HLOOKUP(H3,C2:E6,MATCH(H2,B2:B6,0),FALSE)
```
![img](https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/office/00996/00996_03.jpg)
::sp2

VLOOKUP이나 HLOOKUP은 기준이 되는 조건열이나 행이 맨 앞에 있어야 한다는 전제가 있다. <br>
INDEX + MATCH는 그 단점을 보완해 줄 수 있다. <br>
INDEX함수는 선택 영역에서 X번행(ROW), Y번째열(COLUMN) 값을 반환한다. <br>
INDEX(영역, X, Y) 가 되겠다. 
::sp

수식은 아래와 같다.
```vb
=INDEX(C3:E6,MATCH(H2,B3:B6,0),MATCH(H3,C2:E2,0))
```
![img](https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/office/00996/00996_04.jpg)
::sp2


끝.
::sp2