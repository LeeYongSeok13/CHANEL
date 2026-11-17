const loginButton = document.querySelector(".login_btn");
const authPanel = document.querySelector("#auth_panel");
const authCloseButton = document.querySelector(".auth_close");
const loginEmail = document.querySelector("#login_email");
const loginForm = document.querySelector("#login_form");
const signupForm = document.querySelector("#signup_form");
const loginView = document.querySelector(".auth_login");
const demoLoginButton = document.querySelector(".auth_demo_btn");
const signupview = document.querySelector(".auth_signup");
const signupButton = document.querySelector(".auth_signup_btn");
const backToLoginButton = document.querySelector(".auth_login_btn");
const signupName = document.querySelector("#signup_name");
const signupPassword = document.querySelector("#signup_password");
const signupPasswordConfirm = document.querySelector("#signup_password_confirm");

function validateSignupPassword() {
    const password = signupPassword.value;
    const passwordConfirm = signupPasswordConfirm.value;

    if(passwordConfirm !== "" && password !== passwordConfirm) {
        signupPasswordConfirm.setCustomValidity("비밀번호가 일치하지 않습니다.");
    } else {
        signupPasswordConfirm.setCustomValidity("");
    }
}

function setAuthView(view) {
    const isSignup = view === "signup";

    loginView.hidden = isSignup;
    signupview.hidden = !isSignup;

    if(isSignup) {
        authPanel.setAttribute("aria-labelledby", "signup_title");
        authCloseButton.setAttribute("aria-label", "회원가입 창 닫기");
        signupName.focus();
    } else {
        authPanel.setAttribute("aria-labelledby", "auth_title");
        authCloseButton.setAttribute("aria-label", "로그인 창 닫기");
        loginEmail.focus();
    }

    authPanel.scrollTop = 0;
}

function closeAuthPanel() {
  if(!authPanel.open) return;
  if(authPanel.classList.contains("is_closing")) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if(reduceMotion) {
    authPanel.close();
    return;
  }

  authPanel.classList.add("is_closing");
}

function setAuthOpen(open) {
    if(open) {
        if(authPanel.open) return;

        setSearchOpen(false);

        authPanel.showModal();
        loginButton.setAttribute("aria-expanded", "true");
        setAuthView("login");
    } else {
        closeAuthPanel();
    }
}

loginButton.addEventListener("click", () => {
    setAuthOpen(true);
});

authCloseButton.addEventListener("click", () => {
    setAuthOpen(false);
})

authPanel.addEventListener("close", () => {
    authPanel.classList.remove("is_closing");
    loginButton.setAttribute("aria-expanded", "false");
    loginButton.focus();
});

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
})

let isDemoLoggedIn = false;

demoLoginButton.addEventListener("click", () => {
    isDemoLoggedIn = true;

    loginButton.setAttribute("aria-label", "데모 계정");
    loginButton.classList.add("is_logged_in");

    setAuthOpen(false);
})

signupForm.addEventListener("submit", (event) => {
    event.preventDefault();

    validateSignupPassword();

    if(!signupForm.reportValidity()) return;

    alert("입력값 검사를 통과했습니다. 아직 회원가입 정보는 저장되지 않았습니다.")
})

authPanel.addEventListener("animationend", (event) => {
  if(event.target !== authPanel) return;
  if(event.pseudoElement) return;
  if(event.animationName !== "authSlideOut") return;

  authPanel.close();
});

signupButton.addEventListener("click", () => {
    setAuthView("signup");
});

backToLoginButton.addEventListener("click", () => {
    setAuthView("login");
});

signupPassword.addEventListener("input", () => {
    validateSignupPassword();
});

signupPasswordConfirm.addEventListener("input", () => {
    validateSignupPassword();
})