@echo off
setlocal enabledelayedexpansion

cd /d E:\_gitpage_blog_img\1 || (
  echo ERROR: cannot change directory to E:\_gitpage_blog_img\1
  pause
  exit /b 1
)

echo Working folder: %CD%

REM 현재 브랜치 가져오기
for /f %%i in ('git rev-parse --abbrev-ref HEAD 2^>nul') do set BRANCH_NAME=%%i
if "%BRANCH_NAME%"=="" (
  echo ERROR: Not a git repository or git not installed.
  pause
  exit /b 1
)
if "%BRANCH_NAME%"=="HEAD" (
  echo ERROR: Detached HEAD. Please checkout a branch.
  pause
  exit /b 1
)
echo Current branch: %BRANCH_NAME%

echo.
echo --- fetching origin ---
git fetch origin 2>fetch_err.txt
if errorlevel 1 (
  echo WARNING: git fetch failed. See fetch_err.txt
  type fetch_err.txt
) else (
  del fetch_err.txt 2>nul
)

echo.
echo --- check uncommitted changes ---
for /f %%i in ('git status --porcelain ^| find /v /c ""') do set STATUS_COUNT=%%i
echo Uncommitted changes (working tree): !STATUS_COUNT!

if !STATUS_COUNT! GTR 0 (
  echo Staging all changes...
  git add -A 2>add_err.txt
  if errorlevel 1 (
    echo ERROR: git add failed:
    type add_err.txt
    del add_err.txt
    pause
    exit /b 1
  ) else del add_err.txt 2>nul

  for /f %%i in ('git diff --cached --name-only ^| find /v /c ""') do set STAGED_COUNT=%%i
  echo Staged files: !STAGED_COUNT!

  if !STAGED_COUNT! GTR 0 (
    echo Committing...
    git commit -m "auto sync commit %DATE% %TIME%" 2>commit_err.txt
    if errorlevel 1 (
      echo ERROR: git commit failed or nothing to commit.
      type commit_err.txt
      del commit_err.txt
      echo Showing git status --porcelain for debugging:
      git status --porcelain
      echo If files are ignored, run: git status --ignored -s
      pause
      exit /b 1
    ) else (
      del commit_err.txt 2>nul
      echo Commit succeeded.
    )
  ) else (
    echo Nothing staged after git add. (Files might be ignored by .gitignore)
    echo Run: git status --ignored -s   or   git check-ignore -v <path>  to inspect.
  )
) else (
  echo No local changes to commit.
)

echo.
echo --- compute ahead/behind wrt origin/%BRANCH_NAME% ---
for /f "tokens=1,2" %%a in ('git rev-list --left-right --count %BRANCH_NAME%...origin/%BRANCH_NAME% 2^>nul') do (
  set LOCAL_AHEAD=%%a
  set REMOTE_AHEAD=%%b
)

if "!LOCAL_AHEAD!"=="" set LOCAL_AHEAD=0
if "!REMOTE_AHEAD!"=="" set REMOTE_AHEAD=0

echo Local ahead: !LOCAL_AHEAD!
echo Remote ahead: !REMOTE_AHEAD!

if !LOCAL_AHEAD! GTR 0 if !REMOTE_AHEAD! EQU 0 (
  echo ==== PUSH (local ahead) ====
  git push origin %BRANCH_NAME% 2>push_err.txt
  if errorlevel 1 (
    echo ERROR: git push failed:
    type push_err.txt
    del push_err.txt
    echo Possible reasons: auth failure (use PAT or SSH), or remote rejected.
    pause
    exit /b 1
  ) else (
    del push_err.txt 2>nul
    echo Push succeeded.
  )
) else if !REMOTE_AHEAD! GTR 0 if !LOCAL_AHEAD! EQU 0 (
  echo ==== PULL (remote ahead) ====
  git pull origin %BRANCH_NAME% 2>pull_err.txt
  if errorlevel 1 (
    echo ERROR: git pull failed:
    type pull_err.txt
    del pull_err.txt
    echo Manual merge may be required.
    pause
    exit /b 1
  ) else (
    del pull_err.txt 2>nul
    echo Pull succeeded.
  )
) else if !LOCAL_AHEAD! GTR 0 if !REMOTE_AHEAD! GTR 0 (
  echo ==== CONFLICT WARNING ====
  echo Both local and remote have new commits. Manual merge required.
) else (
  echo ==== Already up to date ====
)

echo.
echo Done. Press any key to exit...
pause >nul
end
