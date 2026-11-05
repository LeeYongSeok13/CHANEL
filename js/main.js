const intro = document.querySelector("#intro");
const enterBtn = document.querySelector(".enter_btn");

const introShown = sessionStorage.getItem("introShown");

if (intro && enterBtn) {
  // Enter 버튼을 누르면 방문 기록을 저장하고 인트로를 숨김
  enterBtn.addEventListener("click", () => {
    sessionStorage.setItem("introShown", "true");

    intro.classList.add("hide");

    // 인트로가 화면에서 사라진 뒤 슬라이더 시작
    intro.addEventListener("transitionend", function onIntroHidden(event) {
      if (event.propertyName !== "transform") return;

      intro.removeEventListener("transitionend", onIntroHidden);
      intro.style.display = "none";
      
      startSlider();
    });
  }, { once: true}
);

  // 이 세션에서 이미 인트로를 봤다면 바로 슬라이더 시작
  if (introShown === "true") {
    intro.style.display = "none";
    startSlider();
  }
}