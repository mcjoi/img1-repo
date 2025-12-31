---
### essential info 
title: python - PDF에서 테이블 추출하기 
slug: 02999
date: 2025-12-22
# updated: 2025-12-22 # 미설정 
cover: https://raw.githubusercontent.com/mcjoi/img1-repo/refs/heads/master/00_img/01_python.webp
category: dev
tags:
  - windows
  - pyhton

### optional info 

# excerpt: 텍스트를 입력합니다. # 미설정 
# order: 10 # 미설정 
# draft: false #미설정 
---

## What is it?
PDF파일에서 테이블을 추출하기 위해 OCR을 사용하거나, CSV로 변환하는 등 많은 방법을 사용해 보았다. <br>
하지만 테이블을 온전한 형태로 추출하는 것은 거의 불가능했고, 각각의 방법마다 뭔가 하나  빠진듯한 결과물이 나왔다. <br>
- PDF의 테이블은 테이블 형태의 데이터가 아니라 `텍스트 + 이미지(라인)`이기 때문에 벌어지는 현상으로 추정된다.
현재까지 사용해본 방법중에서는 `python`의 `camelot` 패키지가 가장 우수한 결과를 보여주기 때문에 이를 활용한 추출 코드 예시를 남긴다. <br>
- PDF 파일을 선택하면, 테이블이 있는 페이지에 대하여, 각 시트별로 테이블을 작성해준다.
::sp2
`code sample`
```python
import camelot
import pandas as pd
from tkinter import Tk
from tkinter.filedialog import askopenfilename, asksaveasfilename

# Hide the main Tkinter window
root = Tk()
root.withdraw()

# 1. Select a PDF file
pdf_file = askopenfilename(
    title="Select PDF File",
    filetypes=[("PDF files", "*.pdf")]
)

if not pdf_file:
    print("No PDF file selected.")
    exit()

# 2. Extract tables from the PDF using Camelot
# 'lattice': for tables with lines, 'stream': for tables without lines
tables = camelot.read_pdf(pdf_file, pages='all', flavor='lattice')

if tables.n == 0:
    print("No tables found in the PDF.")
    exit()

print(f"Number of tables found: {tables.n}")

# 3. Select the location to save the Excel file
excel_file = asksaveasfilename(
    title="Save as Excel",
    defaultextension=".xlsx",
    filetypes=[("Excel files", "*.xlsx")]
)

if not excel_file:
    print("No Excel file selected.")
    exit()

# 4. Save all extracted tables into an Excel file, each table in a separate sheet
with pd.ExcelWriter(excel_file, engine='openpyxl') as writer:
    for i, table in enumerate(tables):
        sheet_name = f"Table_{i+1}"  # Sheet name for each table
        table.df.to_excel(writer, index=False, sheet_name=sheet_name)

print(f"Excel file saved successfully: {excel_file}")

```
::sp2