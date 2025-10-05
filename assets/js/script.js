// ===========================
// Smooth Scroll for Navigation
// ===========================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ===========================
// Gallery Category Filter
// ===========================
const categoryButtons = document.querySelectorAll(".category-btn");
const photoItems = document.querySelectorAll(".photo-item");

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    categoryButtons.forEach((btn) => btn.classList.remove("active"));
    // Add active class to clicked button
    button.classList.add("active");

    const category = button.dataset.category;

    // Filter photos
    photoItems.forEach((item) => {
      if (category === "all" || item.dataset.category === category) {
        item.classList.remove("hidden");
        // Fade in animation
        item.style.animation = "fadeIn 0.5s ease-in";
      } else {
        item.classList.add("hidden");
      }
    });
  });
});

// ===========================
// Lightbox Gallery
// ===========================
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const closeBtn = document.querySelector(".lightbox-close");
const prevBtn = document.querySelector(".lightbox-prev");
const nextBtn = document.querySelector(".lightbox-next");

let currentImageIndex = 0;
let visibleImages = [];

// Update visible images list
function updateVisibleImages() {
  visibleImages = Array.from(photoItems).filter(
    (item) => !item.classList.contains("hidden")
  );
}

// Open lightbox
photoItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    updateVisibleImages();
    currentImageIndex = visibleImages.indexOf(item);
    showImage(currentImageIndex);
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent scrolling
  });
});

// Show image in lightbox
function showImage(index) {
  const item = visibleImages[index];
  const img = item.querySelector("img");
  const caption = item.querySelector(".photo-overlay p");

  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxCaption.textContent = caption ? caption.textContent : img.alt;
}

// Close lightbox
closeBtn.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "auto"; // Re-enable scrolling
}

// Previous image
prevBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  currentImageIndex =
    (currentImageIndex - 1 + visibleImages.length) % visibleImages.length;
  showImage(currentImageIndex);
});

// Next image
nextBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  currentImageIndex = (currentImageIndex + 1) % visibleImages.length;
  showImage(currentImageIndex);
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("active")) return;

  if (e.key === "Escape") {
    closeLightbox();
  } else if (e.key === "ArrowLeft") {
    prevBtn.click();
  } else if (e.key === "ArrowRight") {
    nextBtn.click();
  }
});

// ===========================
// Navbar Scroll Effect
// ===========================
const navbar = document.querySelector(".navbar");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
  } else {
    navbar.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
  }

  lastScroll = currentScroll;
});

// ===========================
// Fade-in Animation on Scroll
// ===========================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for fade-in animation
document
  .querySelectorAll(
    ".research-item, .publication-item, .project-card, .timeline-item, .photo-item"
  )
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

// ===========================
// Mobile Menu Toggle
// ===========================

const menuToggle = document.createElement("button");
menuToggle.className = "menu-toggle";
menuToggle.innerHTML = "☰";
menuToggle.style.display = "none";

const navMenu = document.querySelector(".nav-menu");
navbar.querySelector(".container").insertBefore(menuToggle, navMenu);

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// Show/hide menu toggle on resize
function checkMenuToggle() {
  if (window.innerWidth <= 768) {
    menuToggle.style.display = "block";
  } else {
    menuToggle.style.display = "none";
    navMenu.classList.remove("active");
  }
}

window.addEventListener("resize", checkMenuToggle);
checkMenuToggle();
