---
### essential info 
title: 엑셀 - 함수 - vlookup
slug: 00997
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

### vlookup
아래 그림처럼 데이터 테이블이 있고, 찾고자 하는 기준이 있다면, 그 값을 찾아, 원하는 열의 값을 반환해주는 함수이다.
::sp
표 중에서 사과의 가격을 찾고 싶다고 하자. <br>
(값이 가로로 배치 되어 있으니, Vlookup(vertical)을 쓰고, 세로로 배치되어 있다면 Hlookup(horizontal)을 쓴다.)
![img](https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/office/00997/00997_1.jpg)
::sp2

찾을값이 들어갈 셀에서 =Vlookup을 쳐보자. 인수들이 나온다.
![img](https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/office/00997/00997_2.jpg)
::sp2

인수는 총 4개로, 아래와 같이 구성된다.
```text
Lookup_value -> 찾을값(셀을 지정하거나, 값을 그냥 입력해도 된다)
Table_array ->값을 찾을 표, Col_index_num -> 표 안에서 몇 번째 열의 값을 반환할지
Range_lookup -> 정확하게 일치하는 값을 찾는다면 false, 유사한 값을 찾는다면, true 를 기입한다.
```
![img](https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/office/00997/00997_3.jpg)
::sp2

찾을 값에 b3, 즉 사과의 열을 넣고, 표가 들어있는 영역을 두번째 인수에 넣는다. <br>
만약 자동채우기로 값을 찾을수 있는 경우를 대비해서, 절대참조로 기입하는 것이 좋다. <br>
표의 제목셀은 포함하지 않고 영역을 선택한다.
![img](https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/office/00997/00997_4.jpg)
::sp2


가격이 표에서 두번째 열에 있으니 2를 입력한다. 값은 정확히 일치한 값만 찾기 위해 false를 넣는다.(또는 0)
![img](https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/office/00997/00997_5.jpg)
::sp2

값이 반환됐다. 매우 주의해야 할 점은 중복되는 값이 있다면, 첫번째 값을 반환한다는 것이다.
![img](https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/office/00997/00997_6.jpg)
::sp2

쉽지만. 자주 안쓰면 헤깔린다.
::sp
끝.
::sp2
