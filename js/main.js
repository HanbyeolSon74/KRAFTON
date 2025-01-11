// 스크롤 이벤트 처리 (이미지 크기 조정)
window.addEventListener("scroll", () => {
    const image = document.getElementById("dynamic-image");
    const playIcon = document.querySelector(".SingleGameTempFullPhoto-icon"); // 동영상 실행 아이콘
    const scrollPosition = window.scrollY; // 현재 스크롤 위치
    const startPoint = 100; // 이미지 크기 조정 시작점 (px)
    const fullScreenPoint = 800; // 이미지가 전체화면이 되는 지점 (스크롤 위치 기준)
    const maxWidth = 100; // 이미지 최대 너비 (vw 단위)
    const minWidth = 50; // 이미지 최소 너비 (vw 단위)

    // 스크롤이 startPoint 이후로 내릴 때마다 이미지 크기 증가
    if (scrollPosition >= startPoint && scrollPosition <= fullScreenPoint) {
        const progress = (scrollPosition - startPoint) / (fullScreenPoint - startPoint); // 0에서 1 사이로 변화
        const newWidth = minWidth + progress * (maxWidth - minWidth); // 변화 속도 조정
        image.style.width = `${newWidth}vw`; // 새로운 크기 적용
    } 
    // fullScreenPoint 이상에서는 전체화면 고정
    else if (scrollPosition > fullScreenPoint) {
        image.style.width = `${maxWidth}vw`; // 전체화면
        playIcon.style.display = "block"; // 이미지가 전체화면일 때 아이콘 보이기
    } 
    // startPoint 이전에서는 초기 크기로 유지
    else {
        image.style.width = `${minWidth}vw`;
        playIcon.style.display = "none"; // 이미지가 최소 크기일 때 아이콘 숨기기
    }
});

// 이미지 클릭 시 동영상이 나타나고 재생되도록 처리
const image = document.getElementById("dynamic-image");
const video = document.getElementById("video");
const playIcon = document.querySelector(".SingleGameTempFullPhoto-icon"); // 동영상 실행 아이콘

// 이미지 클릭 시 동영상이 나타나고 재생되도록 처리
image.addEventListener("click", () => {
    // 이미지 숨기기
    image.style.display = "none";
    
    // 동영상 보이기
    video.style.display = "block";

    // 동영상 크기와 위치를 이미지와 동일하게 설정
    const imageRect = image.getBoundingClientRect(); // 이미지의 위치와 크기 정보
    video.style.position = "absolute";
    video.style.top = `${imageRect.top}px`; // 이미지의 top 위치로 설정
    video.style.left = `${imageRect.left}px`; // 이미지의 left 위치로 설정
    video.style.width = `${imageRect.width}px`; // 이미지의 width로 설정
    video.style.height = `${imageRect.height}px`; // 이미지의 height로 설정
    
    // 동영상 소스가 올바른지 확인
    video.load(); // 동영상을 다시 로드
    video.play(); // 동영상 재생
});

// 동영상 실행 아이콘 클릭 시 동영상이 나타나도록 처리
playIcon.addEventListener("click", () => {
    // 이미지 숨기기
    image.style.display = "none";
    
    // 동영상 보이기
    video.style.display = "block";

    // 동영상 크기와 위치를 이미지와 동일하게 설정
    const imageRect = image.getBoundingClientRect(); // 이미지의 위치와 크기 정보
    video.style.position = "absolute";
    video.style.top = `${imageRect.top}px`; // 이미지의 top 위치로 설정
    video.style.left = `${imageRect.left}px`; // 이미지의 left 위치로 설정
    video.style.width = `${imageRect.width}px`; // 이미지의 width로 설정
    video.style.height = `${imageRect.height}px`; // 이미지의 height로 설정
    
    // 동영상 소스가 올바른지 확인
    video.load(); // 동영상을 다시 로드
    video.play(); // 동영상 재생
});

// 동영상이 종료되면 다시 이미지로 돌아가도록 설정 (옵션)
video.addEventListener("ended", () => {
    // 동영상 숨기기
    video.style.display = "none";
    
    // 이미지 보이기
    image.style.display = "block";
    
    // 이미지 크기를 원래 크기로 되돌리기 (스크롤 상태에 따라 적용)
    image.style.width = "50vw"; // 초기 크기 예시
    
    // 동영상 실행 아이콘 숨기기
    playIcon.style.display = "none";
});

// 3개의 이미지 스크롤 시 효과
document.addEventListener('DOMContentLoaded', () => {
    const img = document.getElementById('ScrollLeftimg');
    const tumbContainer = document.querySelector('.SingleGameTempLeftTumb');
    let isTumbVisible = false;

    // Intersection Observer 설정
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                isTumbVisible = true; // 요소가 화면에 보임
            } else {
                isTumbVisible = false; // 요소가 화면에서 벗어남
            }
        });
    });

    // 타겟 요소 감시 시작
    observer.observe(tumbContainer);

    // 스크롤 이벤트 핸들링
    document.addEventListener('scroll', () => {
        if (isTumbVisible) {
            const scrollY = window.scrollY;
            const containerTop = tumbContainer.getBoundingClientRect().top + window.scrollY;
            const translateY = Math.max(0, scrollY - containerTop); // 이미지 이동 계산
            img.style.transform = `translateY(${translateY}px)`;
        }
    });
});

// 게임 하단 숫자
document.addEventListener("DOMContentLoaded", function () {
    let counterElement = document.getElementById("counter");
    let hasCounted = false;

    function animateCounter(start, end, duration) {
        let startTime = null;

        function updateCounter(currentTime) {
            if (!startTime) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentNumber = Math.floor(progress * (end - start) + start);
            counterElement.textContent = currentNumber.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }

        requestAnimationFrame(updateCounter);
    }

    function handleScroll() {
        const rect = counterElement.getBoundingClientRect();
        if (rect.top < window.innerHeight && !hasCounted) {
            hasCounted = true;
            animateCounter(0, 55000000, 2000); // 2초 동안 애니메이션
        }
    }

    window.addEventListener("scroll", handleScroll);
});
