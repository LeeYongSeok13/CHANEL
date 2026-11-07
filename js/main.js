const intro = document.querySelector("#intro");
const enterBtn = document.querySelector(".enter_btn");

let introShown = false;

try {
  introShown = sessionStorage.getItem("introShown") === "true";
} catch (error) {
  console.warn("방문 기록을 읽지 못해 인트로를 표시합니다.", error);
}

if(intro && enterBtn) {
  if (introShown) {
  intro.style.display = "none";
  startSlider();
  } else {
    enterBtn.addEventListener("click", () => {
      try {
        sessionStorage.setItem("introShown", "true");
      } catch (error) {
        console.warn("방문 기록을 저장하지 못했습니다.", error);
      }

      intro.addEventListener("transitionend", function onIntroHidden(event) {
        if (event.target !== intro || event.propertyName !== "transform") {
          return;
        }

        intro.removeEventListener("transitionend", onIntroHidden);

        intro.style.display = "none";
        startSlider();
      });

      intro.classList.add("hide");
    }, {once: true});
  }
}