const searchButton = document.querySelector(".search_btn");
const searchPanel = document.querySelector("#search_panel");
const searchCloseButton = document.querySelector(".search_close");
const searchInput = document.querySelector("#site_search");

function setSearchOpen(open) {
  // 패널을 숨기기 전에 포커스를 검색 버튼으로 이동
  if(!open && searchPanel.contains(document.activeElement)) {
    searchButton.focus();
  }

  searchButton.setAttribute("aria-expanded", String(open));

  searchPanel.inert = !open;
  searchPanel.setAttribute("aria-hidden", String(!open));
  searchPanel.classList.toggle("is_open", open);

  // inert를 해제하고 패널을 표시한 뒤 입력창으로 이동
  if(open) {
    searchInput.focus();
  }
}

searchButton.addEventListener("click", () => {
  const isOpen = searchButton.getAttribute("aria-expanded") === "true";

  setSearchOpen(!isOpen);
});

searchCloseButton.addEventListener("click", () => {
  searchButton.focus();
  setSearchOpen(false);
});

document.addEventListener("keydown", (event) => {
  if(event.key !== "Escape") return;

  const isOpen = searchButton.getAttribute("aria-expanded") === "true";
  if(!isOpen) return;

  setSearchOpen(false);
})