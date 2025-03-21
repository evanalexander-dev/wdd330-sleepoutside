import { getLocalStorage, handleCartChange, loadHeaderFooter } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));

  // Check if cart is empty
  if (cartItems.length !== 0) {
    const total = cartItems.reduce(reducerFunction, 0);

    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    document.querySelector(".cart-total").textContent = `Total: $${total}`;

    const deleteButtons = document.querySelectorAll(".close-btn");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", function () {
        deleteItem(button.getAttribute("data-id"));
      });
    });
  } else {
    document.querySelector(".product-list").innerHTML = `<p>Cart is currently empty. Add products</p>`;
    document.querySelector(".cart-total").textContent = "";
  }
}

function reducerFunction(total, item) {
  return (total + parseFloat(item.FinalPrice));
}

function cartItemTemplate(item) {
  console.log(item);
  const newItem = `<li class="cart-card divider">
  <button class="close-btn" data-id="${item.Id}">X</button>
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
  <p class="cart-card__quantity">qty: ${item.Qty}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

loadHeaderFooter();
renderCartContents();
renderCartCount();

function deleteItem(id) {
  var cartItems = getLocalStorage("so-cart");

  if (cartItems) {
    const itemIndex = cartItems.findIndex(item => item.Id === id);

    if (itemIndex !== -1) {
      cartItems.splice(itemIndex, 1);
      localStorage.setItem("so-cart", JSON.stringify(cartItems));

      handleCartChange();
      renderCartContents();
      renderCartCount();
    }
  }
}
