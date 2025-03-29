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

  const form = e.target;
  const chk_status = form.checkValidity();
  form.reportValidity();

  if (chk_status) {
    checkoutProcess.checkout();
  }
});
