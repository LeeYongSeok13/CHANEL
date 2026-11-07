const searchButton = document.querySelector(".search_btn");
const searchPanel = document.querySelector("#search_panel");
const searchCloseButton = document.querySelector(".search_close");

function setSearchOpen(open) {
  searchButton.setAttribute("aria-expanded", String(open));

  searchPanel.inert = !open;
  searchPanel.setAttribute("aria-hidden", String(open));
  searchPanel.classList.toggle("is_open", open);
}

searchButton.addEventListener("click", () => {
  const isOpen = searchButton.getAttribute("aria-expanded") === "true";

  setSearchOpen(!isOpen);
});

searchCloseButton.addEventListener("click", () => {
  searchButton.focus();
  setSearchOpen(false);
})