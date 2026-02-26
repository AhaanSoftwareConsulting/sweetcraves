const tabs = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {

    tabs.forEach(t => t.classList.remove("active-tab"));
    tab.classList.add("active-tab");

    const id = tab.dataset.tab;

    contents.forEach(c => {
      c.classList.add("hidden");
      c.classList.remove("active-grid");
    });

    document.getElementById(id).classList.remove("hidden");
    document.getElementById(id).classList.add("active-grid");

  });
});