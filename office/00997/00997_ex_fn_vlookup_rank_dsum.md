---
### essential info 
title: 엑셀 - 함수 - vlookup, rank, dsum
slug: '00997'
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

## vlookup
아래 그림처럼 데이터 테이블이 있고, 찾고자 하는 기준이 있다면, 그 값을 찾아, 원하는 열의 값을 반환해주는 함수이다.<br>
&nbsp; <br>
표 중에서 사과의 가격을 찾고 싶다고 하자. <br>
(값이 가로로 배치 되어 있으니, Vlookup(vertical)을 쓰고, 세로로 배치되어 있다면 Hlookup(horizontal)을 쓴다.)<br>
![img](https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/office/00997/00997_01.jpg)
&nbsp; <br>
&nbsp; <br>
&nbsp; <br>

찾을값이 들어갈 셀에서 =Vlookup을 쳐보자. 인수들이 나온다.<br>
![img](https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/office/00997/00997_02.jpg)
&nbsp; <br>
&nbsp; <br>
&nbsp; <br>

인수는 총 4개로, 아래와 같이 구성된다.<br>
```text
Lookup_value → 찾을값(셀을 지정하거나, 값을 그냥 입력해도 된다)
Table_array → 값을 찾을 표(영역 또는 표이름, 이름정의) 
Col_index_num → 표 안에서 몇 번째 열의 값을 반환할지(첫번째 열은 1)
Range_lookup → 정확하게 일치하는 값을 찾는다면 false, 유사한 값을 찾는다면, true 를 기입한다.
```
![img](https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/office/00997/00997_03.jpg)
&nbsp; <br>
&nbsp; <br>
&nbsp; <br>

찾을 값에 b3, 즉 사과의 열을 넣고, 표가 들어있는 영역을 두번째 인수에 넣는다. <br>
만약 자동채우기로 값을 찾을수 있는 경우를 대비해서, 절대참조로 기입하는 것이 좋다. <br>
표의 제목셀은 포함하지 않고 영역을 선택한다.<br>
![img](https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/office/00997/00997_04.jpg)
&nbsp; <br>
&nbsp; <br>
&nbsp; <br>


가격이 표에서 두번째 열에 있으니 2를 입력한다. 값은 정확히 일치한 값만 찾기 위해 false를 넣는다.(또는 0)<br>
![img](https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/office/00997/00997_05.jpg)
&nbsp; <br>
&nbsp; <br>
&nbsp; <br>

값이 반환됐다. 매우 주의해야 할 점은 중복되는 값이 있다면, 첫번째 값을 반환한다는 것이다.<br>
![img](https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/office/00997/00997_06.jpg)
&nbsp; <br>
&nbsp; <br>
&nbsp; <br>

&nbsp; <br>
&nbsp; <br>
&nbsp; <br>
## rank
rank 함수는 순서를 매길 때 사용되는 함수이다. <br>
아래처럼 등수를 매길 일이 있다고 치자.<br>
![img](https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/office/00997/00997_07.jpg)
&nbsp; <br>
&nbsp; <br>
&nbsp; <br>

RANK함수의 인수는 총 3개이며, 순위를 환산할 숫자, 전체 배열, 그리고, 내림차순/오름차순 옵션이다.<br>
![img](https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/office/00997/00997_08.jpg)
&nbsp; <br>
&nbsp; <br>
&nbsp; <br>

등수를 기재할 셀 위에서 등수를 산출할 숫자 또는 셀주소를 입력하고, 참조 영역을 넣는다. 그리고, 오름차순/내림차순 옵션을 설정한다.<br>
![img](https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/office/00997/00997_09.jpg)
&nbsp; <br>
&nbsp; <br>
&nbsp; <br>

0번이 내림차순이고, 입력 안하면 내림차순으로 된다.<br>
![img](https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/office/00997/00997_10.jpg)
&nbsp; <br>
&nbsp; <br>
&nbsp; <br>


전체 등수를 산출해야하므로 참조 영역은 절대참조로 하고, 자동입력을 하면 등수가 매겨진다.<br>
![img](https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/office/00997/00997_11.jpg)
&nbsp; <br>
&nbsp; <br>
&nbsp; <br>

&nbsp; <br>
&nbsp; <br>
&nbsp; <br>

## dsum
아래 그림처럼 데이터베이스가 있다. <br>
이 중에 이름이 "가"이고, 배열1 열의 값이 3을 넘는 행의 배열1 값들의 합을 구해야 한다 하자. <br>
일단 조건표가 필요하다, 고급필터의 조건을 입력하는 것처럼 조건표를 만들자. <br>
이름이 "가" 배열1이 >3 이 되겠다.<br>
![img](https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/office/00997/00997_12.jpg)
&nbsp; <br>
&nbsp; <br>
&nbsp; <br>


조건표를 만들었으면,답이 들어갈 셀에서 DSUM 함수를 치자. 세 개의 변수 입력을 해야한다. <br>
왼쪽부터<br>
```text
- 데이터 베이스
- 필드
- 조건
```
순서대로 넣는다.<br>
![img](https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/office/00997/00997_13.jpg)
&nbsp; <br>
&nbsp; <br>
&nbsp; <br>


VLOOKUP하고 다르게 데이터 베이스이므로 1행의 라벨 부분까지 넣어줘야, 조건과 매칭을 시킬 수 있다. <br>
그 말인 즉, 조건표에도 라벨 부분과 이름을 통일해야 한다는 뜻이다.<br>
![img](https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/office/00997/00997_14.jpg)
&nbsp; <br>
&nbsp; <br>
&nbsp; <br>

합을 원하는 열, C1을 두번째 변수에 넣고, 라벨을 포함한 조건 표를 마지막으로 선택해주면 끝이다.<br>
![img](https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/office/00997/00997_15.jpg)
&nbsp; <br>
&nbsp; <br>
&nbsp; <br>

만약 이름이 가이고, 배열1이 3을 넘는 배열2의 값을 더한다면, 아래처럼 변수를 넣으면 되겠다.<br>
![img](https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/office/00997/00997_16.jpg)
&nbsp; <br>
&nbsp; <br>
&nbsp; <br>

답은 6이 될것이다.<br>
![img](https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/office/00997/00997_17.jpg)
&nbsp; <br>
&nbsp; <br>
&nbsp; <br>

아무리 이 기능이 좋아도, 조건표 그리기 귀찮아서 잘 안쓰게 된다는...<br>
&nbsp; <br>
끝.<br>
&nbsp; <br>
&nbsp; <br>
&nbsp; <br>
