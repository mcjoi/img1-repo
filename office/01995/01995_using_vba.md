---
### essential info 
title: 엑셀-파워포인트 VBA/매크로 사용하기
slug: 01996
date: 2025-12-31
# updated: 2025-12-22
cover: https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/00_img/02_vba.webp
category: dev
tags: 
  - powerpoint
  - excel  
  # - macrotoolkit

### optional info  
# excerpt: 텍스트를 입력합니다. # 미설정 
# order: 10 # 미설정 
# draft: false #미설정 
---


## VBA(매크로)
엑셀과 파워포인트의 기능은 수십년간 쌓여온 노하우에 의해 축적된 기술의 총집합이라 할 수 있다. 감히 누가 여기에 이견을 달 수 있을까? 하지만, 너무 많은 기능들은 오히려 접근성을 떨어뜨리는 원인이 되니, 가끔은 자주쓰는 기능을 입맛에 맞게 VBA(매크로)로 구성해 둔다면, 혼란에서 벗어날 수 있다.

## 추가 기능(add-in)
엑셀이든 파워포인트든 VBA 코드가 포함된 파일(.xlsm, .pptm)로 저장할 수 있지만, 새로 파일을 만들었을 때 해당 기능을 사용할 수 없고,  문서를 주고 받는 경우, 상당한 거부감이 들 수밖에 없다. <br>
그래서 일반적으로 프로그램 실행시 백그라운드에서 자동으로 동작하는 추가기능(add-in) 형태로 구성을 하게 된다. <br>
엑셀과 파워포인트의 추가기능 형태는 다소 차이가 있다.

::sp

### 엑셀
엑셀에서 사용하는 파일 포맷은 다음과 같다.
```text
- .xlsx : 통합문서, VBA 미포함
- .xlsm : 매크로 포함 통합문서
- .xlam : 추가기능(add-in)
```
:::sp

- .xlsx 파일에 VBA 코드를 작성
- .xlam 파일로 저장한다.
- xlstart 폴더에 저장한다. (일반적인 xlstart경로 : `C:\Users\[PC이름]\AppData\Roaming\Microsoft\Excel\XLSTART`)
:::sp

xlstart 경로에 저장된 파일은 엑셀 프로그램이 실행되면 그것이 어떤 파일이든 무조건 동반 실행된다. <br>
.xlam 파일은 추가기능 파일이기 때문에, VBE를 켜지 않으면 확인이 불가능하다. 따라서 리본 메뉴에 자동 노출되는 코드를 함께 작성해줘야 한다. <br>
리본 메뉴 등록 코드를 작성했다면, add-in 메뉴가 생기고 해당 메뉴 클릭시 등록해둔 VBA 프로시저들이 노출된다.

:::sp 2

### 파워포인트
엑셀에서 사용하는 파일 포맷은 다음과 같다.
```text
- .pptx : 기본 문서 파일 포맷
- .pptm : 매크로 포함 문서 파일
- .ppam : 추가기능(add-in)
```

 

 

엑셀과의 차이
기본적으로 모든 추가기능은 내가 원하는 저장위치에서 호출이 가능하다. 하지만, 엑셀의 경우, 시작되는 시점에 자동으로 불러오는 xlstart 폴더가 존재하기 때문에, 해당 폴더에 xlam파일을 저장하는 것이 편하다.

 

하지만 파워포인트는 시작과 동시에 불러오는 방식이 아니라, 추가기능 파일을 등록해서 사용하는 방식이다. MS에서는 편의상 addin폴더를 두고, 추가기능 파일 등록시 해당 폴더가 열리게 되어있지만, 반드시 addin폴더에 저장해야하는 것은 아니다.

 

하지만, 편한것은 사실이므로 이렇게 나눠서 생각하자.

엑셀 xlstart 폴더 경로 : C:\Users\ [username] \AppData\Roaming\Microsoft\Excel\XLSTART\

파워포인트 addin 폴더 경로 : C:\Users\ [username] \AppData\Roaming\Microsoft\AddIns\

 

추가기능 등록 창
추가기능 등록 창
 

 


 

 

추가기능 관리
애석하게도 .ppam파일은 direct로 열어서 수정이 불가능하다. 이에 따라, 파일을 관리하는 방법은 많겠지만, 

ppam파일만을 열면 vba창이 활성화되지 않음
ppam파일만을 열면 vba창이 활성화되지 않음
 

 

나의 경우, addin폴더 안에 .pptm 파일과 .ppam 파일을 동시에 두고, .pptm으로 매크로를 수정하고 난 뒤, 다른 이름으로 저장하기로 .ppam파일을 생성한다.

 

여기까지 대략적인 설명은 끝이다. 

 


 

끝.