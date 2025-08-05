window.addEventListener("load", () => {
  // Array nama file sesuai urutan slide
  const fileNames = ["lukisan 1.jpg", "lukisan 2.jpg", "lukisan 3.jpg", "lukisan 4.jpg", "lukisan 5.jpg"];

  const images = document.querySelectorAll(".carousel-slide img");

  images.forEach((img, i) => {
    const filePath = `asset/carousel/${fileNames[i]}`;
    img.src = filePath;

    console.log(`Set slide ${i + 1} ke: ${filePath}`);

    img.onerror = () => {
      console.error(`❌ Gagal load: ${filePath}`);
    };
  });

  const track = document.querySelector(".carousel-track");
  const slides = Array.from(track.children);
  const navDot = document.querySelector(".carousel-nav");
  const dots = Array.from(navDot.children);
  const nextBtn = document.querySelector(".carousel-button.right");
  const prevBtn = document.querySelector(".carousel-button.left");

  const slideWidth = slides[0].getBoundingClientRect().width;

  // slides.forEach((slide, index) => {
  //     slide.style.left = `${slideWidth * index}px`;
  // });

  let currentIndex = 0;

  nextBtn.addEventListener("click", () => {
    updateCurrentIndex(currentIndex + 1);
  });

  prevBtn.addEventListener("click", () => {
    updateCurrentIndex(currentIndex - 1);
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      updateCurrentIndex(index);
    });
  });

  function updateCurrentIndex(index) {
    const nextIndex = (index + slides.length) % slides.length;
    showSlide(nextIndex);
    currentIndex = nextIndex;
  }

  function showSlide(index) {
    const track = document.querySelector(".carousel-track");
    const slides = document.querySelectorAll(".carousel-slide");
    const totalSlides = slides.length;

    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;

    currentIndex = index;
    const offset = -index * 100;
    track.style.transform = `translateX(${offset}%)`;

    document.querySelector(".carousel-nav .current-slide")?.classList.remove("current-slide");
    if (dots[index]) dots[index].classList.add("current-slide");
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  // Optional: Auto-slide every 5 seconds
  setInterval(() => {
    nextSlide();
  }, 5000);

  // Init
  showSlide(0);

  const hamburger = document.querySelector(".hamburger-menu");
  const drawer = document.getElementById("drawer");

  // Buka/tutup drawer saat hamburger diklik
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation(); // Mencegah drawer langsung tertutup saat buka
    drawer.classList.toggle("open");
  });

  // Tutup drawer saat klik di luar drawer
  document.addEventListener("click", (e) => {
    const isClickInsideDrawer = drawer.contains(e.target);
    const isClickOnHamburger = hamburger.contains(e.target);

    if (!isClickInsideDrawer && !isClickOnHamburger) {
      drawer.classList.remove("open");
    }
  });

  // Tutup drawer saat klik salah satu link
  const drawerLinks = drawer.querySelectorAll("a");
  drawerLinks.forEach((link) => {
    link.addEventListener("click", () => {
      drawer.classList.remove("open");
    });
  });

  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const searchIcon = document.getElementById("mobile-search-icon");
  const searchWrapper = document.getElementById("search-wrapper");

  // Tampilkan/sembunyikan form pencarian saat ikon diklik
  searchIcon.addEventListener("click", function (e) {
    e.stopPropagation(); // Hindari tertutup langsung
    const isVisible = searchWrapper.style.display === "block";
    searchWrapper.style.display = isVisible ? "none" : "block";

    if (!isVisible) {
      searchInput.focus();
    }
  });

  // Tutup form pencarian saat klik di luar area
  document.addEventListener("click", function (e) {
    if (searchWrapper.style.display === "block" && !searchWrapper.contains(e.target) && e.target !== searchIcon) {
      searchWrapper.style.display = "none";
    }
  });
});
