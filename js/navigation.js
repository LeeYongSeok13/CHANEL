const mobileMenus = document.querySelectorAll(".mobile_fashion_menu, .mobile_category_menu");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const resetMenus = new Map();

// 메뉴 버튼이나 바깥 배경으로 내비게이션을 닫으면 펼침 상태 초기화
document.querySelector("#nav_menu_toggle").addEventListener("change", (event) => {
  if (!event.target.checked) {
    resetMenus.forEach((reset) => reset());
  }
});

function closeSubmenus(menu) {
  menu.querySelectorAll(".mobile_category_menu").forEach((submenu) => {
    resetMenus.get(submenu)();
  });
}

mobileMenus.forEach((menu) => {
  const summary = menu.firstElementChild;
  let finishAnimation = null;

  // 상위 메뉴를 접을 때 진행 중인 하위 애니메이션까지 초기화
  resetMenus.set(menu, () => {
    if (finishAnimation) finishAnimation();
    menu.open = false;
  });

  summary.addEventListener("click", (event) => {
    event.preventDefault();

    // 연속 클릭 시 이전 동작을 끝내고 다음 동작 시작
    if (finishAnimation) finishAnimation();

    const isOpening = !menu.open;
    if (reducedMotion.matches) {
      menu.open = isOpening;
      if (!isOpening) closeSubmenus(menu);
      return;
    }

    const startHeight = menu.offsetHeight;
    menu.open = true; // 접을 때도 애니메이션이 끝날 때까지 내용 표시
    const endHeight = isOpening ? menu.offsetHeight : summary.offsetHeight;
    menu.style.overflow = "hidden";

    const animation = menu.animate(
      [{ height: `${startHeight}px` }, { height: `${endHeight}px` }],
      { duration: 300, easing: "ease-in-out" }
    );

    finishAnimation = () => {
      animation.onfinish = null;
      animation.cancel();
      menu.open = isOpening;
      menu.style.overflow = "";
      finishAnimation = null;
      if (!isOpening) closeSubmenus(menu);
    };
    animation.onfinish = finishAnimation;
  });

  // 하위 분류를 누르면 상위 메뉴의 높이 제한부터 해제
  menu.addEventListener("click", (event) => {
    if (!summary.contains(event.target) && finishAnimation) finishAnimation();
  }, true);
});
