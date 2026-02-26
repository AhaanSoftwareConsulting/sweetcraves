const section = document.getElementById("stackSection");
const cards = document.querySelectorAll(".stackcard");

window.addEventListener("scroll", () => {

  const rect = section.getBoundingClientRect();

  // total scrollable height inside section
  const totalScroll = section.offsetHeight - window.innerHeight;

  // how much we have scrolled inside section
  const scrollInside = Math.min(
    Math.max(-rect.top, 0),
    totalScroll
  );

  const progress = scrollInside / totalScroll; // 0 → 1

  const step = 1 / cards.length;

  cards.forEach((card, index) => {

    // First card always fixed (no movement)
    if (index === 0) {
      card.style.transform = "translateY(0%)";
      card.style.zIndex = 1;
      return;
    }

    const start = index * step;
    const end = start + step;

    let translate = 100;

    if (progress >= start && progress <= end) {
      const localProgress = (progress - start) / step;
      translate = 100 - localProgress * 100;
    }

    if (progress > end) {
      translate = 0;
    }

    if (progress < start) {
      translate = 100;
    }

    card.style.transform = `translateY(${translate}%)`;
    card.style.zIndex = index + 1;
  });

});
