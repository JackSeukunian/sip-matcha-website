const navLinks = document.querySelectorAll(".nav a");
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-links");
const eventForm = document.querySelector("#eventForm");

const openCartBtn = document.querySelector("#openCart");
const closeCartBtn = document.querySelector("#closeCart");
const cartDrawer = document.querySelector("#cartDrawer");
const cartOverlay = document.querySelector("#cartOverlay");
const cartItems = document.querySelector("#cartItems");
const cartCount = document.querySelector("#cartCount");
const cartTotal = document.querySelector("#cartTotal");
const goToCheckout = document.querySelector("#goToCheckout");
const addToCartButtons = document.querySelectorAll(".add-to-cart");

let cart = JSON.parse(localStorage.getItem("sipCart")) || [];

navLinks.forEach(link => {
  link.addEventListener("click", e => {
    const href = link.getAttribute("href");

    if (href.startsWith("#")) {
      e.preventDefault();

      const target = document.querySelector(href);

      if (target) {
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior: "smooth"
        });
      }

      if (navMenu) {
        navMenu.classList.remove("active");
      }
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
    nav.style.boxShadow =
      window.scrollY > 50
        ? "0 8px 25px rgba(0,0,0,0.06)"
        : "none";
  }
});

function saveCart() {
  localStorage.setItem("sipCart", JSON.stringify(cart));
}

function openCart() {
  cartDrawer.classList.add("active");
  cartOverlay.classList.add("active");
}

function closeCart() {
  cartDrawer.classList.remove("active");
  cartOverlay.classList.remove("active");
}

function addToCart(name, price) {
  const item = cart.find(product => product.name === name);

  if (item) {
    item.quantity += 1;
  } else {
    cart.push({
      name,
      price: Number(price),
      quantity: 1
    });
  }

  saveCart();
  renderCart();
  openCart();
}

function increaseQuantity(name) {
  const item = cart.find(product => product.name === name);

  if (item) {
    item.quantity += 1;
  }

  saveCart();
  renderCart();
}

function decreaseQuantity(name) {
  const item = cart.find(product => product.name === name);

  if (!item) return;

  if (item.quantity > 1) {
    item.quantity -= 1;
  } else {
    cart = cart.filter(product => product.name !== name);
  }

  saveCart();
  renderCart();
}

window.increaseQuantity = increaseQuantity;
window.decreaseQuantity = decreaseQuantity;

function renderCart() {
  if (!cartItems) return;

  cartItems.innerHTML = "";

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  cartCount.textContent = itemCount;
  cartTotal.textContent = `$${subtotal.toFixed(2)}`;

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cart.forEach(item => {
    const row = document.createElement("div");
    row.classList.add("cart-item");

    row.innerHTML = `
      <div>
        <div class="cart-item-name">${item.name}</div>
        <div>$${item.price.toFixed(2)}</div>
      </div>

      <div class="cart-item-controls">
        <button onclick="decreaseQuantity('${item.name}')">−</button>
        <span>${item.quantity}</span>
        <button onclick="increaseQuantity('${item.name}')">+</button>
      </div>
    `;

    cartItems.appendChild(row);
  });
}

addToCartButtons.forEach(button => {
  button.addEventListener("click", () => {
    addToCart(button.dataset.name, button.dataset.price);
  });
});

if (openCartBtn) {
  openCartBtn.addEventListener("click", openCart);
}

if (closeCartBtn) {
  closeCartBtn.addEventListener("click", closeCart);
}

if (cartOverlay) {
  cartOverlay.addEventListener("click", closeCart);
}

if (goToCheckout) {
  goToCheckout.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    window.location.href = "checkout.html";
  });
}

if (eventForm) {
  eventForm.addEventListener("submit", e => {
    e.preventDefault();
    alert("Thank you! Your SIP event inquiry has been submitted.");
    eventForm.reset();
  });
}

renderCart();
