const loginButton = document.querySelector(".login_btn");
const authPanel = document.querySelector("#auth_panel");
const authCloseButton = document.querySelector(".auth_close");
const loginEmail = document.querySelector("#login_email");
const loginForm = document.querySelector("#login_form");

function setAuthOpen(open) {
    if(open) {
        if(authPanel.open) return;

        setSearchOpen(false);

        authPanel.showModal();
        loginButton.setAttribute("aria-expanded", "true");
        loginEmail.focus();
    } else {
        authPanel.close();
    }
}

loginButton.addEventListener("click", () => {
    setAuthOpen(true);
});

authCloseButton.addEventListener("click", () => {
    setAuthOpen(false);
})

authPanel.addEventListener("close", () => {
    loginButton.setAttribute("aria-expanded", "false");
    loginButton.focus();
});

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
})