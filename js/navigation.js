$(function () {
  const mobile = window.matchMedia("(max-width: 768px)");
  const $buttons = $(".mobile_submenu_toggle, .submenu_group h2 > button");
  const $panels = $("#fashion_submenu, .submenu_group > ul");

  // 버튼의 aria-controls에 적힌 ID로 연결된 목록 찾기
  function getPanel($button) {
    return $("#" + $button.attr("aria-controls"));
  }

  // 열기 / 닫기 공통 처리
  function togglePanel($button, open) {
    const $panel = getPanel($button);
    const speed = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 300;

    $button.attr("aria-expanded", String(open));
    $panel.stop(true, false);

    if (open) {
      if ($panel.prop("hidden")) $panel.prop("hidden", false).hide();
      $panel.slideDown(speed);
    } else {
      $panel.slideUp(speed, function () {
        $(this).prop("hidden", true);
      });
    }
  }

  // 탭하면 열고, 다시 탭하면 닫기
  $buttons.on("click", function () {
    if (!mobile.matches) return;

    const $button = $(this);
    const open = $button.attr("aria-expanded") !== "true";

    // 다른 분류의 상품 목록은 닫기
    $button.closest(".submenu_group").siblings(".submenu_group")
      .find("h2 > button").each(function () {
        if ($(this).attr("aria-expanded") === "true") togglePanel($(this), false);
      });

    togglePanel($button, open);
  });

  // 메뉴를 닫거나 화면 크기가 바뀌면 처음 상태로 복원
  function resetMenus() {
    $panels.stop(true, true).removeAttr("style").prop("hidden", mobile.matches);
    $buttons.attr("aria-expanded", "false");
    if (!mobile.matches) $(".submenu_group h2 > button").attr("aria-expanded", "true");
  }

  $("#nav_menu_toggle")
    .attr("aria-controls", "main_navigation")
    .on("change", function () {
      if (!this.checked) resetMenus();
    });

  $(document).on("keydown", function (event) {
    if (event.key === "Escape" && mobile.matches) {
      $("#nav_menu_toggle").prop("checked", false).trigger("change").trigger("focus");
    }
  });

  mobile.addEventListener("change", resetMenus);
  resetMenus();
});

