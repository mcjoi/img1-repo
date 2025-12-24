---
### essential info 
title: Extracting Tables from PDF
slug: 02003
date: 2025-12-22
cover: https://picsum.photos/800/400

### optional info 
# updated: 2025-12-22
# excerpt: 
category: dev
tags:
  - python
  - windows
draft: false
# order: 10
---



# Extracting Tables from PDF Documents
## What is it?
I tried several methods for extracting tables from PDF files, and the method below seems to be the most effective - camelot package.   
However, for documents with heavy design elements, Python sometimes fails to recognize the tables correctly.
***

## code sample
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
&nbsp;  

***