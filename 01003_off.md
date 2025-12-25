---
### essential info 
title: Office VBA tips
slug: 01003
date: 2025-12-22
cover: https://picsum.photos/800/400

### optional info 
# updated: 2025-12-22
# excerpt: 
category: dev
tags:
  - excel
  - vba
draft: false
# order: 10
---


## Error Handler with a Class Module

In VBA, where classes are not frequently used, you might wonder if it’s really necessary to implement an error handler as a class module. Still, compared to writing multiple lines of repetitive code, it might offer a slight improvement—so I decided to give it a try.   


***

### your Module
```vb
Dim eh As New ErrorHandler
'your codes
On Error GoTo Err_Handler
'your codes
Err_Handler:
    eh.CheckError
```


### your Class Modues - ErrorHandler
```vb
Option Explicit

Public Sub CheckError()
    If Err.Number <> 0 Then
        MsgBox "errNo : " & Err.Number & vbCr & _
               "err : " & Err.Description, vbCritical, "Error"
        Err.Clear
    End If
End Sub
```   

That said, you still end up writing around four lines of code, so in practice, the benefit may not be that significant.  

&nbsp;

***



# Using XLOOKUP in Office 2019
## Why
Microsoft only releases new features for MS365. Otherwise, you’re forced to purchase an entirely new version. Spending extra money just for a few new functions feels wasteful, so I decided to benchmark the new features and build them as user-defined functions instead.

## xlookup
Unlike VLOOKUP or HLOOKUP, the XLOOKUP function allows you to search for values without being restricted by row or column order. With a bit of VBA, you can implement a similar function yourself.

```vb
Function XLOOKUP(ByVal lookup_value As Variant, _
                 ByVal lookup_array As Range, _
                 ByVal return_array As Range, _
                 Optional ByVal if_not_found As Variant = CVErr(xlErrNA), _
                 Optional ByVal match_mode As Long = 0, _
                 Optional ByVal search_mode As Long = 1) As Variant
    
    Dim i As Long, n As Long
    Dim arrL As Variant, arrR As Variant
   
    
    arrL = lookup_array.value
    arrR = return_array.value
    n = UBound(arrL, 1) * UBound(arrL, 2) 
   
    Dim stepVal As Long
    stepVal = IIf(search_mode = -1, -1, 1)
   
    
    Dim isRow As Boolean
    isRow = (UBound(arrL, 1) = 1)
   
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
    
    XLOOKUP = if_not_found
End Function
```


## argument

Here are the arguments for the custom XLOOKUP   
{{< hint warning >}}
<b>lookup_value</b> <br>the value you want to find   <br>
<b>lookup_array</b> <br>the array containing the lookup values   <br>
<b>return_array</b> <br>the array containing the return values   <br>
<b>if_not_found(optional)</b> <br>the value to return if no match is found   <br>
<b>match_mode(optional)</b> <br>0 = exact match, 1 = next larger value, -1 = next smaller value   <br>
<b>search_mode(optional)</b> <br>1 = search from first to last, -1 = search from last to first      <br>
{{< /hint >}}



&nbsp;   
In essence, this approach is similar to combining INDEX + MATCH. Of course, it won’t perform as well as the native XLOOKUP, but it’s still a practical workaround for Office 2019 users.   

&nbsp;


***



