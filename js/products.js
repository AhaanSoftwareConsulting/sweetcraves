
const products = [
  { id: 1, category: ["favorites", "giftboxes"], title: "Festive Sweet Box", price: "£4.95", image: "./images/pro1.png" },
  { id: 2, category: ["favorites", "desserts"], title: "Red Velvet Delight", price: "£4.95", image: "./images/pro2.png" },
  { id: 3, category: ["favorites", "icecream"], title: "Mango Gelato", price: "£3.50", image: "./images/pro3.png" },
  { id: 4, category: ["favorites", "desserts", "giftboxes"], title: "Dessert Delight Box", price: "£18.99", image: "./images/pro4.png" },
  { id: 5, category: ["favorites", "chocolates"], title: "Almond Crunch Bar", price: "£4.95", image: "./images/pro5.png" },
];

document.addEventListener("DOMContentLoaded", function () {

  const track = document.getElementById("productTrack");
  const hero = document.getElementById("productHero");
  const pagination = document.getElementById("propagination");

  const visibleProducts = products.filter(p =>
    p.category.includes("favorites")
  );

  // ===============================
  // CREATE SLIDES
  // ===============================
  visibleProducts.forEach(product => {

    const slide = document.createElement("div");
    slide.className = "slide flex-shrink-0 flex-shrink-0 w-full md:w-1/2 lg:w-[356px]";
    slide.style.width = "356px";

    slide.innerHTML = `
        <div class="w-[356px] flex flex-col items-start gap-[20px]">

  <!-- Image -->
  <div class="w-full aspect-[356/357] rounded-[20px] overflow-hidden">
    <img src="${product.image}"
         class="w-[356px] h-[357px]">
  </div>

  <div class="mt-5 flex flex-col items-start gap-[20px]">

    <!-- Title -->
    <h3 class="font-kaio 
               font-bold text-[22px] leading-[22px] 
               text-[#001C49]">
     ${product.title}
    </h3>

    <div class="mt-5
                flex justify-between items-center">

      <!-- Price -->
      <span class="font-kaio
                   text-[20px] leading-[20px] 
                   font-bold text-center 
                   text-[#E63946]">
        ${product.price}
      </span>

      <!-- Shopping Bag Button -->
      <button  
                        class="add-to-cart-btn border border-[#E63946] px-[15px] py-[15px] rounded-[5px] flex items-center justify-center  group transition">

                        <!-- Shopping Bag Icon -->
                        <svg width="29" height="25" viewBox="0 0 29 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M25.6343 0H2.61574C1.922 0 1.25668 0.275586 0.766133 0.766133C0.275586 1.25668 0 1.922 0 2.61574V21.4491C0 22.1428 0.275586 22.8081 0.766133 23.2987C1.25668 23.7892 1.922 24.0648 2.61574 24.0648H25.6343C26.328 24.0648 26.9933 23.7892 27.4839 23.2987C27.9744 22.8081 28.25 22.1428 28.25 21.4491V2.61574C28.25 1.922 27.9744 1.25668 27.4839 0.766133C26.9933 0.275586 26.328 0 25.6343 0ZM25.1111 20.9259H3.13889V3.13889H25.1111V20.9259ZM7.32407 6.80092C7.32407 6.38468 7.48942 5.98549 7.78375 5.69116C8.07808 5.39683 8.47727 5.23148 8.89352 5.23148C9.30976 5.23148 9.70895 5.39683 10.0033 5.69116C10.2976 5.98549 10.463 6.38468 10.463 6.80092C10.463 7.77216 10.8488 8.70361 11.5355 9.39038C12.2223 10.0771 13.1538 10.463 14.125 10.463C15.0962 10.463 16.0277 10.0771 16.7144 9.39038C17.4012 8.70361 17.787 7.77216 17.787 6.80092C17.787 6.38468 17.9524 5.98549 18.2467 5.69116C18.541 5.39683 18.9402 5.23148 19.3565 5.23148C19.7727 5.23148 20.1719 5.39683 20.4662 5.69116C20.7606 5.98549 20.9259 6.38468 20.9259 6.80092C20.9259 8.60464 20.2094 10.3345 18.934 11.6099C17.6586 12.8853 15.9287 13.6018 14.125 13.6018C12.3213 13.6018 10.5914 12.8853 9.31602 11.6099C8.0406 10.3345 7.32407 8.60464 7.32407 6.80092Z" fill="#E63946"/>
</svg>


                    </button>

    </div>
  </div>
</div>
    `;

    track.appendChild(slide);
    const btn = slide.querySelector(".add-to-cart-btn");

btn.addEventListener("click", () => {
  addToCart({
    id: product.id,
    title: product.title,
    price: product.price,
    image: product.image
  });
});
  });

  const originalSlides = Array.from(track.children);

  // ===============================
  // CLONE FOR INFINITE LOOP
  // ===============================
  originalSlides.forEach(slide => {
    track.appendChild(slide.cloneNode(true));
    track.insertBefore(slide.cloneNode(true), track.firstChild);
  });

  let slides = Array.from(track.children);
  let index = originalSlides.length;

  let slideWidth = 0;
  let gap = 24;
  let totalSlideWidth = 0;

  // ===============================
  // METRICS
  // ===============================
  function getSlideMetrics() {
    slideWidth = 356;
    totalSlideWidth = slideWidth +12;
  }

  // ===============================
  // POSITION
  // ===============================
  function updatePosition(animated = true) {

    track.style.transition = animated
      ? "transform 0.6s ease"
      : "none";

    track.style.transform =
      `translateX(-${index * totalSlideWidth}px)`;

    updateDots();
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
  // RESET
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

    }, 600);
  }

  // ===============================
  // PAGINATION
  // ===============================
  visibleProducts.forEach((_, i) => {

    const dot = document.createElement("div");
    dot.className = "dot w-[5px] h-[5px] bg-[#1C1C1C26] rounded-full cursor-pointer transition-all";

    dot.addEventListener("click", () => {
      index = originalSlides.length + i;
      updatePosition();
    });

    pagination.appendChild(dot);
  });

  const dots = document.querySelectorAll(".dot");

  function updateDots() {

    let realIndex =
      (index - originalSlides.length) % originalSlides.length;

    if (realIndex < 0) realIndex += originalSlides.length;

    dots.forEach((dot, i) => {
      if (i === realIndex) {
        dot.style.width = "23px";
        dot.style.height = "5px";
        dot.style.backgroundColor = "#1c1c1c";
      } else {
        dot.style.width = "5px";
        dot.style.height = "5px";
        dot.style.backgroundColor = "#1C1C1C26";
      }
    });
  }

  // ===============================
  // AUTOPLAY
  // ===============================
  let autoSlide = setInterval(next, 3000);

  hero.addEventListener("mouseenter", () => clearInterval(autoSlide));
  hero.addEventListener("mouseleave", () => {
    autoSlide = setInterval(next, 3000);
  });

  // ===============================
  // NAV
  // ===============================
  document.getElementById("pronext").addEventListener("click", next);
  document.getElementById("proprev").addEventListener("click", prev);

  // ===============================
  // INIT
  // ===============================
  getSlideMetrics();
  updatePosition(false);

});



