@echo off
REM 🌱 Smart Plant Mobile - Installation & Testing Script (Windows)

echo 🚀 Installing Smart Plant Mobile App Dependencies...
echo.

REM Navigate to script directory
cd /d "%~dp0" || exit /b 1

REM Check if node_modules exists
if exist "node_modules" (
    echo ✅ node_modules found
) else (
    echo 📦 Installing npm packages...
    call npm install
    if errorlevel 1 (
        echo ❌ npm install failed
        exit /b 1
    )
    echo ✅ npm install completed successfully
)

echo.
echo 📋 Project Structure Verification...

REM Check key files
setlocal enabledelayedexpansion
set missing=0
set files=^
    "package.json"^
    "app.json"^
    "App.js"^
    "index.js"^
    "src\navigation\RootNavigator.js"^
    "src\context\AuthContext.js"^
    "src\context\PlantContext.js"^
    "src\screens\LoginScreen.js"^
    "src\screens\DashboardScreen.js"

for %%i in (%files%) do (
    if exist %%i (
        echo ✅ %%i
    ) else (
        echo ❌ Missing: %%i
        set /a missing+=1
    )
)

if %missing% equ 0 (
    echo.
    echo ✅ All essential files present!
    echo.
    echo 🎯 Next Steps:
    echo 1. Run: npm start
    echo 2. Scan QR code with Expo Go
    echo 3. Login with:
    echo    Email: demo@example.com
    echo    Password: demo123
    echo.
    echo 🌱 Happy plant watering!
) else (
    echo.
    echo ❌ %missing% file(s) missing. Please check your setup.
    exit /b 1
)

pause
