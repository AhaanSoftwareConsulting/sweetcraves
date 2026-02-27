
  const CART_KEY = "offcanvas_cart";

  function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartBadge();
    renderCart();
  }

  function addToCart(product) {
    const cart = getCart();
    const item = cart.find(i => i.id === product.id);

    if (item) {
      item.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }

    saveCart(cart);
  }

  function updateQty(id, change) {
    let cart = getCart()
      .map(item =>
        item.id === id ? { ...item, qty: item.qty + change } : item
      )
      .filter(item => item.qty > 0);

    saveCart(cart);
  }

  function renderCart() {
  const container = document.getElementById("cartItems");
  const totalEl = document.getElementById("cartTotal");

  if (!container) return;

  const cart = getCart();
  container.innerHTML = "";

  let total = 0;

  cart.forEach(item => {

    // Ensure price is numeric
    const numericPrice = parseFloat(
      item.price.toString().replace(/[^\d.]/g, "")
    );

    total += numericPrice * item.qty;

    container.innerHTML += `
      <div class=" gap-4 items-center py-3 border-b">

        <img
          src="${item.image}"
          class="w-5 h-5 object-cover rounded-md"
        />

        <div class="flex-1">
          <h4 class="font-medium text-sm">${item.title}</h4>

          <p class="text-sm text-gray-500">
            ${item.price}
          </p>

          <div class="flex items-center gap-3 mt-2">
            <button onclick="updateQty(${item.id}, -1)"
              class="w-8 h-8 flex items-center justify-center border rounded-full">
              −
            </button>

            <span class="min-w-[20px] text-center">${item.qty}</span>

            <button onclick="updateQty(${item.id}, 1)"
              class="w-8 h-8 flex items-center justify-center border rounded-full">
              +
            </button>
          </div>
        </div>
      </div>
    `;
  });

  totalEl.textContent = `$${total.toFixed(2)}`;
}

  function updateCartBadge() {
    const count = getCart().reduce((sum, item) => sum + item.qty, 0);

    document.querySelectorAll(".cart-count").forEach(badge => {
      if (count > 0) {
        badge.textContent = count;
        badge.classList.remove("hidden");
      } else {
        badge.classList.add("hidden");
      }
    });
  }

  function openCart() {
    document.getElementById("cartDrawer").classList.remove("translate-x-full");
    document.getElementById("cartOverlay").classList.remove("hidden");
    renderCart();
  }

  function closeCart() {
    document.getElementById("cartDrawer").classList.add("translate-x-full");
    document.getElementById("cartOverlay").classList.add("hidden");
  }

  document.addEventListener("DOMContentLoaded", updateCartBadge);



function openSearch() {
  const box = document.getElementById("searchBox");
  box.classList.toggle("hidden");
  document.getElementById("searchInput").focus();
}

function closeSearch() {
    document.getElementById("searchBox").classList.add("hidden");
    document.getElementById("searchInput").value = "";
    searchProducts();
  }

function searchProducts() {
  const query = document
    .getElementById("searchInput")
    .value
    .toLowerCase();

  const results = document.getElementById("searchResults");
  const template = document.getElementById("search-item-template");

  results.innerHTML = "";

  if (query.length < 2) return;

  const matched = products.filter(p =>
    p.title.rendered.toLowerCase().includes(query)
  );

  matched.slice(0, 6).forEach((product, index) => {
    const clone = template.content.cloneNode(true);

    // IMAGE
    clone.querySelector("img").src =
      product._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";

    // TITLE
    clone.querySelector(".title").innerText =
      product.title.rendered;

    // PRICE (manual like grid)
    clone.querySelector(".price").innerText =
      MANUAL_PRICES[index]
        ? `$${MANUAL_PRICES[index].toLocaleString()}`
        : "";

    // CLICK → PRODUCT PAGE
    clone.firstElementChild.onclick = () => {
      window.location.href = product.link;
    };

    results.appendChild(clone);
  });
}

function openMobileSearch() {
  document.getElementById("mobileSearch").classList.remove("hidden");
  document.getElementById("mobileSearchInput").focus();
}

function closeMobileSearch() {
  document.getElementById("mobileSearch").classList.add("hidden");
  document.getElementById("mobileSearchInput").value = "";
  document.getElementById("mobileSearchResults").innerHTML = "";
}

function searchProductsMobile() {
  if (!products || products.length === 0) return;

  const input = document.getElementById("mobileSearchInput");
  const query = input.value.trim().toLowerCase();

  const results = document.getElementById("mobileSearchResults");
  const template = document.getElementById("search-item-template");

  results.innerHTML = "";

  if (query.length < 2) return;

  const matched = products.filter(p =>
    p.title?.rendered?.toLowerCase().includes(query)
  );

  matched.slice(0, 8).forEach((product, index) => {
    const clone = template.content.cloneNode(true);

    // IMAGE
    clone.querySelector("img").src =
      product._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";

    // TITLE
    clone.querySelector(".title").textContent =
      product.title.rendered;

    // PRICE
    clone.querySelector(".price").textContent =
      MANUAL_PRICES[index]
        ? `$${MANUAL_PRICES[index].toLocaleString()}`
        : "";

    clone.firstElementChild.onclick = () => {
      closeMobileSearch();
      window.location.href = product.link;
    };

    results.appendChild(clone);
  });
}






