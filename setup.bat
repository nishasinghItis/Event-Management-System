@echo off
echo ========================================
echo ProJEMS - Event Management System Setup
echo ========================================
echo.

echo [1/4] Setting up Backend...
cd server
if not exist .env (
    echo Creating .env file...
    copy .env.example .env
    echo Please edit server\.env with your MongoDB URI and JWT secret
    pause
)
echo Installing backend dependencies...
call npm install
echo Backend setup complete!
echo.

echo [2/4] Setting up Frontend...
cd ..\client
echo Installing frontend dependencies...
call npm install
echo Frontend setup complete!
echo.

echo [3/4] Setup Complete!
echo.
echo ========================================
echo Next Steps:
echo ========================================
echo 1. Make sure MongoDB is running
echo 2. Edit server\.env if needed
echo 3. Open TWO terminal windows:
echo.
echo    Terminal 1 - Backend:
echo    cd server
echo    npm run dev
echo.
echo    Terminal 2 - Frontend:
echo    cd client
echo    npm run dev
echo.
echo 4. Open browser: http://localhost:5173
echo ========================================
echo.

echo [4/4] Would you like to start the servers now? (Y/N)
set /p start="Enter choice: "

if /i "%start%"=="Y" (
    echo Starting servers...
    start cmd /k "cd server && npm run dev"
    timeout /t 3
    start cmd /k "cd client && npm run dev"
    echo.
    echo Servers starting in new windows...
    echo Frontend: http://localhost:5173
    echo Backend: http://localhost:5000
) else (
    echo.
    echo Setup complete! Start servers manually when ready.
)

echo.
echo Press any key to exit...
pause >nul
