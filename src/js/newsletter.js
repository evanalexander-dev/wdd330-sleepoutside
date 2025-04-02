document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("newsletter-form");
    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("email-error");
    const successMessage = document.getElementById("success-message");
  
    // Handle the submit event
    form.addEventListener("submit", function (e) {
      e.preventDefault(); // Prevent form submission
  
      const emailValue = emailInput.value.trim();
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
      // Clear any previous messages
      emailError.textContent = "";
      successMessage.textContent = "";
  
      // Check if email is empty (required field)
      if (emailValue === "") {
        emailError.textContent = "A Vaild Email address is required."; // Custom required error message
        emailInput.style.border = "2px solid red"; // Highlight the input field with red
        return;
      }
  
      // Check if the email is valid
      if (!emailPattern.test(emailValue)) {
        emailError.textContent = "Please enter a valid email address."; // Display invalid email message
        emailInput.style.border = "2px solid red"; // Highlight the input field with red
        return;
      }
  
      // If all checks pass, clear error and show success message
      emailInput.style.border = "1px solid var(--dark-grey)"; // Reset input field style
      successMessage.textContent = "Thank you for subscribing!  Stay tune for exciting news and offers."; // Display success message
  
      // Optionally, reset the form after successful submission
      form.reset();
    });
  
    // Show custom "required" error message when email is invalid and empty
    emailInput.addEventListener("invalid", function () {
      if (emailInput.validity.valueMissing) {
        emailError.textContent = "Email address is required."; // Show custom required message
      }
    });
  });
  