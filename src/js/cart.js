import { getLocalStorage, renderCartIcon } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  //Fixing delete button not working
  const deleteButtons = document.querySelectorAll(".close-btn");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function() {
      deleteItem(button.getAttribute("data-id"));
    });
  });
}

function cartItemTemplate(item) {
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
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartIcon();

renderCartContents();

//renderCartCount();

function deleteItem(id) {
  var cartItems = getLocalStorage("so-cart");

  if (cartItems) {
    const itemIndex = cartItems.findIndex(item => item.Id === id);

    if (itemIndex !== -1) {
      cartItems.splice(itemIndex, 1);

      localStorage.clear();

      localStorage.setItem("so-cart", JSON.stringify(cartItems))

      renderCartContents();

      //renderCartCount();
    }
  }
}