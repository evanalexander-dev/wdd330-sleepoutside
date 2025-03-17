import { getLocalStorage, renderCartIcon } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));

  // Check if cart is empty
  if (cartItems.length !== 0) {

    const total = cartItems.reduce(reducerFunction, 0);

    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    document.querySelector(".cart-total").textContent = `Total: $${total.toFixed(2)}`;
  }
  else {
    document.querySelector(".product-list").innerHTML = `<p>Cart is currently empty. Add products</>`;

  }

}

function reducerFunction(total, item) {
  return total + item.FinalPrice;
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartIcon();
renderCartContents();
