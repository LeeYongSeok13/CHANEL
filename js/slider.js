const slides = document.querySelectorAll(".slider .slide");
let slideIndex = 0;

function showSlide() {
  slides.forEach((slide, i) => {
    const active = i === slideIndex;
    slide.classList.toggle("is_active", active);
    slide.inert = !active;
    slide.setAttribute("aria-hidden", String(!active));
  });
}

function nextSlide() {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide();
  // 페이드 1.2초 + 사진 표시 5초
  setTimeout(nextSlide, 6200);
}

function startSlider() {
  if (slides.length > 1) setTimeout(nextSlide, 5000);
}

showSlide();
