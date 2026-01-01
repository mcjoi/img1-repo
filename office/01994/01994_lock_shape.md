---
### essential info 
title: 파워포인트 - 도형 잠그기(office2019)
slug: 01994
date: 2026-01-02
# updated: 2025-12-22
cover: https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/00_img/04_powerpoint.webp
category: dev
tags: 
  - powerpoint
  # - excel  
  # - macrotoolkit

### optional info  
# excerpt: 텍스트를 입력합니다. # 미설정 
# order: 10 # 미설정 
# draft: false #미설정 
---


### 도형 잠그기
오피스365에는 도형 잠그기 기능이 있어 배경 등으로 사용된 박스, 이미지가 선택되지 않도록 할 수 있다. <br>
애석하게도 오피스2019버전에는 도형 잠그기 기능이 없는데.. 우회하는 방법으로 비슷하게 사용은 할 수 있다.

::sp2

### VBA코드
vba에 표준 모듈 2개와 클래스 모듈 1개를 만든다. 클래스 모듈의 이름을 clsPPTEvent 로 한다.
::sp
- 1번 표준 모듈 <br>
```vb
'proc module
Option Explicit
' 선택된 도형에 잠금 태그 추가
Sub MarkSelectedShapesAsLocked()
    Dim Sel As Selection
    Dim shp As Shape
   
    Set Sel = ActiveWindow.Selection
   
    If Sel.Type = ppSelectionShapes Then
        For Each shp In Sel.ShapeRange
            shp.Tags.Add "LOCKED", "1"
        Next shp
        MsgBox "선택된 도형에 LOCKED 태그를 달았습니다."
    Else
        MsgBox "도형을 선택한 상태에서 실행하세요."
    End If
End Sub

Sub UnlockLockedShapesOnCurrentSlide()
    Dim sld As Slide
    Dim shp As Shape
   
    ' 현재 창에서 보고 있는 슬라이드
    Set sld = ActiveWindow.View.Slide   
    For Each shp In sld.Shapes
        If shp.Tags("LOCKED") = "1" Then
            shp.Tags.Delete "LOCKED"
        End If
    Next shp   
    MsgBox "현재 슬라이드의 잠금(LOCKED 태그)을 모두 해제했습니다."
End Sub

Sub UnlockAllLockedShapes()
    Dim sld As Slide
    Dim shp As Shape
   
    For Each sld In ActivePresentation.Slides
        For Each shp In sld.Shapes
            If shp.Tags("LOCKED") = "1" Then
                shp.Tags.Delete "LOCKED"
            End If
        Next shp
    Next sld   
    MsgBox "프레젠테이션의 모든 잠금(LOCKED 태그)을 해제했습니다."
End Sub
```
::sp2

- 2번 표준 모듈 <br>
```vb
'==========================================
'exe module
Option Explicit
Public PPTEvent As clsPPTEvent
Sub StartLockMonitor()
    Set PPTEvent = New clsPPTEvent
    Set PPTEvent.App = PowerPoint.Application
    MsgBox "도형 잠금 감시가 시작되었습니다."
End Sub
```

::sp2

- 클래스 모듈 <br>
```vb
'==========================================
'class module
Option Explicit
Public WithEvents App As Application
Private Sub App_WindowSelectionChange(ByVal Sel As Selection)
    On Error Resume Next  
    Dim shp As Shape
    Dim sld As Slide   
    If Sel.Type = ppSelectionShapes Then
        For Each shp In Sel.ShapeRange
            If shp.Tags("LOCKED") = "1" Then
                'MsgBox "잠금된 도형은 선택할 수 없습니다.", vbExclamation
                ' 선택 강제 해제
                App.ActiveWindow.Selection.Unselect
                Exit Sub
            End If
        Next shp
    End If
End Sub
```

::sp2

방식은 
- 1번 표준 모듈의 MarkSelectedShapesAsLocked 로 선택한 도형에 마킹을 한다.
- 2번 표준 모듈의 StartLockMonitor 로 모니터링을 시작한다.
::sp
해제를 원한다면,
- 1번 표준모듈의 UnlockLockedShapesOnCurrentSlide 또는 UnlockAllLockedShapes 를 사용한다. 
- 선택된 슬라이드만 해제할지 전체를 해제할지에 따라 나뉜다.
::sp2

작동은 하지만, 사용하려면, 적어도 선택/시작/해제 버튼이 3개나 필요하므로.. 그냥 냅두기로 한다.
::sp 
이상 끝.

::sp2
