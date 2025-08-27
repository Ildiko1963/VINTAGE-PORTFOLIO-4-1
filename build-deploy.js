#!/usr/bin/env node

import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';

console.log('🚀 Building for deployment...');

// 1. Build frontend
console.log('📦 Building frontend...');
execSync('vite build', { stdio: 'inherit' });

// 2. Build backend WITHOUT external packages
console.log('🔧 Building backend...');
execSync('esbuild server/index.ts --platform=node --bundle --format=esm --outdir=dist', { stdio: 'inherit' });

console.log('✅ Deployment build complete!');