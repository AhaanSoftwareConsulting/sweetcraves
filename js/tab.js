
  const tabs = document.querySelectorAll(".tab");
  const leftImage = document.getElementById("leftImage");
  const rightImage = document.getElementById("rightImage");
  const container = document.querySelector(".relative.text-center");

  function activateTab(tab) {
    // Remove active from all
    tabs.forEach(t => {
      t.classList.remove("text-[#E63946]");
      t.classList.add("text-[#1C1C1C]");
    });

    // Add active styles
    tab.classList.remove("text-[#1C1C1C]");
    tab.classList.add("text-[#E63946]");

    // Change images
    leftImage.src = tab.dataset.left;
    rightImage.src = tab.dataset.right;

    leftImage.classList.remove("opacity-0");
    rightImage.classList.remove("opacity-0");

    // 🔥 ALIGN IMAGE WITH TAB
    const tabRect = tab.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const offset = tabRect.top - containerRect.top + tabRect.height / 2;

    leftImage.style.top = offset + "px";
    rightImage.style.top = offset + "px";
  }

  // 👉 First tab active on load
  if (tabs.length > 0) {
    activateTab(tabs[0]);
  }

  // Hover interaction
  tabs.forEach(tab => {
    tab.addEventListener("mouseenter", () => {
      activateTab(tab);
    });
  });

