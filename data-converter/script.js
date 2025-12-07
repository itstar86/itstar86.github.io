// 환경 감지 및 링크 설정
document.addEventListener('DOMContentLoaded', () => {
    const bitcoinCalcLink = document.getElementById('bitcoinCalcLink');
    if (bitcoinCalcLink) {
        // 개발 환경: localhost에서 실행 중일 때
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            bitcoinCalcLink.href = 'http://localhost:5173';
        } else {
            // 프로덕션 환경: 루트 경로 사용
            bitcoinCalcLink.href = '/';
        }
    }
});

// 단위 변환 상수 (바이트 기준)
const units = {
    // Decimal units (base 1000)
    'B': 1,
    'KB': 1000,
    'MB': 1000000,
    'GB': 1000000000,
    'TB': 1000000000000,
    'PB': 1000000000000000,
    // Binary units (base 1024)
    'KiB': 1024,
    'MiB': 1024 * 1024,
    'GiB': 1024 * 1024 * 1024,
    'TiB': 1024 * 1024 * 1024 * 1024,
    'PiB': 1024 * 1024 * 1024 * 1024 * 1024
};

// 단위 이름 매핑 (영어)
const unitNames = {
    'B': 'Bytes',
    'KB': 'Kilobytes',
    'MB': 'Megabytes',
    'GB': 'Gigabytes',
    'TB': 'Terabytes',
    'PB': 'Petabytes',
    'KiB': 'Kibibytes',
    'MiB': 'Mebibytes',
    'GiB': 'Gibibytes',
    'TiB': 'Tebibytes',
    'PiB': 'Pebibytes'
};

// 단위 한글 이름 매핑
const unitNamesKR = {
    'B': '바이트',
    'KB': '킬로바이트',
    'MB': '메가바이트',
    'GB': '기가바이트',
    'TB': '테라바이트',
    'PB': '페타바이트',
    'KiB': '키비바이트',
    'MiB': '메비바이트',
    'GiB': '기비바이트',
    'TiB': '테비바이트',
    'PiB': '페비바이트'
};

// 단위 표시 형식 (영어 + 한글)
function formatUnitName(unit) {
    return `${unitNames[unit]} (${unitNamesKR[unit]})`;
}

// 사이드바 토글
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');
const closeBtn = document.getElementById('closeBtn');

menuToggle.addEventListener('click', () => {
    sidebar.classList.add('open');
});

closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('open');
});

// 사이드바 외부 클릭 시 닫기
document.addEventListener('click', (e) => {
    if (sidebar.classList.contains('open') && 
        !sidebar.contains(e.target) && 
        !menuToggle.contains(e.target)) {
        sidebar.classList.remove('open');
    }
});

// 단위 변환 함수
function convert(value, fromUnit, toUnit) {
    if (!value || isNaN(value) || value < 0) {
        return null;
    }
    
    // 바이트로 변환
    const bytes = value * units[fromUnit];
    
    // 목표 단위로 변환
    const result = bytes / units[toUnit];
    
    return result;
}

// 숫자 포맷팅 함수
function formatNumber(num) {
    if (num === null || isNaN(num)) {
        return '___';
    }
    
    if (num === 0) {
        return '0';
    }
    
    // 매우 큰 수나 작은 수는 과학적 표기법 사용
    if (num >= 1e15 || (num < 1e-3 && num > 0)) {
        return num.toExponential(3);
    }
    
    // 소수점 이하 자릿수 결정
    if (num >= 1000) {
        return num.toLocaleString('ko-KR', { maximumFractionDigits: 2 });
    } else if (num >= 1) {
        return num.toLocaleString('ko-KR', { maximumFractionDigits: 4 });
    } else {
        return num.toLocaleString('ko-KR', { maximumFractionDigits: 6 });
    }
}

// Decimal 단위를 Binary 단위로 매핑
const decimalToBinary = {
    'B': 'B',
    'KB': 'KiB',
    'MB': 'MiB',
    'GB': 'GiB',
    'TB': 'TiB',
    'PB': 'PiB'
};

// 결과 업데이트
function updateResults() {
    const value = parseFloat(document.getElementById('valueInput').value);
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;
    
    if (!value || isNaN(value) || value < 0) {
        // 첫 번째 줄: Decimal 기준
        document.getElementById('result1').textContent = '___';
        document.getElementById('resultUnit1').textContent = formatUnitName(fromUnit);
        document.getElementById('result2').textContent = '___';
        document.getElementById('resultUnit2').textContent = formatUnitName(toUnit);
        // 두 번째 줄: Binary 기준
        const fromBinary = decimalToBinary[fromUnit];
        const toBinary = decimalToBinary[toUnit];
        document.getElementById('result3').textContent = '___';
        document.getElementById('resultUnit3').textContent = formatUnitName(fromBinary);
        document.getElementById('result4').textContent = '___';
        document.getElementById('resultUnit4').textContent = formatUnitName(toBinary);
        return;
    }
    
    // 첫 번째 줄: Decimal 기준 변환 (From → To)
    const bytesDecimal = value * units[fromUnit]; // Decimal 기준으로 바이트 변환
    const decimalResult = bytesDecimal / units[toUnit];
    document.getElementById('result1').textContent = formatNumber(value);
    document.getElementById('resultUnit1').textContent = formatUnitName(fromUnit);
    document.getElementById('result2').textContent = formatNumber(decimalResult);
    document.getElementById('resultUnit2').textContent = formatUnitName(toUnit);
    
    // 두 번째 줄: Binary 기준 변환 (From → To)
    const fromBinary = decimalToBinary[fromUnit];
    const toBinary = decimalToBinary[toUnit];
    const bytesBinary = value * units[fromBinary]; // Binary 기준으로 바이트 변환
    const binaryResult = bytesBinary / units[toBinary];
    document.getElementById('result3').textContent = formatNumber(value);
    document.getElementById('resultUnit3').textContent = formatUnitName(fromBinary);
    document.getElementById('result4').textContent = formatNumber(binaryResult);
    document.getElementById('resultUnit4').textContent = formatUnitName(toBinary);
}

// 단위 교환
document.getElementById('swapBtn').addEventListener('click', () => {
    const fromUnit = document.getElementById('fromUnit');
    const toUnit = document.getElementById('toUnit');
    const temp = fromUnit.value;
    fromUnit.value = toUnit.value;
    toUnit.value = temp;
    updateResults();
});

// 변환 버튼 클릭
document.getElementById('convertBtn').addEventListener('click', () => {
    updateResults();
});

// 입력 필드에서 Enter 키
document.getElementById('valueInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        updateResults();
    }
});

// 단위 변경 시 자동 업데이트
document.getElementById('fromUnit').addEventListener('change', updateResults);
document.getElementById('toUnit').addEventListener('change', updateResults);

// 초기 결과 표시
updateResults();
