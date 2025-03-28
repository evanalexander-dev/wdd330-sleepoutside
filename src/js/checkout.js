import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const checkoutProcess = new CheckoutProcess();
checkoutProcess.init();

document.getElementById("zip").addEventListener("change", () => {
  checkoutProcess.calculateAndRenderSummary();
});

document.forms["checkout-form"].addEventListener("submit", (e) => {
  e.preventDefault();

  checkoutProcess.checkout();
});
