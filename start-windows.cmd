@echo off
setlocal

cd /d "%~dp0"

echo.
echo schoolp local server
echo --------------------

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed or is not available in PATH.
  echo Install Node.js LTS from https://nodejs.org/
  echo After installing, close Codex and PowerShell, then open them again.
  echo.
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo npm is not installed or is not available in PATH.
  echo Reinstall Node.js LTS from https://nodejs.org/
  echo After installing, close Codex and PowerShell, then open them again.
  echo.
  pause
  exit /b 1
)

set PORT_PID=
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3000" ^| findstr "LISTENING"') do (
  set PORT_PID=%%a
)

if defined PORT_PID (
  echo Port 3000 is already in use. Closing the existing local server...
  taskkill /PID %PORT_PID% /F >nul 2>nul
  timeout /t 2 >nul
)

if not exist node_modules (
  echo Installing dependencies...
  call npm.cmd install
  if errorlevel 1 (
    echo npm install failed.
    echo Send this screen to the developer.
    pause
    exit /b 1
  )
)

echo.
echo Opening http://localhost:3000
echo Keep this window open while working.
echo Press Ctrl+C in this window to stop the server.
echo.

call npm.cmd run dev
pause
