// 현재 날짜를 한국어 형식으로 표시
function setCurrentDate() {
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        
        dateElement.textContent = `${year}년 ${month}월 ${day}일`;
    }
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function() {
    setCurrentDate();
});

