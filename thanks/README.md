# 감사장 웹페이지

GitHub Pages를 활용한 감사장 웹페이지입니다.
배포 경로: `https://itstar86.github.io/thanks`

## 배포 방법

### 1. 기존 리포지토리에 배포 (권장)

`itstar86.github.io` 리포지토리가 이미 존재하는 경우:

1. `itstar86.github.io` 리포지토리를 클론합니다:
```bash
git clone https://github.com/itstar86/itstar86.github.io.git
cd itstar86.github.io
```

2. 이 폴더의 모든 파일을 `thanks` 폴더에 복사합니다:
```bash
# 현재 thanks 폴더에서
cp -r * /path/to/itstar86.github.io/thanks/
```

3. 변경사항을 커밋하고 푸시합니다:
```bash
cd /path/to/itstar86.github.io
git add thanks/
git commit -m "Add thanks page"
git push origin main
```

4. 몇 분 후 다음 주소로 접속할 수 있습니다:
   - `https://itstar86.github.io/thanks`

### 2. 새 리포지토리로 배포

1. GitHub에 `thanks`라는 이름의 새 리포지토리를 생성합니다.
2. 이 폴더의 모든 파일을 리포지토리에 업로드합니다.
3. GitHub Pages 설정:
   - Settings > Pages로 이동
   - Source를 "Deploy from a branch"로 선택
   - Branch를 "main"으로 선택하고 "/ (root)" 선택
   - Save 클릭
4. 접속 주소: `https://itstar86.github.io/thanks`

## 파일 구조

```
thanks/
├── index.html      # 메인 HTML 파일
├── style.css       # 스타일시트
├── script.js       # JavaScript 파일
└── README.md       # 이 파일
```

## 커스터마이징

- **메시지 수정**: `index.html`의 `.message` 부분을 수정하세요.
- **디자인 변경**: `style.css`에서 색상, 폰트, 레이아웃을 변경할 수 있습니다.
- **서명 변경**: `index.html`의 `.signature-name` 부분을 수정하세요.

## 라이선스

자유롭게 사용하고 수정하실 수 있습니다.

