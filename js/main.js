const intro = document.querySelector("#intro");
const enterBtn = document.querySelector(".enter_btn");

const introShown = sessionStorage.getItem("introShown");

// 인트로 화면에서 "Enter" 버튼 클릭 시 인트로 숨기기
enterBtn.addEventListener("click", () => {
  intro.classList.add("hide");
});

if (introShown === "true") {
  // 이미 봤다면 인트로 숨기기
  intro.style.display = "none";
} else {
  // 처음이라면 방문 기록 저장하기
  sessionStorage.setItem("introShown", "true");
}

// 5초마다 다음 슬라이드로 이동
const track = document.querySelector(".slider_track");
const slides = track.querySelectorAll(".slide");
let slideIndex = 0;

setInterval(() => {
  slideIndex = (slideIndex + 1) % slides.length;
  track.style.transform = `translateX(-${slideIndex * 100}%)`;
}, 5000);
