@echo off
cd /d E:\_gitpage_blog_img\1

:START

REM 최신 원격 정보 가져오기
git fetch origin

REM 현재 브랜치 확인
for /f %%i in ('git rev-parse --abbrev-ref HEAD') do set BRANCH_NAME=%%i
echo ==============================
echo Current branch: %BRANCH_NAME%
echo ==============================

REM 로컬와 원격 커밋 상태 확인
git rev-list --left-right --count %BRANCH_NAME%...origin/%BRANCH_NAME% > temp_diff.txt
set /p DIFF=<temp_diff.txt
del temp_diff.txt

REM left = 로컬 ahead, right = 원격 ahead
for /f "tokens=1,2" %%a in ("%DIFF%") do (
    set LOCAL_AHEAD=%%a
    set REMOTE_AHEAD=%%b
)

echo Local ahead: %LOCAL_AHEAD%
echo Remote ahead: %REMOTE_AHEAD%

REM 상태별 처리
if %LOCAL_AHEAD% GTR 0 if %REMOTE_AHEAD% EQU 0 (
    echo ==== PUSH ====
    git add .
    git commit -m "auto sync commit"
    git push origin %BRANCH_NAME%
    goto END
)

if %REMOTE_AHEAD% GTR 0 if %LOCAL_AHEAD% EQU 0 (
    echo ==== PULL ====
    git pull origin %BRANCH_NAME%
    goto END
)

if %LOCAL_AHEAD% GTR 0 if %REMOTE_AHEAD% GTR 0 (
    echo ==== CONFLICT WARNING ====
    echo Both local and remote have new commits.
    echo Manual merge is required!
    goto END
)

echo ==== Already up to date ====

:END
echo ==============================
echo Script finished. Press any key to exit...
pause >nul
