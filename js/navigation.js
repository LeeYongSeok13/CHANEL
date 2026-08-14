const intro = document.querySelector("#intro");
const enterBtn = document.querySelector(".enter_btn");

enterBtn.addEventListener("click", () => {
  intro.classList.add("hide");
});
