---
### essential info 
title: 엑셀 - 함수 - 오피스 하위버전(2019)에서 xlookup함수 사용하기
slug: '00994'
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

### xlookup
가끔 MS365에만 업데이트를 해주는 함수가 사용하고 싶을때가 있다. <br>
뭐가 문제인가. ai에게 만들어달라고 하면 된다.
::sp
아래 함수는 xlookup 함수의 생성코드이다. <br>
단 한번의 시도로 성공했다. <br>
사용자 함수로 저장을 해두면, 언제든 사용이 가능하다.
::sp
- 코드 샘플 <br>
```vb
Function XLOOKUP(ByVal lookup_value As Variant, _
                 ByVal lookup_array As Range, _
                 ByVal return_array As Range, _
                 Optional ByVal if_not_found As Variant = CVErr(xlErrNA), _
                 Optional ByVal match_mode As Long = 0, _
                 Optional ByVal search_mode As Long = 1) As Variant
    ' match_mode: 0 = 정확히 일치, 1 = 정확히 또는 다음 큰 값, -1 = 정확히 또는 다음 작은 값
    ' search_mode: 1 = 첫번째부터, -1 = 마지막부터

    Dim i As Long, n As Long
    Dim arrL As Variant, arrR As Variant
   
    ' 범위를 배열로 변환
    arrL = lookup_array.value
    arrR = return_array.value
    n = UBound(arrL, 1) * UBound(arrL, 2) ' 총 원소 수
   
    Dim stepVal As Long
    stepVal = IIf(search_mode = -1, -1, 1)
   
    ' 방향(행/열) 판정
    Dim isRow As Boolean
    isRow = (UBound(arrL, 1) = 1) ' 행벡터인지 확인
   
    If isRow Then
        Dim j As Long
        If stepVal = 1 Then
            For j = 1 To UBound(arrL, 2)
                If arrL(1, j) = lookup_value Then
                    XLOOKUP = arrR(1, j)
                    Exit Function
                End If
            Next j
        Else
            For j = UBound(arrL, 2) To 1 Step -1
                If arrL(1, j) = lookup_value Then
                    XLOOKUP = arrR(1, j)
                    Exit Function
                End If
            Next j
        End If
    Else
        If stepVal = 1 Then
            For i = 1 To UBound(arrL, 1)
                If arrL(i, 1) = lookup_value Then
                    XLOOKUP = arrR(i, 1)
                    Exit Function
                End If
            Next i
        Else
            For i = UBound(arrL, 1) To 1 Step -1
                If arrL(i, 1) = lookup_value Then
                    XLOOKUP = arrR(i, 1)
                    Exit Function
                End If
            Next i
        End If
    End If
   
    ' 찾지 못한 경우
    XLOOKUP = if_not_found
End Function
```
::sp3

### 사용방법
argument의 구성은 다음과 같다. 친절하게 주석도 달아주는 것이 아주 좋다.
```text
lookup_value : 찾을 값
lookup_array : 찾을 값이 있는 배열
return_array : 반환할 값이 있는 배열
(option) if_not_found : 값이 없을때 뱉어줄 값
(option) match_mode : 0 = 정확히 일치, 1 =정확히 다음 큰 값, -1 = 정확히 다음 작은 값
(option) search_mode : 1 = 첫번째부터, -1 = 마지막부터
```
::sp
그런데 수식을 곰곰히 보니... index, match 함수의 사용방식인 듯하다. <br>
::sp
아래 그림을 보자. <br>
gender를 기준으로 값을 왼쪽 열에서 불러오는 예시와, 가로 방향으로 데이터가 있을때 불러오는 예시이다.
![img](https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/office/00994/00994_01.webp)
::sp3

자... 이제 엑셀 능력자들이 소멸하는 일만 남은 것이다. <br>
끝.
::sp3