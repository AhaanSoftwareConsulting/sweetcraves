  const menuBtn = document.getElementById("menuBtn");
  const offCanvas = document.getElementById("offCanvas");
  const overlay = document.getElementById("overlay");
  const closeMenu = document.getElementById("closeMenu");

  function openMenu() {
    offCanvas.classList.remove("translate-x-full");
    overlay.classList.remove("opacity-0", "invisible");
    document.body.classList.add("overflow-hidden");
  }

  function closeMenuFunc() {
    offCanvas.classList.add("translate-x-full");
    overlay.classList.add("opacity-0", "invisible");
    document.body.classList.remove("overflow-hidden");
  }

  menuBtn.addEventListener("click", openMenu);
  closeMenu.addEventListener("click", closeMenuFunc);
  overlay.addEventListener("click", closeMenuFunc);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenuFunc();
  });
