import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

// get query params
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const message = urlParams.get("message");
const orderId = urlParams.get("orderId");

if (!message || !orderId) {
  window.location.replace("/");
}

document.getElementById("order-message").innerText = message;
document.getElementById("order-id").innerText = orderId;

const cart = JSON.parse(localStorage.getItem("so-cart"));
if (cart) {
  localStorage.removeItem("so-cart");
}

const countdown = document.getElementById("countdown");
let timeLeft = 30;

const countdownInterval = setInterval(() => {
  timeLeft--;
  countdown.innerText = `Redirecting to home in ${timeLeft} seconds...`;
  if (timeLeft <= 0) {
    clearInterval(countdownInterval);
    window.location.replace("/");
  }
}, 1000);
