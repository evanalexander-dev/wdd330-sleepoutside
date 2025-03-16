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

export function renderCartIcon() {
  const cart = document.querySelector('.cart');

  const cartLink = document.createElement('a');
  cartLink.href = `${location.origin}/cart/index.html`;

  cartLink.innerHTML = `
    <span id="cart-quantity-items"></span>
    <img src="/images/cart-icon.svg" alt="Cart Icon">
  `;

  handleCartChange(cartLink.querySelector('#cart-quantity-items'));

  cart.appendChild(cartLink);
}

export function handleCartChange(cartQuantityElement = document.getElementById('cart-quantity-items')) {
  const cartItems = getLocalStorage('so-cart');
  if (cartItems) {
    const cartQuantity = cartItems.length;
    cartQuantityElement.innerText = cartQuantity;
    cartQuantityElement.classList.add('active');
  }
}


export function renderListWithTemplate(templateFn, parentElement, list, position = 'afterbegin', clear = false) {
  if (clear == true) {
    parentElement.innerHTML = "";
  }
  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}