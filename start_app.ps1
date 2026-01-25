Write-Host "Starting Livora App..." -ForegroundColor Cyan

# Start Backend in a new window
Write-Host "Starting Backend (Flask)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; python app.py"

# Start Frontend in a new window
Write-Host "Starting Frontend (Vite)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"

Write-Host "Servers are starting in separate windows." -ForegroundColor Cyan
