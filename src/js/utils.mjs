// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function handleCartChange(cartQuantityElement = document.getElementById("cart-quantity-items")) {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems) {
    const cartQuantity = cartItems.length;
    cartQuantityElement.innerText = cartQuantity;
    cartQuantityElement.classList.add("active");
  }
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  if (clear) {
    parentElement.innerHTML = "";
  }

  const htmlCards = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlCards.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {
  const headerElement = document.querySelector("#main-header");
  const headerPartial = await loadTemplate("../partials/header.html");
  renderWithTemplate(headerPartial, headerElement, undefined, renderCartIcon);

  const footerElement = document.querySelector("#main-footer");
  const footerPartial = await loadTemplate("../partials/footer.html");
  renderWithTemplate(footerPartial, footerElement);
}

function renderCartIcon() {
  const cart = document.querySelector(".cart");

  const cartLink = document.createElement("a");
  cartLink.href = `${location.origin}/cart/index.html`;

  cartLink.innerHTML = `
    <span id="cart-quantity-items"></span>
    <img src="/images/cart-icon.svg" alt="Cart Icon">
  `;

  handleCartChange(cartLink.querySelector("#cart-quantity-items"));

  cart.appendChild(cartLink);
}

export function calculateDiscount(finalPrice, suggestedRetailPrice) {
  const hasDiscount = finalPrice < suggestedRetailPrice;
  const discountAmount = hasDiscount ? (suggestedRetailPrice - finalPrice).toFixed(2) : 0;
  const discountPercent = hasDiscount ? Math.round((discountAmount / suggestedRetailPrice) * 100) : 0;

  return { hasDiscount, discountAmount, discountPercent };
}

export function generateDiscountTag(finalPrice, suggestedRetailPrice) {
  const { hasDiscount, discountAmount, discountPercent } = calculateDiscount(finalPrice, suggestedRetailPrice);

  return hasDiscount
    ? `<p class="product__discount">Save $${discountAmount} (${discountPercent}% OFF)</p>`
    : "";
}
