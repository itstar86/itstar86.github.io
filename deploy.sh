#!/bin/bash

set -e  # 에러 발생 시 스크립트 중단

echo "🚀 Starting deployment process..."

# 1. gh-pages 캐시 정리
echo "Step 1: Cleaning gh-pages cache..."
rm -rf node_modules/.cache/gh-pages/ 2>/dev/null || true

# 2. 이전 빌드 정리
echo "Step 2: Cleaning previous build..."
rm -rf dist/

# 3. 빌드
echo "Step 3: Building project..."
npm run build

# 4. 빌드 검증
echo "Step 4: Verifying build..."
if [ ! -f "dist/index.html" ]; then
    echo "❌ ERROR: Build failed - dist/index.html not found"
    exit 1
fi

if [ ! -d "dist/data-converter" ]; then
    echo "❌ ERROR: Build failed - dist/data-converter not found"
    exit 1
fi

if [ ! -f "dist/data-converter/index.html" ]; then
    echo "❌ ERROR: Build failed - dist/data-converter/index.html not found"
    exit 1
fi

# 5. 사이드바 코드 확인
if ! grep -q "sidebarOpen\|메뉴" dist/assets/index-*.js 2>/dev/null; then
    echo "⚠️  WARNING: Sidebar code might not be included in build"
fi

echo "✅ Build verification passed!"

# 6. 배포
echo "Step 5: Deploying to GitHub Pages..."
npx gh-pages -d dist -m "Deploy: $(date +'%Y-%m-%d %H:%M:%S')"

echo ""
echo "✅ Deployment completed successfully!"
echo "🌐 Your site should be available at:"
echo "   - https://itstar86.github.io/"
echo "   - https://itstar86.github.io/data-converter/"
