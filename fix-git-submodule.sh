#!/bin/bash

echo "🔧 Fixing Git submodule issues..."

# 1. gh-pages 캐시 폴더 삭제
echo "Step 1: Removing gh-pages cache..."
rm -rf node_modules/.cache/gh-pages/

# 2. .gitmodules 파일이 있다면 삭제
if [ -f .gitmodules ]; then
    echo "Step 2: Removing .gitmodules file..."
    git rm --cached .gitmodules 2>/dev/null || true
    rm -f .gitmodules
fi

# 3. Git에서 캐시 폴더 추적 제거
echo "Step 3: Removing cache folder from Git tracking..."
git rm -r --cached node_modules/.cache/gh-pages/ 2>/dev/null || true

# 4. .git/modules에서 submodule 참조 제거
echo "Step 4: Cleaning Git submodule references..."
rm -rf .git/modules/node_modules 2>/dev/null || true

# 5. Git 설정에서 submodule 제거
if [ -f .git/config ]; then
    echo "Step 5: Cleaning Git config..."
    # submodule 관련 설정 제거 (sed로 처리)
    sed -i.bak '/\[submodule.*gh-pages\]/,/^\[/d' .git/config 2>/dev/null || true
    rm -f .git/config.bak
fi

# 6. 변경사항 커밋 (필요한 경우)
echo "Step 6: Checking Git status..."
git status

echo "✅ Git submodule cleanup completed!"
echo ""
echo "Next steps:"
echo "1. Review the changes: git status"
echo "2. Commit if needed: git add .gitignore && git commit -m 'Fix: Remove gh-pages cache from Git'"
echo "3. Build and deploy: npm run build && npx gh-pages -d dist"
