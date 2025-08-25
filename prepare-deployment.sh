#!/bin/bash

echo "🚀 Ildikostyle Portfolio - Deployment Előkészítő"
echo "=============================================="

# Backup original files
echo "📁 Eredeti fájlok mentése..."
cp package.json package.replit.json 2>/dev/null || true
cp vite.config.ts vite.config.replit.ts 2>/dev/null || true

# Replace with production versions
echo "🔄 Production fájlok átkészítése..."
cp package.production.json package.json
cp vite.config.production.ts vite.config.ts

# Create .env if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 .env fájl létrehozása..."
    cp .env.example .env
    echo "NODE_ENV=production" >> .env
fi

echo ""
echo "✅ A projekt készen áll a deploymentre!"
echo ""
echo "🎯 Következő lépések:"
echo "1. npm install"
echo "2. npm run build (build tesztelése)"
echo "3. Töltsd le a teljes projekt mappát"
echo "4. Vercel.com → 'New Project' → drag&drop"
echo ""
echo "📚 Részletes útmutató: README-deployment.md"
echo ""