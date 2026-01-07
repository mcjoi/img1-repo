---
### essential info 
title: 엑셀 - 함수 - 조건값 찾기, 배열수식
slug: '00996'
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

::sp


## 조건값 찾기
### index, match
조건 값 찾기의 다양한 방법 중, index, match는 중요하다. <br>
xlookup이 나오기 전까지는 조건보다 좌측에 위치한 컬럼값을 찾는 경우, 거의 유일한 방법이기도 했다. <br>
- 그 말은 지금은 그냥 xlookup 쓰면 된다는 뜻이다. <br>
::sp
예시를 보면, 아래의 그림 중 서울 지역의 학생수를 찾으려고 한다. <br>
![img](https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/office/00996/00996_01.jpg)
::sp3


### VLOOKUP과 MATCH함수
MATCH함수로 조건2에 대한 열번호를 알아낸 다음, VLOOKUP의 열을 찾는다. <br>
MATCH함수는 사실 영역 내에서 값이 몇번째인지 나타내는 함수로, 만약 혼자 엑셀을 상식선에서 쓰고 있다면 죽었다 깨나도 써먹을 일이 없을 함수이기도 하다. <br>
- MATCH(찾을값,배열,정확한값을찾을지여부) <br>
::sp
수식은 아래와 같다. VLOOKUP의 열변수를 적는 곳에 MATCH함수를 넣어주면 된다.
```vb
=VLOOKUP(H2,B3:E6,MATCH(H3,B2:E2,0),FALSE)
```
![img](https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/office/00996/00996_02.jpg)
::sp3

HLOOKUP은 VLOOKUP과 사용방법은 동일하다. 단, 이번에는 MATCH함수로 조건1에 대한 행번호를 찾아내는 것이고, <br>
HLOOKUP의 행을 찾는데 쓴다는 점이 되겠다. 다른 사항은 VLOOKUP + MATCH와 동일하다. <br>
::sp
수식은 아래와 같다.
```vb
=HLOOKUP(H3,C2:E6,MATCH(H2,B2:B6,0),FALSE)
```
![img](https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/office/00996/00996_03.jpg)
::sp3

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
::sp3
::sp3

:::youtube g9wcalBgw2E

::sp


## 배열수식
### sumproduct, sum 배열
SUMPRODUCT와 SUM배열함수로 특정 값을 찾는 두개 방법은 그 사용법이 비슷하다. <br>
대충 써보면 아래와 같다. <br>
```text
함수명((조건)*(조건)*(찾을영역))
```
단, SUM배열은 엔터대신 컨트롤+쉬프트 엔터를 눌러서 배열함수로 만들어줘야 한다. <br>
- 구글 시트에서는 arrayformula 함수로 처리를 한다. <br>
![img](https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/office/00996/00996_05.jpg)
::sp3

![img](https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/office/00996/00996_06.jpg)
::sp3


### sum 배열에서 와일드카드 문자 사용
sumif와 sum배열 두 가지 함수 사용에 있어 차이는 뭐라고 생각이 들지 모르겠다. <br>
개인적인 생각은 sumif는 조건에 와일드카드문자(*)를 사용할 수 있다는 장점을 가지고, <br>
sum배열수식은 조건을 정의하기 위해 다른 함수를 사용할 수 있다는 장점을 가지는 정도겠다.
![img](https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/office/00996/00996_07.jpg)
::sp3

배열함수 내에서, find함수를 사용해서 와일드카드문자(여기서는 *)를 대체해서 사용하는 방법이었다. <br>
아래 표에서, 입금은행이 <br>
- 국민/기업은행 이면 "국민은행 또는 기업은행" 표시 <br>
- 우리은행 이면 "우리은행" 으로 표시 <br>
하려고 한다.
::sp
사용된 수식을 보면 입금은행 셀에서 "국민" 또는 "기업" 문자열을 FIND 함수로 찾고, <br>
이를 COUNT 함수로 에러가 아닌값을 숫자로 변환, <br>
- 결과가 0일 경우(같은 값이 없을 경우)IF 함수에서 FALSE 값인 "우리은행"을 반환하고, <br>
- 결과가 1 이상일 경우(같은 값이 있을 경우),IF 함수의 TRUE 값을 반환하게 된다. <br>
![img](https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/office/00996/00996_08.jpg)
::sp3

### 배열수식에서 영역참조 사용
위에서는 단일 셀값에 대한 처리였다면, <br>
일반적인 배열함수에 이를 적용하는 방식은 여러가지가 있을 수 있지만, <br>
여기서 사용한 방법은 FIND 함수에서 찾아진 에러 값을 ISERROR 함수로 TRUE로 처리하는 방법이다. <br>
::sp
위의 표를 아래 요약 테이블로 정리를 하려고 한다. <br>
- 요약 테이블 맨 왼쪽에 있는 입금은행 열을 기준으로 값을 찾아야 한다고 하자. <br>
** 은행이름이 앞 두자리만 있으므로 조건에 와일드카드 문자 사용이 필요하다. <br>
** 위 테이블에서 은행이름열은 '은행' , 금액은 '금액' 으로 영역에 대한 이름정의를 해두었다.<br>
![img](https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/office/00996/00996_09.jpg)
::sp3


두 가지 방법 중 뭘 사용해도 값은 동일하게 나온다. 사용된 수식을 살펴본다.<br>
::sp
- SUMIF 수식은 간단하다. 와일드카드문자를 &로 연결해서 사용하였다. <br>
![img](https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/office/00996/00996_10.jpg)
::sp3

- SUM 배열수식은 FIND 함수와 ISERROR함수, NOT함수를 연결해서 사용하였다. <br>
- FIND에서 발생한 에러(#VALUE)는 ISERROR 함수에 의해 TRUE가 되고, 숫자 값은 FALSE가 된다. <br>
- NOT으로 TRUE와 FALSE를 서로 바꿔준다. <br>
** iserror/not 함수를 isnumber 함수로 간략하게 처리도 가능하다. <br>
![img](https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/office/00996/00996_11.jpg)
::sp3

### 배열수식 - 영역참조 - 다중조건
위의 예시정도라면, 구지, 복잡한 함수들을 동원해서 수식을 작성할 필요가 없다. <br>
아래와 같은 경우는 어떨까? <br>
![img](https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/office/00996/00996_12.jpg)
::sp3

[23일 기업은행 입금금액] <br>
위에 작성된 배열수식을 2가지 조건으로 연결하였다. 23일은 일자를 텍스트형태로 바꿔서 조건을 달아주었다. <br>
![img](https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/office/00996/00996_13.jpg)
::sp3

[금요일 우리은행 또는 기업은행 입금금액] <br>
: 위와 마찬가지로 2가지 조건으로 연결하였다. 금요일은 일자를 텍스트형태로 바꿔서 조건을 달아주었다. <br>
: 은행이름은 find 함수에 배열을 넣는 방식으로 두가지 경우를 모두 포함하도록 하였다. <br>
![img](https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/office/00996/00996_14.jpg)
::sp3

끝.
::sp3