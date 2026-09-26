const intro = document.querySelector("#intro");
const enterBtn = document.querySelector(".enter_btn");

const introShown = sessionStorage.getItem("introShown");

// 인트로 화면에서 "Enter" 버튼 클릭 시 인트로 숨기기
enterBtn.addEventListener("click", () => {
  // 처음이라면 방문 기록 저장하기
  sessionStorage.setItem("introShown", "true");
  intro.classList.add("hide");
  // 인트로가 완전히 사라지면 슬라이드 시작
  intro.addEventListener("transitionend", function onIntroHidden(event) {
    if (event.target !== intro || event.propertyName !== "transform") return;
    intro.removeEventListener("transitionend", onIntroHidden);
    startSlider();
  });
}, { once: true });

if (introShown === "true") {
  // 이미 봤다면 인트로 숨기기
  intro.style.display = "none";
  startSlider();
}
