import { loadHeaderFooter, alertMessage } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const checkoutProcess = new CheckoutProcess();
checkoutProcess.init();

document.getElementById("zip").addEventListener("change", () => {
  checkoutProcess.calculateAndRenderSummary();
});

document.getElementById("co_submit").addEventListener("click", (e) => {
  e.preventDefault();
  const form = document.forms[0];
  const chkStatus = form.checkValidity();
  
  // Show validation UI (highlighting invalid fields)
  form.reportValidity();
  
  if (chkStatus) {  // If the form is valid
    checkoutProcess.checkout();  // Process checkout
    redirectToSuccess();         // Redirect to success page
    localStorage.removeItem("so-cart");  // Remove cart data
  } else {  // If the form is invalid
    // Gather error messages from invalid fields
    let errorMessages = [];

    Array.from(form.elements).forEach((input) => {
      if (!input.validity.valid) {
        // Get the native validation message
        errorMessages.push(input.validationMessage);
      }
    });

    // Show each error message separately in an alert
    errorMessages.forEach(message => {
      alertMessage(message, "error");
    });
  }
});

function redirectToSuccess() {
  window.location.href = "./success.html";
}
