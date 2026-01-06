---
### essential info 
title: 엑셀 - 배열수식
slug: '00993'
date: 2026-01-05
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

### 배열(array)
엑셀의 초급과 중급을 나누는 기준은 배열수식을 아는지 모르는지에 있다고 확실히 말할 수 있다. <br>
하지만, 알고 보면 어렵지 않으니, 아직 개념이 부족하다면, 확실히 해두고 갈 필요가 있다. <br>
배열은 일반적인 프로그래밍에서 list 혹은 array 라고 불리우며, 1차원 배열 {1,2,3,4} 또는 리스트 [x,x,x,x...] 같은 여러 값의 묶음을 의미한다. <br>
그런데 이게 뭐 어떻단 말인가? <br>
::sp
간단하게 sum 함수를 예로 들자. <br>
sum 함수의 인수는 단일 값들일 수 있고, 영역을 선택한 여러 값일 수 있다. <br>
여기서 값들은 array로 묶이게 된다. 이후 sum이라는 연산을 수행하게 된다.<br>
```vb
= sum(1,2,3,4) '{1,2,3,4} 입력된 값들의 array 생성 후, 각 요소를 합산
= sum(A1:B2) '{1,2,3,4} 영역의 값들의 array 생성 후, 각 요소를 합산
```
sum 함수를 사용하는 당신은 이미 배열을 사용하고 있다는 뜻이다.

::sp2

### 배열수식(arrayformula)
일반적으로 배열수식이라 하면, 대표적으로 sum + if 문으로 구성된 수식에 배열수식 처리(ctrl + enter)를 해준 수식을 말하는데, 다른 함수에 비해, 특별 대우를 받는 셈이다. <br>
이후, sumif 나 sumifs 함수가 나오면서 위의 sum + if 배열수식을 대신할 수 있게 되었다. <br>
그럼에도 원초적인 sum + if 배열수식이 의미가 있는 것은 배열수식이 어떤식으로 동작을 하는지 직관적으로 확인할 수 있다는 점이겠다. <br>
::sp
예시를 보자.
```vb
'a1:b2 = {1,2,1,4}
= sum(if(a1:b2 = 1, 1, 0)) 
```
a1:b2 array에서 true인 1, 3번째이므로, 위의 if문이 반환하는 배열 값은 {1, 0, 1, 0} 이다. 하지만, 엑셀의 if 함수는 한가지 값만 반환을 하고, 여기서는 1을 반환한다. 따라서, sum(1)이 되니, 안타깝게도 답은 1이 된다. <br> 동일한 수식을 배열수식 처리(ctrl + enter) 해주면 반환 값은 배열의 값을 합산한 2가 된다. <br>
즉, 배열로 반환되는 값을 배열로 인식시키는 것이 배열수식의 역할이다.
- 구글 시트에서는 배열수식 처리 방식이 엑셀과 좀 다른데, arrayformula 라는 함수를 사용하며, 그렇지 않을 경우, 오류가 난다. 엑셀에서는 오류가 나지 않고, 첫번째 값으로 계산이 되어버리기 때문에, 제대로 처리 되어있는지 {=수식} 형태를 확인해줘야 한다.

::sp2

### 배열수식의 응용
위의 수식을 천천히 보면, if 함수의 결과를 배열로 만들어야 하는 이유는 조건 값이 여러 값(여기서는 영역)으로 지정이 되어 있기 떄문이다. 여러 값에 대하여 조건이 참인지 거짓인지에 따라 if문은 새로운 배열을 만드는 과정이다.
::sp
여기서는 1 아니면 0이 되도록 했으므로, 조건이 참인 값의 수가 되는 count 함수의 역할을 하게 되는 셈이다. (countif 함수와 동일)
::sp
그렇다면, 2개 이상의 조건을 적용할 수 있고, 참인 경우 대입할 값을 변경할 수 있다는 말이다.
```vb
= sum(if((배열1 = x)*(배열2 = y), 배열3))
```
::sp
여기서 1차원 배열의 성분값(n)은 동일해야 한다.  n=3인 경우를 예로 들면 대략 구조는 다음과 같이 된다. 
```vb
= sum(if({true, true, false}*{true, false, true}, {1,2,3}))
```
위 수식의 결과 값은 1이 된다. 여기서 사용된 조건식 사이의 * 는 and 조건을 의미하는데, 이유는 true 는 1이고, false는 0이니, 각 값을 곱하면, {1, 0, 0} = {true, false, false} 가 되는 것이다. 
::sp
이렇게 만들어진 boolean(true, false) 값으로 대상이 되는 배열에서의 true번쨰 값을 선택하여 합산을 할 새로운 배열을 생성하게 되고 해당 값들의 sum함수의 인자가 되어 합산이 된다.
::sp
같은 원리로 or 조건은 + 기호로 표시할 수 있다. 위의 수식에서 * 대신 + 를 사용했다면 조건에서 생성되는 배열은 {1, 1, 1} = {true, true, true} 가 될 것이므로, 모든 값이 더해질 것을 알 수 있다.
::sp
엑셀에서의 상황을 생각해보면.. a, b, c 컬럼이 있다면, a, b 컬럼의 조건을 만족하는 c 컬럼의 값을 합산하는 수식을 만들 수 있다는 것이다.

::sp2

### 예제
mtcars 데이터 셋을 가지고 간단한 연습을 해본다. 컬럼 이름은 사전에 이름정의를 해두었다.
::sp

- 조건에 맞는 갯수 구하기 : carb 컬럼 값이 "4" 인 model의 count
```vb
{=SUM(IF(carb=4,1))} 'result : 10
```
![img](https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/office/00993/00993_1.webp)
::sp2

- 조건에 맞는 배열의 합계 구하기 : carb 컬럼 값이 "4" 인 model의 gear 값 합계
```vb
{=SUM(IF(carb=4,gear))} 'result : 36
```
![img](https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/office/00993/00993_2.webp)
::sp2

- 특정 글자가 포함된 조건 사용(와일드 카드 문자) : model에 "Merc" 문자열이 포함되고, carb가 "4" 인 model 의 gear 값 합계
```vb
{=SUM(IF(ISNUMBER(FIND("Merc", model))*(carb=4),gear))} 'result : 8
```
![img](https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/office/00993/00993_3.webp)
::sp2


- 특정 글자가 포함된 조건 사용(와일드 카드 문자) + or 옵션 : model에 "Merc" 또는 "Mazda" 문자열이 포함되고, carb가 "4" 인 model 의 gear 값 합계
```vb
{=SUM(IF( ISNUMBER(FIND({"Merc","Mazda"}, model)) * (carb=4), gear))} 'result : 16
```
![img](https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/office/00993/00993_4.webp)
::sp2


몇 가지 예제를 적었지만, 기호에 따라 다양한 함수 또는 조건을 넣을 수 있다. 개인적으로 sumifs 보다 자유도가 높다는 점에서 선호하는 방식이기도 하다.
::sp

끝.
::sp2