// 상단바
let lastScrollTop = 0; // 마지막 스크롤 위치
const header = document.querySelector('.Header-container'); // 상단바 요소

window.addEventListener('scroll', function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    // 스크롤 방향에 따라 상단바의 표시 여부를 결정
    if (currentScroll > lastScrollTop) {
        // 스크롤을 내릴 때 상단바 숨기기
        header.style.top = '-100px'; // 상단바가 사라지게 설정
    } else {
        // 스크롤을 올릴 때 상단바 보이기
        header.style.top = '0'; // 상단바가 다시 보이게 설정
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // 마지막 스크롤 위치 업데이트
});

// 메뉴 토글 함수
const menuToggle = document.querySelector('.MenuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileToggle = document.querySelector('.mobileToggle');

// 햄버거 메뉴 클릭 시 메뉴 토글
menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open'); // 메뉴 열기 / 닫기
});

// 모바일 메뉴 내에서 햄버거 버튼 클릭 시 메뉴 토글
mobileToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open'); // 메뉴 열기 / 닫기
});


// 동영상, 이미지
const imageContainer = document.getElementById("image-container");
const videoContainer = document.getElementById("video-container");
const dynamicImage = document.getElementById("dynamic-image");
const playIcon = document.querySelector(".SingleGameTempFullPhoto-icon");
const iframe = document.getElementById("video-iframe");

// 스크롤 이벤트 처리
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const startPoint = 100; // 확대 시작 지점
  const fullScreenPoint = 800; // 전체화면 전환 지점
  const maxScale = 1; // 최대 크기
  const minScale = 0.5; // 최소 크기

  if (scrollY >= startPoint && scrollY <= fullScreenPoint) {
    const progress = (scrollY - startPoint) / (fullScreenPoint - startPoint);
    const newScale = minScale + progress * (maxScale - minScale);
    imageContainer.style.transform = `translate(-50%, -50%) scale(${newScale})`;
    videoContainer.style.transform = `translate(-50%, -50%) scale(${newScale})`;
    playIcon.style.opacity = 0;
  } else if (scrollY > fullScreenPoint) {
    imageContainer.style.transform = `translate(-50%, -50%) scale(${maxScale})`;
    videoContainer.style.transform = `translate(-50%, -50%) scale(${maxScale})`;
    playIcon.style.opacity = 1;
  } else {
    imageContainer.style.transform = `translate(-50%, -50%) scale(${minScale})`;
    videoContainer.style.transform = `translate(-50%, -50%) scale(${minScale})`;
    playIcon.style.opacity = 0;
  }
});

// 이미지 클릭 시 전체화면 전환
dynamicImage.addEventListener("click", () => {
  imageContainer.classList.add("fullscreen");
  playIcon.style.opacity = 1;
});

// 동영상 재생 버튼 클릭 시 동작
playIcon.addEventListener("click", () => {
  imageContainer.classList.add("hidden");
  playIcon.classList.add("hidden");
  videoContainer.classList.add("active");
  iframe.src = iframe.src.split("?")[0] + "?autoplay=1&mute=1&rel=0";
});

// 동영상 종료 시 초기 상태 복원
iframe.addEventListener("ended", () => {
  videoContainer.classList.remove("active");
  imageContainer.classList.remove("hidden");
  playIcon.classList.remove("hidden");
});



// 3개의 이미지
document.addEventListener("scroll", function () {
    const applyScrollEffect = (tumbSelector, imageSelector, reverse = false) => {
      const tumb = document.querySelector(tumbSelector); // 이미지 고정 영역
      const image = document.querySelector(imageSelector); // 움직이는 이미지
  
      if (!tumb || !image) return;
  
      const tumbRect = tumb.getBoundingClientRect(); // 고정 영역의 위치 정보 가져옴
      const windowHeight = window.innerHeight; // 브라우저 창 높이
      const imageHeight = image.offsetHeight; // 이미지 실제 높이
      const tumbHeight = tumb.offsetHeight; // 고정 영역의 높이
  
      // 고정 영역이 화면에 조금이라도 보이면 이미지 움직이기 시작
      if (tumbRect.top < windowHeight && tumbRect.bottom > 0) {
        const scrollableHeight = imageHeight - tumbHeight; // 스크롤 가능한 이미지 높이 계산
        const visibleRatio = Math.min(Math.max((windowHeight - tumbRect.top) / tumbHeight, 0), 1); // 스크롤 비율 (0~1 사이)
  
        const moveDistance = scrollableHeight * visibleRatio * (reverse ? 1 : -1); // 이동 거리 계산 (reverse로 방향 설정)
        image.style.transform = `translateY(${moveDistance}px)`; // 스크롤에 따른 이미지 이동
      }
    };
  
    // 왼쪽 이미지들에 적용 (스크롤 방향과 동일하게 움직임)
    applyScrollEffect(".SingleGameTempLeftTumb", "#ScrollLeftimg");
    applyScrollEffect(".SingleGameTempLeftTumb2", "#ScrollLeftimg2");
  
    // 오른쪽 이미지들에 적용 (스크롤 방향과 반대로 움직임)
    applyScrollEffect(".SingleGameTempRightTumb", "#ScrollRightimg", true);
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


 // 최상위로 이동 버튼
 const scrollToTopBtn = document.getElementById('scrollToTopBtn');
 const scrollToTopIcon = document.getElementById('scrollToTopIcon'); // 이미지 아이디 가져오기

 // 스크롤 이벤트 리스너
 window.addEventListener('scroll', () => {
     if (document.documentElement.scrollTop > 300) {
         // 버튼이 보이도록 설정
         scrollToTopBtn.style.display = 'flex';
     } else {
         // 버튼이 숨겨지도록 설정
         scrollToTopBtn.style.display = 'none';
     }
 });

 // 버튼 클릭 시 맨 위로 스크롤
 scrollToTopBtn.addEventListener('click', () => {
     window.scrollTo({
         top: 0,
         behavior: 'smooth'
     });
 });

 // 호버 시 이미지 변경
 scrollToTopBtn.addEventListener('mouseenter', () => {
     scrollToTopIcon.src = '/img/ico-top-arrow.png'; // 호버 시 이미지 변경
 });

 scrollToTopBtn.addEventListener('mouseleave', () => {
     scrollToTopIcon.src = '/img/ico-top-arrow-b.png'; // 호버 해제 시 이미지 원래 상태로 변경
 });

// footer familysite
// FamilySite 클릭 이벤트
function toggleFamilySite() {
    const familySite = document.querySelector('.FamilySite');
    const menuList = document.querySelector('.menu-familymenu-list');

    // FamilySite와 메뉴 리스트 모두에 active 클래스를 토글
    familySite.classList.toggle('active');
    menuList.classList.toggle('active');
}





