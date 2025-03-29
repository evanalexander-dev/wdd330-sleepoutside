import {
  getLocalStorage,
  handleCartChange,
  loadHeaderFooter,
  cartTotalReducerFunction,
} from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));

  // Check if cart is empty
  if (cartItems.length !== 0) {
    const total = cartItems.reduce(cartTotalReducerFunction, 0);

    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    document.querySelector(".cart-total").textContent =
      `Total: $${total.toFixed(2)}`;

    const deleteButtons = document.querySelectorAll(".close-btn");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", function () {
        deleteItem(button.getAttribute("data-id"));
      });
    });

    const quantityInputs = document.querySelectorAll(".quantity-input");
    quantityInputs.forEach((input) => {
      input.addEventListener("change", function () {
        updateQuantity(input.getAttribute("data-id"), input.value);
      });
    });

    const checkoutButton = document.createElement("button");
    checkoutButton.innerText = "Checkout";
    checkoutButton.setAttribute("id", "cart-checkout-btn");

    checkoutButton.addEventListener("click", () => {
      window.location.replace("/checkout/index.html");
    });

    document.querySelector(".cart-button-wrapper").innerHTML = "";
    document.querySelector(".cart-button-wrapper").appendChild(checkoutButton);
  } else {
    document.querySelector(".product-list").innerHTML =
      `<p>Cart is currently empty. Add products</p>`;
    document.querySelector(".cart-total").textContent = "";
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <button class="close-btn" data-id="${item.Id}">X</button>
  <a href="#" class="cart-card__image">
    <img src="${item.Images.PrimarySmall}" alt="${item.Name}" />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">
    qty: 
    <input 
      type="number" 
      class="quantity-input" 
      data-id="${item.Id}" 
      value="${item.Quantity}" 
      min="1" 
    />
  </p>
  <p class="cart-card__price">$${(item.FinalPrice * item.Quantity).toFixed(2)}</p>
</li>`;

  return newItem;
}

function updateQuantity(id, newQuantity) {
  var cartItems = getLocalStorage("so-cart");

  if (cartItems) {
    const itemIndex = cartItems.findIndex((item) => item.Id === id);

    if (itemIndex !== -1) {
      // Update the quantity
      cartItems[itemIndex].Quantity = parseInt(newQuantity, 10);
      localStorage.setItem("so-cart", JSON.stringify(cartItems));

      handleCartChange();
      renderCartContents();
    }
  }
}

function deleteItem(id) {
  var cartItems = getLocalStorage("so-cart");

  if (cartItems) {
    const itemIndex = cartItems.findIndex((item) => item.Id === id);

    if (itemIndex !== -1) {
      cartItems.splice(itemIndex, 1);
      localStorage.setItem("so-cart", JSON.stringify(cartItems));

      handleCartChange();
      renderCartContents();
    }
  }
}

loadHeaderFooter();
renderCartContents();
