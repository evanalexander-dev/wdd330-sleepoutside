// Load the alerts.json file
export default function loadAlerts() {
  fetch(`../json/alerts.json`)
    .then((response) => response.json())
    .then((data) => {
      createAlerts(data);
      showRegistrationModal();
    })
    /* eslint-disable no-console */ // Allows console statements in this file
    .catch((error) => console.error(error));
}

// Function to create and display alerts
function createAlerts(alerts) {
  if (alerts && Array.isArray(alerts)) {
    // Create a <section> element for alerts
    const alertSection = document.createElement('section');
    alertSection.className = 'alert-list';

    // Loop through the alerts and create <p> elements
    alerts.forEach((alertData) => {
      const alert = document.createElement('p');
      alert.textContent = alertData.message;
      alert.style.backgroundColor = alertData.background;
      alert.style.color = alertData.color;

      // Append the alert to the alert section
      alertSection.appendChild(alert);
    });

    // Prepend the alert section to the main element
    const mainElement = document.querySelector('main');
    mainElement.prepend(alertSection);
  }
}

// Function to display the registration modal
function showRegistrationModal() {
  console.log("Checking if the modal should be displayed...");

  if (!localStorage.getItem('hasSeenModal')) {
    console.log("Displaying the modal...");

    const modal = document.createElement('div');
    modal.className = 'registration-modal';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '1000';

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.style.backgroundColor = 'white';
    modalContent.style.padding = '20px';
    modalContent.style.borderRadius = '8px';
    modalContent.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';

    const title = document.createElement('h2');
    title.textContent = 'Join & Win!';

    const message = document.createElement('p');
    message.textContent =
      'Register today and enter our giveaway for a chance to win a special prize!';

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Got it!';
    closeButton.style.marginTop = '10px';
    closeButton.onclick = () => {
      modal.style.display = 'none';
      localStorage.setItem('hasSeenModal', 'true'); // Prevent modal from showing again
      console.log("Modal closed and saved to localStorage.");
    };

    modalContent.appendChild(title);
    modalContent.appendChild(message);
    modalContent.appendChild(closeButton);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
  } else {
    console.log("User has already seen the modal.");
  }
}