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

const form = document.querySelector("form");

form.addEventListener("submit", function (e) {
  const email = document.getElementById("email").value.trim();
  const title = document.getElementById("title").value.trim();
  const desc = document.getElementById("desc").value.trim();
  const tags = document.querySelectorAll('input[name="tags"]');
  const uploadInput = document.getElementById("upload");
  const radioChecked = document.querySelector('input[name="check"]:checked');

  let valid = true;
  let errorMsg = "";

  // 1. Semua field harus diisi
  if (!email || !title || !desc) {
    valid = false;
    errorMsg += "- Semua field harus diisi.\n";
  }

  // 2. Validasi email
  if (!email.includes("@") || !email.endsWith(".com")) {
    valid = false;
    errorMsg += "- Email harus valid dan diakhiri dengan '.com'.\n";
  }

  // 3. Checkbox minimal satu
  const anyTagChecked = Array.from(tags).some((tag) => tag.checked);
  if (!anyTagChecked) {
    valid = false;
    errorMsg += "- Minimal satu tag harus dicentang.\n";
  }

  // 4. Upload harus diisi
  if (!uploadInput || !uploadInput.files || uploadInput.files.length === 0) {
    valid = false;
    errorMsg += "- Harus mengunggah file.\n";
  }

  // 5. Radio (AI) harus dipilih
  if (!radioChecked) {
    valid = false;
    errorMsg += "- Pilih apakah ini dihasilkan oleh AI (ya atau tidak).\n";
  }

  if (!valid) {
    e.preventDefault();
    alert(errorMsg);
  }
});
