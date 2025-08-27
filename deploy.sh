#!/bin/bash

echo "🚀 Building for deployment..."

# Clean previous build
rm -rf dist

# Build frontend with clean config
vite build --config vite.config.replit.ts

# Build backend
esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

echo "✅ Build complete! Files ready in dist/ folder"
echo "📁 Frontend: dist/public/"
echo "📁 Backend: dist/index.js"