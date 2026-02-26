const products = [
  {id:1, category:["favorites","giftboxes"], name:"Festive Sweet Box", price:"£4.95", img:"./images/pro1.jpg"},
  {id:2, category:["favorites","desserts"], name:"Red Velvet Delight", price:"£4.95", img:"./images/pro2.jpg"},
  {id:3, category:["favorites","icecream"], name:"Mango Gelato", price:"£3.50", img:"./images/pro3.jpg"},
  {id:4, category:["favorites","desserts","giftboxes"], name:"Dessert Delight Box", price:"£18.99", img:"./images/pro4.jpg"},
  {id:5, category:["favorites","chocolates"], name:"Almond Crunch Bar", price:"£4.95", img:"./images/pro5.jpg"},
  {id:6, category:["desserts"], name:"Chocolate Fudge Cake", price:"£6.95", img:"./images/descard.jpg"},
  {id:7, category:["icecream"], name:"Strawberry Scoop", price:"£3.00", img:"./images/icecard.jpg"},
  {id:8, category:["chocolates"], name:"Truffle Box", price:"£9.99", img:"./images/pro4.jpg"}
];

const track = document.getElementById("sliderTrack");
const pagination = document.getElementById("pagination");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;
const cardWidth = 356;
const gap = 10;
const slideWidth = cardWidth + gap;
let autoPlay;

// Create card
function createCard(product) {
  return `
    <div class="flex-shrink-0 w-[356px]">
      <div class="flex flex-col gap-[10px]">
        <div class="rounded-2xl overflow-hidden">
          <img src="${product.img}" 
               class="w-[356px] h-[357px] object-cover rounded-2xl"/>
        </div>

        <!-- Product Name -->
                <h3 class="text-[22px] leading-[22px] font-bold text-[#001C49]">
                   ${product.name}
                </h3>

        <div class="flex items-center justify-between">
          <!-- Price -->
                    <span class="text-[20px] leading-[20px] font-bold text-[#E63946]">
                        ${product.price}
                    </span>

          <!-- Cart Button -->
                    <button
                        class="w-[58px] h-[54px] border border-[#E63946] rounded-[5px] flex items-center justify-center hover:bg-[#E63946] group transition">

                        <!-- Shopping Bag Icon -->
                        <svg width="29" height="25" viewBox="0 0 29 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M25.6343 0H2.61574C1.922 0 1.25668 0.275586 0.766133 0.766133C0.275586 1.25668 0 1.922 0 2.61574V21.4491C0 22.1428 0.275586 22.8081 0.766133 23.2987C1.25668 23.7892 1.922 24.0648 2.61574 24.0648H25.6343C26.328 24.0648 26.9933 23.7892 27.4839 23.2987C27.9744 22.8081 28.25 22.1428 28.25 21.4491V2.61574C28.25 1.922 27.9744 1.25668 27.4839 0.766133C26.9933 0.275586 26.328 0 25.6343 0ZM25.1111 20.9259H3.13889V3.13889H25.1111V20.9259ZM7.32407 6.80092C7.32407 6.38468 7.48942 5.98549 7.78375 5.69116C8.07808 5.39683 8.47727 5.23148 8.89352 5.23148C9.30976 5.23148 9.70895 5.39683 10.0033 5.69116C10.2976 5.98549 10.463 6.38468 10.463 6.80092C10.463 7.77216 10.8488 8.70361 11.5355 9.39038C12.2223 10.0771 13.1538 10.463 14.125 10.463C15.0962 10.463 16.0277 10.0771 16.7144 9.39038C17.4012 8.70361 17.787 7.77216 17.787 6.80092C17.787 6.38468 17.9524 5.98549 18.2467 5.69116C18.541 5.39683 18.9402 5.23148 19.3565 5.23148C19.7727 5.23148 20.1719 5.39683 20.4662 5.69116C20.7606 5.98549 20.9259 6.38468 20.9259 6.80092C20.9259 8.60464 20.2094 10.3345 18.934 11.6099C17.6586 12.8853 15.9287 13.6018 14.125 13.6018C12.3213 13.6018 10.5914 12.8853 9.31602 11.6099C8.0406 10.3345 7.32407 8.60464 7.32407 6.80092Z" fill="#E63946"/>
</svg>


                    </button>
        </div>
      </div>
    </div>
  `;

}

// Create pagination
function createPagination() {
  pagination.innerHTML = products.map((_, index) => `
    <div data-index="${index}"
      class="pagination-dot cursor-pointer bg-black/40 rounded-full transition-all duration-300 w-1 h-1">
    </div>
  `).join("");
}

// Update pagination active style
function updatePagination() {
  const dots = document.querySelectorAll(".pagination-dot");
  dots.forEach(dot => {
    dot.classList.remove("w-[23px]", "h-[4px]", "bg-black");
    dot.classList.add("w-1", "h-1", "bg-black/40");
  });

  dots[currentIndex % products.length].classList.remove("w-1", "h-1", "bg-black/40");
  dots[currentIndex % products.length].classList.add("w-[23px]", "h-[4px]", "bg-black", "rounded-md");
}

// Infinite setup
function initSlider() {
  const cloned = [...products, ...products];
  track.innerHTML = cloned.map(createCard).join("");
  createPagination();
  updatePagination();
}

// Move slide
function moveSlide(direction = 1) {
  currentIndex += direction;
  track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

  if (currentIndex >= products.length) {
    setTimeout(() => {
      track.style.transition = "none";
      currentIndex = 0;
      track.style.transform = `translateX(0px)`;
      setTimeout(() => {
        track.style.transition = "transform 700ms ease-in-out";
      }, 50);
    }, 700);
  }

  if (currentIndex < 0) {
    track.style.transition = "none";
    currentIndex = products.length - 1;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    setTimeout(() => {
      track.style.transition = "transform 700ms ease-in-out";
    }, 50);
  }

  updatePagination();
}

// Navigation
nextBtn.addEventListener("click", () => moveSlide(1));
prevBtn.addEventListener("click", () => moveSlide(-1));

// Pagination click
pagination.addEventListener("click", (e) => {
  if (e.target.dataset.index) {
    currentIndex = Number(e.target.dataset.index);
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    updatePagination();
  }
});

// Autoplay
function startAutoPlay() {
  autoPlay = setInterval(() => moveSlide(1), 3000);
}

function stopAutoPlay() {
  clearInterval(autoPlay);
}

track.addEventListener("mouseenter", stopAutoPlay);
track.addEventListener("mouseleave", startAutoPlay);

initSlider();
startAutoPlay();
