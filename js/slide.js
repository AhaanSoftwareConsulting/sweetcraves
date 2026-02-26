document.addEventListener("DOMContentLoaded", function () {

  const track = document.getElementById("track");
  const hero = document.getElementById("hero");
  const originalSlides = Array.from(track.children);
  const dots = document.querySelectorAll(".dot");
  const title = document.getElementById("slideTitle");

  const names = [
    "Frosted Mint",
    "Strawberry",
    "Choco Vanilla",
    "Strawberry"
  ];

  let slideWidth = 0;
  let gap = 0;
  let totalSlideWidth = 0;

  let slides;
  let index;
  let centerOffset = 0;

  // ===============================
  // CLONE FOR INFINITE LOOP
  // ===============================
  originalSlides.forEach(slide => {
    track.appendChild(slide.cloneNode(true));
    track.insertBefore(slide.cloneNode(true), track.firstChild);
  });

  slides = Array.from(track.children);
  index = originalSlides.length;

  // ===============================
  // GET REAL SLIDE SIZE + GAP
  // ===============================
  function getSlideMetrics() {
    const slide = track.querySelector(".slide");
    const style = window.getComputedStyle(track);

    slideWidth = slide.offsetWidth;
    gap = parseFloat(style.columnGap || style.gap || 0);

    totalSlideWidth = slideWidth + gap;
  }

  // ===============================
  // UPDATE ACTIVE UI
  // ===============================
  function updateActiveUI() {

    slides.forEach(slide => slide.classList.remove("active"));
    slides[index].classList.add("active");

    let realIndex =
      (index - originalSlides.length) % originalSlides.length;

    if (realIndex < 0) {
      realIndex += originalSlides.length;
    }

    // Update title
    title.textContent = names[realIndex];

    // Update dots
    dots.forEach((dot, i) => {
      if (i === realIndex) {
        dot.style.backgroundColor = "#1C1C1C";
        dot.style.width = "23px";
        dot.style.height = "5px";
      } else {
        dot.style.backgroundColor = "#1C1C1C26";
        dot.style.width = "5px";
        dot.style.height = "5px";
      }
      dot.style.borderRadius = "9999px";
    });
  }

  // ===============================
  // UPDATE POSITION
  // ===============================
  function updatePosition(animated = true) {

    track.style.transition = animated
      ? "transform 0.5s ease"
      : "none";

    track.style.transform = `translateX(${
      centerOffset - index * totalSlideWidth
    }px)`;

    updateActiveUI();
  }

  // ===============================
  // RESPONSIVE LAYOUT
  // ===============================
  function calculateLayout() {

    getSlideMetrics();

    const heroWidth = hero.offsetWidth;

    // Perfect dynamic center
    centerOffset = heroWidth / 2 - slideWidth / 2;

    updatePosition(false);
  }

  // ===============================
  // NEXT / PREV
  // ===============================
  function next() {
    index++;
    updatePosition();
    resetIfNeeded();
  }

  function prev() {
    index--;
    updatePosition();
    resetIfNeeded();
  }

  // ===============================
  // INFINITE RESET
  // ===============================
  function resetIfNeeded() {
    setTimeout(() => {

      if (index >= slides.length - originalSlides.length) {
        index = originalSlides.length;
        updatePosition(false);
      }

      if (index < originalSlides.length) {
        index = slides.length - originalSlides.length * 2;
        updatePosition(false);
      }

    }, 500);
  }

  // ===============================
  // NAV BUTTONS
  // ===============================
  document.getElementById("next")?.addEventListener("click", next);
  document.getElementById("prev")?.addEventListener("click", prev);

  // ===============================
  // DOT CLICK
  // ===============================
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      index = originalSlides.length + i;
      updatePosition();
    });
  });

  // ===============================
  // AUTOPLAY
  // ===============================
  let autoSlide = setInterval(next, 3500);

  hero.addEventListener("mouseenter", () => clearInterval(autoSlide));
  hero.addEventListener("mouseleave", () => {
    autoSlide = setInterval(next, 3500);
  });

  // ===============================
  // INIT
  // ===============================
  calculateLayout();
  window.addEventListener("resize", calculateLayout);

});