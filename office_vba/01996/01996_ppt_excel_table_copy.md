---
### essential info 
title: 엑셀-파워포인트 테이블(표) 연동 관련
slug: 01996
date: 2025-12-29
# updated: 2025-12-22
cover: https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/00_img/04_powerpoint.webp
category: office
tags: 
  - powerpoint
  # - macrotoolkit

### optional info  
# excerpt: 텍스트를 입력합니다. # 미설정 
# order: 10 # 미설정 
# draft: false #미설정 
---

## What to do
엑셀의 특정영역을 카피해서 파워포인트에 붙이기를 하면, 일반 표 형태로 엑셀이 달라붙어서 서식을 다시 지정해줘야하고,`import`로 엑셀을 임베딩 시키면 위치나 모양 디자인을 잡기가 그지 같아진다.
::sp
그래서 다들 본인들 편한 방식으로 엑셀과 파워포인트간 테이블 연동을 처리 하고 있을 것이다.
::sp2

### 테이블 통째로 복사 - 방법 개선
생각할 수 있는 첫번째 방법은 파워포인트에서 만든 테이블 양식을 엑셀에다 붙이고, 데이터 작업을 해서, 데이터만 다시 복사하는 방법이다.
::sp
테이블 양식을 고스란히 유지한다는 점에서 손이 덜가긴 하지만, 아쉽게도 엑셀에는 파워포인트 테이블 셀에서의 `margin` 값이 없다. `margin` 값 정보가 없으니, 0,0,0,0 으로 변한다.(숫자의 경우, 대부분 끝쪽에 아주 보기 싫게 붙는다.)
::sp
`margin` 값을 때마다 고쳐주는 것도 귀찮으니, `default` 값으로 변경하는 VBA를 짜본다.<br> 
물론 기존 테이블이 default margin 값(0.25, 0.25, 0.13, 0.13)을 사용했었다는 전제다.
::sp
아래 프로시저로 `margin` 값을 초기화 할 수 있다.
::sp
- sample code
```vb
Option Explicit
Public Sub SetSelectedTableCellMargins_CM()
    ' cm → pt 변환 상수
    Const CM_TO_PT As Double = 28.3464567
    Const M_LEFT As Double = 0.25 * CM_TO_PT
    Const M_RIGHT As Double = 0.25 * CM_TO_PT
    Const M_TOP As Double = 0.13 * CM_TO_PT
    Const M_BOTTOM As Double = 0.13 * CM_TO_PT

    Dim sr As ShapeRange
    Dim shp As Shape
    Dim tbl As Table
    Dim r As Long, c As Long
    Dim changed As Long

    If ActiveWindow Is Nothing Then Exit Sub
    If ActiveWindow.Selection Is Nothing Then Exit Sub

    On Error GoTo EH
    Set sr = ActiveWindow.Selection.ShapeRange
    On Error GoTo 0

    If sr Is Nothing Or sr.Count = 0 Then
        MsgBox "표 안에서 셀 영역을 선택한 후 실행하세요.", vbInformation
        Exit Sub
    End If

    For Each shp In sr
        If shp.HasTable Then
            Set tbl = shp.Table

            For r = 1 To tbl.Rows.Count
                For c = 1 To tbl.Columns.Count
                    If tbl.Cell(r, c).Selected Then
                        With tbl.Cell(r, c).Shape.TextFrame
                            .MarginLeft = M_LEFT
                            .MarginRight = M_RIGHT
                            .MarginTop = M_TOP
                            .MarginBottom = M_BOTTOM
                        End With
                        changed = changed + 1
                    End If
                Next c
            Next r
        End If
    Next shp

    If changed = 0 Then
        MsgBox "선택된 셀이 없습니다. 셀을 드래그 선택 후 실행하세요.", vbInformation
    Else
        MsgBox "완료: 선택된 셀 " & changed & "개에 cm 기준 여백을 적용했습니다.", vbInformation
    End If
    Exit Sub
EH:
    MsgBox "표 또는 셀 선택 상태를 확인하세요.", vbInformation
End Sub
```
::sp
급하게 작업을 할때, 파워포인트의 테이블을 엑셀로 붙여서 작업을 하고 또 복사를 하는 과정을 되풀이 하는데, 어느 정도 작업이 마무리 되었을 떄, 한번에 처리를 해주면 좀 수월해진다. 

::sp2
***
::sp2

### 파일 연동(링크) - 방법 개선
`import`로 파일 임베딩 연동(링크) 방법을 사용하면, 위에 언급했듯 디자인하기가 꽤나 까다로워지므로, ppt원본과 엑셀파일을 연동해두고, 같은 폴더 안에 관리하면서, 필요할때만 업데이트 하는 방식을 생각해 볼 수 있다.(업데이트를 하지 않으면, 텍스트 값은 그대로 유지)
::sp
ppt의 특정 테이블에 대해서 연동/업데이트를 위한 두 개의 버튼이 필요하다.
- 첫번째는 파일간 링크를 만들어주고 엑셀의 특정 영역과 ppt의 테이블을 연결해주는 작업이다. (엑셀파일을 끈 상태로 클릭)
- 두번째는 엑셀 파일의 내용이 변경이 되었을 때, 데이터를 업데이트 하는 작업이다. (엑셀파일을 켠 상태로 클릭)
::sp
장기적인 관점에서 데이터만 따로 연산을 해야하는 경우, 사용할 수 있다. 데이터만 가져가기 때문에, 표 서식은 그대로 유지된다.
::sp
나름 꽤 사용성이 높다고 할 수 있지만, 행이나 열을 계속 추가하거나, 삭제 해야하는 경우는 비추천이다. 
::sp
- code sample
```vb
Option Explicit
Public Sub LinkExcelRange_AndSaveMapping()

    Dim shp As Shape
    Dim tbl As Table

    '1) 표 선택 확인
    If ActiveWindow.Selection.Type <> ppSelectionShapes Then
        MsgBox "PPT에서 표를 선택한 뒤 실행하세요.", vbInformation
        Exit Sub
    End If

    Set shp = ActiveWindow.Selection.ShapeRange(1)
    If Not shp.HasTable Then
        MsgBox "선택한 개체가 표가 아닙니다.", vbInformation
        Exit Sub
    End If
    Set tbl = shp.Table

    '2) Excel 파일 선택
    Dim fd As FileDialog, xlPath As String
    Set fd = Application.FileDialog(msoFileDialogFilePicker)

    With fd
        .Title = "연결할 Excel 파일 선택"
        .Filters.Clear
        .Filters.Add "Excel Files", "*.xlsx;*.xlsm;*.xls", 1
        If .Show <> -1 Then Exit Sub
        xlPath = .SelectedItems(1)
    End With

    '3) Excel 열기
    Dim xlApp As Object, xlWb As Object, xlRng As Object
    Set xlApp = CreateObject("Excel.Application")
    xlApp.Visible = True
    Set xlWb = xlApp.Workbooks.Open(xlPath)

    '4) 범위 선택
    Set xlRng = xlApp.InputBox( _
        Prompt:="연결할 Excel 범위를 선택하세요.", _
        Title:="범위 선택", _
        Type:=8)

    If xlRng Is Nothing Then GoTo CLEANUP

    '5) 표 크기 조정
    ResizePPTTable tbl, xlRng.Rows.Count, xlRng.Columns.Count

    '6) 값 입력
    Dim r As Long, c As Long
    For r = 1 To xlRng.Rows.Count
        For c = 1 To xlRng.Columns.Count
            tbl.Cell(r, c).Shape.TextFrame.TextRange.Text = _
                CStr(xlRng.Cells(r, c).Value)
        Next c
    Next r

    '7) ? 연결 정보 저장 (핵심)
    With shp.Tags
        .Add "XL_File", xlWb.FullName
        .Add "XL_Sheet", xlRng.Worksheet.Name
        .Add "XL_Range", xlRng.Address(False, False)
    End With

    MsgBox "연결 완료: 이후에는 업데이트만 실행하면 됩니다.", vbInformation

CLEANUP:
    xlWb.Close SaveChanges:=False
    xlApp.Quit
End Sub

Public Sub UpdateFromSavedExcelMapping()
    Dim shp As Shape
    Dim tbl As Table

    '1) 표 선택 확인
    If ActiveWindow.Selection.Type <> ppSelectionShapes Then
        MsgBox "업데이트할 표를 선택하세요.", vbInformation
        Exit Sub
    End If

    Set shp = ActiveWindow.Selection.ShapeRange(1)
    If Not shp.HasTable Then
        MsgBox "선택한 개체가 표가 아닙니다.", vbInformation
        Exit Sub
    End If
    Set tbl = shp.Table

    '2) 저장된 연결 정보 확인
    If shp.Tags("XL_File") = "" Then
        MsgBox "이 표에는 Excel 연결 정보가 없습니다.", vbInformation
        Exit Sub
    End If

    Dim xlPath As String, xlSheet As String, xlAddr As String
    xlPath = shp.Tags("XL_File")
    xlSheet = shp.Tags("XL_Sheet")
    xlAddr = shp.Tags("XL_Range")

    '3) 열려있는 Excel 연결
    Dim xlApp As Object, xlWb As Object, xlRng As Object
    On Error Resume Next
    Set xlApp = GetObject(, "Excel.Application")
    On Error GoTo 0

    If xlApp Is Nothing Then
        MsgBox "Excel이 열려 있지 않습니다.", vbInformation
        Exit Sub
    End If

    Set xlWb = xlApp.Workbooks.Open(xlPath, ReadOnly:=True)
    Set xlRng = xlWb.Worksheets(xlSheet).Range(xlAddr)

    '4) 표 크기 보정
    ResizePPTTable tbl, xlRng.Rows.Count, xlRng.Columns.Count

    '5) 값 업데이트
    Dim r As Long, c As Long
    For r = 1 To xlRng.Rows.Count
        For c = 1 To xlRng.Columns.Count
            tbl.Cell(r, c).Shape.TextFrame.TextRange.Text = _
                CStr(xlRng.Cells(r, c).Value)
        Next c
    Next r

    MsgBox "업데이트 완료 (기존 연결 범위 유지).", vbInformation
End Sub

Private Sub ResizePPTTable(ByRef tbl As Table, _
                           ByVal targetRows As Long, _
                           ByVal targetCols As Long)

    Do While tbl.Rows.Count < targetRows
        tbl.Rows.Add
    Loop
    Do While tbl.Rows.Count > targetRows
        tbl.Rows(tbl.Rows.Count).Delete
    Loop

    Do While tbl.Columns.Count < targetCols
        tbl.Columns.Add
    Loop
    Do While tbl.Columns.Count > targetCols
        tbl.Columns(tbl.Columns.Count).Delete
    Loop
End Sub
```
::sp2
두 가지 방법 모두 엑셀의 연산이 필요함을 전제하므로, 그냥 텍스트 테이블이라면 그냥 ppt에서 치는게 훨씬 수월하다는건 구지 설명 안해도 될 것이다.
::sp 
이상 끝.
::sp2