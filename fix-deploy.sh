#!/bin/bash

# gh-pages 캐시 폴더 삭제
echo "Cleaning gh-pages cache..."
rm -rf node_modules/.cache/gh-pages/

# Git에서 캐시 폴더 추적 제거 (이미 추적 중인 경우)
git rm -r --cached node_modules/.cache/gh-pages/ 2>/dev/null || true

# .gitmodules 파일이 있다면 삭제 (잘못된 submodule 설정 제거)
if [ -f .gitmodules ]; then
    echo "Removing .gitmodules file..."
    git rm --cached .gitmodules 2>/dev/null || true
    rm -f .gitmodules
fi

# 빌드 및 배포
echo "Building and deploying..."
npm run deploy

echo "Done!"
