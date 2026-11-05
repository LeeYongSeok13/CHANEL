(() => {
  const searchButton = document.querySelector(".search_btn");
  const searchPanel = document.querySelector("#search_panel");
  const searchInput = document.querySelector("#site_search");
  const closeButton = document.querySelector(".search_close");
  const navToggle = document.querySelector("#nav_menu_toggle");

  if (!searchButton || !searchPanel || !searchInput || !closeButton) return;

  function openSearch() {
    // 모바일 메뉴와 검색 패널이 동시에 열리지 않게 함
    if (navToggle?.checked) {
      navToggle.checked = false;
      navToggle.dispatchEvent(new Event("change", { bubbles: true }));
    }

    searchPanel.classList.add("is_open");
    searchPanel.setAttribute("aria-hidden", "false");
    searchPanel.inert = false;
    searchButton.setAttribute("aria-expanded", "true");

    requestAnimationFrame(() => searchInput.focus());
  }

  function closeSearch({ returnFocus = false } = {}) {
    searchPanel.classList.remove("is_open");
    searchPanel.setAttribute("aria-hidden", "true");
    searchPanel.inert = true;
    searchButton.setAttribute("aria-expanded", "false");

    if (returnFocus) searchButton.focus();
  }

  searchButton.addEventListener("click", () => {
    const isOpen = searchPanel.classList.contains("is_open");

    if (isOpen) {
      closeSearch({ returnFocus: true });
    } else {
      openSearch();
    }
  });

  closeButton.addEventListener("click", () => {
    closeSearch({ returnFocus: true });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && searchPanel.classList.contains("is_open")) {
      closeSearch({ returnFocus: true });
    }
  });

  document.addEventListener("click", (event) => {
    if (!searchPanel.classList.contains("is_open")) return;

    const clickedInsidePanel = searchPanel.contains(event.target);
    const clickedSearchButton = searchButton.contains(event.target);

    if (!clickedInsidePanel && !clickedSearchButton) closeSearch();
  });

  navToggle?.addEventListener("change", () => {
    if (navToggle.checked) closeSearch();
  });
})();
