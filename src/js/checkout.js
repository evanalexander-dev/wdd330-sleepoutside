import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const checkoutProcess = new CheckoutProcess();
checkoutProcess.init();

document.getElementById("zip-code").addEventListener("change", () => {
  checkoutProcess.calculateAndRenderSummary();
});
