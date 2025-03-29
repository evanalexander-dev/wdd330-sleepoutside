import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
localStorage.removeItem("so-cart");

const urlParams = new URLSearchParams(window.location.search);
const message = urlParams.get("message");
const orderId = urlParams.get("orderId");

if (!message || !orderId) {
  window.location.replace("/");
}

document.querySelector("#order-message").innerText = message;
document.querySelector("#order-id").innerText = orderId;
