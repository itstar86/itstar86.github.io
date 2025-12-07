#!/bin/bash

set -e  # 에러 발생 시 스크립트 중단

echo "Step 1: Cleaning previous build..."
rm -rf dist/
rm -rf node_modules/.cache/gh-pages/

echo "Step 2: Installing dependencies..."
npm install

echo "Step 3: Building project..."
npm run build

echo "Step 4: Verifying build..."
if [ ! -f "dist/index.html" ]; then
    echo "ERROR: Build failed - dist/index.html not found"
    exit 1
fi

if [ ! -d "dist/data-converter" ]; then
    echo "ERROR: Build failed - dist/data-converter not found"
    exit 1
fi

echo "Step 5: Deploying to GitHub Pages..."
npx gh-pages -d dist -m "Deploy latest build with sidebar"

echo "✅ Build and deploy completed successfully!"
