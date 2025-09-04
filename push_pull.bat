@echo off
setlocal enabledelayedexpansion

cd /d E:\_gitpage_blog_img\1 || (
  echo ERROR: Cannot change directory
  pause
  exit /b 1
)

REM 현재 브랜치 확인
for /f %%i in ('git rev-parse --abbrev-ref HEAD') do set BRANCH_NAME=%%i

echo Working folder: %CD%
echo Current branch: %BRANCH_NAME%

REM 변경사항 있는지 확인
for /f %%i in ('git status --porcelain ^| find /v /c ""') do set STATUS_COUNT=%%i

if !STATUS_COUNT! GTR 0 (
  echo Changes detected: !STATUS_COUNT! files
  git add -A
  git commit -m "auto commit %DATE% %TIME%"
  git push origin %BRANCH_NAME%
) else (
  echo No changes to commit.
)

echo Done. Press any key to exit...
pause >nul
endlocal
