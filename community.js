const hamburger = document.querySelector(".hamburger-menu");
const drawer = document.getElementById("drawer");

// Toggle drawer
hamburger.addEventListener("click", (e) => {
  e.stopPropagation();
  drawer.classList.toggle("open");
});

// Tutup drawer jika klik di luar
document.addEventListener("click", (e) => {
  if (!drawer.contains(e.target) && !hamburger.contains(e.target)) {
    drawer.classList.remove("open");
  }
});

// Tutup drawer saat klik link
drawer.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    drawer.classList.remove("open");
  });
});

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const searchIcon = document.getElementById("mobile-search-icon");
const searchWrapper = document.getElementById("search-wrapper");

// Toggle search form
searchIcon.addEventListener("click", (e) => {
  e.stopPropagation();
  const isVisible = searchWrapper.style.display === "block";
  searchWrapper.style.display = isVisible ? "none" : "block";

  if (!isVisible) {
    searchInput.focus();
  }
});

// Tutup search saat klik luar
document.addEventListener("click", (e) => {
  if (
    searchWrapper.style.display === "block" &&
    !searchWrapper.contains(e.target) &&
    e.target !== searchIcon
  ) {
    searchWrapper.style.display = "none";
  }
});
