@echo off
setlocal

:menu
cls
echo Finance Learning Forge - Firebase Tools
echo ====================================
echo.
echo 1. Install Firebase CLI (globally)
echo 2. Login to Firebase
echo 3. Initialize Firebase Project (first time setup)
echo 4. Test Security Rules (start emulator)
echo 5. Deploy Security Rules
echo 6. Exit
echo.
set /p choice="Enter your choice (1-6): "

if "%choice%"=="1" goto install
if "%choice%"=="2" goto login
if "%choice%"=="3" goto init
if "%choice%"=="4" goto test
if "%choice%"=="5" goto deploy
if "%choice%"=="6" goto end

echo Invalid choice. Please try again.
timeout /t 2 >nul
goto menu

:install
echo Installing Firebase CLI globally...
call npm install -g firebase-tools
pause
goto menu

:login
echo Logging in to Firebase...
call firebase login
pause
goto menu

:init
echo Initializing Firebase project...
call firebase init
pause
goto menu

:test
echo Starting Firebase emulator for testing rules...
call npm run firebase:rules:test
pause
goto menu

:deploy
echo Deploying Firebase security rules...
call npm run firebase:rules:deploy
pause
goto menu

:end
echo Exiting...
exit /b 0
