const checkoutItems = document.querySelector("#checkoutItems");
const subtotalEl = document.querySelector("#subtotal");
const taxEl = document.querySelector("#tax");
const deliveryFeeEl = document.querySelector("#deliveryFee");
const totalEl = document.querySelector("#total");
const paymentBtn = document.querySelector("#paymentBtn");

const deliveryFields = document.querySelector("#deliveryFields");
const pickupInfo = document.querySelector("#pickupInfo");
const orderMethodRadios = document.querySelectorAll("input[name='orderMethod']");

let cart = JSON.parse(localStorage.getItem("sipCart")) || [];

const TAX_RATE = 0.07;
const DELIVERY_FEE = 5;

function getOrderMethod() {
  const selected = document.querySelector("input[name='orderMethod']:checked");
  return selected ? selected.value : "pickup";
}

function renderCheckout() {
  checkoutItems.innerHTML = "";

  if (cart.length === 0) {
    checkoutItems.innerHTML = `
      <p>Your cart is empty.</p>
      <a href="index.html#shop" class="checkout-empty-link">Return to Shop</a>
    `;

    subtotalEl.textContent = "$0.00";
    taxEl.textContent = "$0.00";
    deliveryFeeEl.textContent = "$0.00";
    totalEl.textContent = "$0.00";
    return;
  }

  let subtotal = 0;

  cart.forEach(item => {
    subtotal += item.price * item.quantity;

    const row = document.createElement("div");
    row.classList.add("checkout-item");

    row.innerHTML = `
      <span>${item.quantity} × ${item.name}</span>
      <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
    `;

    checkoutItems.appendChild(row);
  });

  const deliveryFee = getOrderMethod() === "delivery" ? DELIVERY_FEE : 0;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax + deliveryFee;

  subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  taxEl.textContent = `$${tax.toFixed(2)}`;
  deliveryFeeEl.textContent = `$${deliveryFee.toFixed(2)}`;
  totalEl.textContent = `$${total.toFixed(2)}`;
}

function toggleDeliveryFields() {
  const method = getOrderMethod();

  if (method === "delivery") {
    deliveryFields.style.display = "grid";
    pickupInfo.style.display = "none";
  } else {
    deliveryFields.style.display = "none";
    pickupInfo.style.display = "block";
  }

  renderCheckout();
}

orderMethodRadios.forEach(radio => {
  radio.addEventListener("change", toggleDeliveryFields);
});

paymentBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  alert("Stripe payment will connect here.");
});

toggleDeliveryFields();
renderCheckout();
