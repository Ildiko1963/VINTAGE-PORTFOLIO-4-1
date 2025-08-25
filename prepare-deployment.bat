@echo off
echo 🚀 Ildikostyle Portfolio - Deployment Előkészítő
echo ==============================================

REM Backup original files
echo 📁 Eredeti fájlok mentése...
copy package.json package.replit.json >nul 2>&1
copy vite.config.ts vite.config.replit.ts >nul 2>&1

REM Replace with production versions
echo 🔄 Production fájlok átkészítése...
copy package.production.json package.json
copy vite.config.production.ts vite.config.ts

REM Create .env if it doesn't exist
if not exist .env (
    echo 📝 .env fájl létrehozása...
    copy .env.example .env
    echo NODE_ENV=production >> .env
)

echo.
echo ✅ A projekt készen áll a deploymentre!
echo.
echo 🎯 Következő lépések:
echo 1. npm install
echo 2. npm run build (build tesztelése)
echo 3. Töltsd le a teljes projekt mappát
echo 4. Vercel.com → 'New Project' → drag&drop
echo.
echo 📚 Részletes útmutató: README-deployment.md
echo.
pause