const menuButton = document.querySelector("#nav_menu_toggle");
const navigation = document.querySelector("#main_navigation");
const overlay = document.querySelector(".nav_overlay");
const submenuButtons = document.querySelectorAll(".mobile_submenu_toggle");
const groupButtons = document.querySelectorAll(".submenu_group h2 > button");

const mobile = window.matchMedia("(max-width: 768px)");

function resetSubmenus() {
  submenuButtons.forEach((button) => {
    const panelId = button.getAttribute("aria-controls");
    const panel = document.getElementById(panelId);

    button.setAttribute("aria-expanded", "false");
    panel.classList.remove("is_open");
    panel.style.removeProperty("height");
    panel.inert = mobile.matches;
  });

  groupButtons.forEach((button) => {
    const panelId = button.getAttribute("aria-controls");
    const panel = document.getElementById(panelId);

    button.setAttribute("aria-expanded", "false");
    panel.classList.remove("is_open");
    panel.style.removeProperty("height");
    panel.inert = mobile.matches;
  })
};

function setMenuOpen(open) {
  menuButton.setAttribute("aria-expanded", String(open));
  navigation.classList.toggle("is_open", open);
  overlay.classList.toggle("is_open", open);

  if(!open) {
    resetSubmenus();
  }
};

menuButton.addEventListener("click", () => {
  navigation.classList.add("is_animated");
  overlay.classList.add("is_animated");

  const isOpen = menuButton.getAttribute("aria-expanded") === "true";

  setMenuOpen(!isOpen);
});

overlay.addEventListener("click", () => {
  setMenuOpen(false);
  menuButton.focus();
});

document.addEventListener("keydown", (event) => {
  if(event.key !== "Escape") return;

  const isOpen = menuButton.getAttribute("aria-expanded") === "true";

  if(!isOpen) return;

  setMenuOpen(false);
  menuButton.focus();
});

mobile.addEventListener("change", () => {
  navigation.classList.remove("is_animated");
  overlay.classList.remove("is_animated");

  setMenuOpen(false);
});

submenuButtons.forEach((button) => {
  const panelId = button.getAttribute("aria-controls");
  const panel = document.getElementById(panelId);

  panel.addEventListener("transitionend", (event) => {
    if(event.target !== panel || event.propertyName !== "height") return;

    if(button.getAttribute("aria-expanded") === "true") {
      panel.style.height = "auto";
    }
  });

  button.addEventListener("click", () => {
    if(!mobile.matches) return;

    const isOpen = button.getAttribute("aria-expanded") === "true";

    button.setAttribute("aria-expanded", String(!isOpen));
    panel.classList.toggle("is_open", !isOpen);
    panel.inert = isOpen;

    if(isOpen) {
      panel.style.height = panel.getBoundingClientRect().height + "px";

      // 현재 숫자 높이를 브라우저에 반영
      panel.offsetHeight;

      panel.style.height = "0px";
    } else {
      panel.style.height = panel.scrollHeight + "px";
    }
  });
});

groupButtons.forEach((button) => {
  const panelId = button.getAttribute("aria-controls");
  const panel = document.getElementById(panelId);

  panel.addEventListener("transitionend", (event) => {
    if(event.target !== panel || event.propertyName !== "height") return;

    if(button.getAttribute("aria-expanded") === "true") {
      panel.style.height = "auto";
    }
  });

  button.addEventListener("click", () => {
    if(!mobile.matches) return;

    const isOpen = button.getAttribute("aria-expanded") === "true";

    button.setAttribute("aria-expanded", String(!isOpen));
    panel.classList.toggle("is_open", !isOpen);
    panel.inert = isOpen;

    if(isOpen) {
      panel.style.height = panel.getBoundingClientRect().height + "px";

      // 현재 숫자 높이를 브라우저에 반영
      panel.offsetHeight;

      panel.style.height = "0px";
    } else {
      panel.style.height = panel.scrollHeight + "px";
    }
  });
});

resetSubmenus();