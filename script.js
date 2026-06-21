const navLinks = document.querySelectorAll(".nav a");
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-links");
const cartButtons = document.querySelectorAll(".shop-card button");
const cartModal = document.querySelector("#cartModal");
const closeCart = document.querySelector(".close-cart");
const checkoutBtn = document.querySelector(".checkout-btn");
const eventForm = document.querySelector("#eventForm");

navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    const target = document.querySelector(link.getAttribute("href"));

    if (target) {
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: "smooth"
      });
    }

    if (navMenu) {
      navMenu.classList.remove("active");
    }
  });
});

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
}

window.addEventListener("scroll", () => {
  const nav = document.querySelector(".nav");

  if (nav) {
    if (window.scrollY > 50) {
      nav.style.boxShadow = "0 8px 25px rgba(0,0,0,0.06)";
    } else {
      nav.style.boxShadow = "none";
    }
  }
});

if (cartModal) {
  cartButtons.forEach(button => {
    button.addEventListener("click", () => {
      cartModal.classList.add("active");
    });
  });

  if (closeCart) {
    closeCart.addEventListener("click", () => {
      cartModal.classList.remove("active");
    });
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      cartModal.classList.remove("active");
    });
  }

  cartModal.addEventListener("click", e => {
    if (e.target === cartModal) {
      cartModal.classList.remove("active");
    }
  });
}

if (eventForm) {
  eventForm.addEventListener("submit", e => {
    e.preventDefault();
    alert("Thank you! Your SIP event inquiry has been submitted.");
    eventForm.reset();
  });
}
