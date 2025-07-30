// Contact Form Handler
document.addEventListener("DOMContentLoaded", function () {
  // Contact Form Submission
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      // Show loading state
      submitBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      fetch("send_form.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            showMessage(data.message, "success");
            contactForm.reset();
          } else {
            showMessage(data.message, "error");
          }
        })
        .catch((error) => {
          showMessage("Network error. Please try again.", "error");
        })
        .finally(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        });
    });
  }

  // Newsletter Form Handler
  const newsletterForms = document.querySelectorAll(".news_form");
  newsletterForms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData();
      const emailInput = this.querySelector('input[type="email"]');
      const submitBtn = this.querySelector("button");
      const originalText = submitBtn.textContent;

      if (!emailInput.value) {
        showMessage("Please enter your email address", "error");
        return;
      }

      formData.append("newsletter_email", emailInput.value);

      // Show loading state
      submitBtn.textContent = "Subscribing...";
      submitBtn.disabled = true;

      fetch("send_form.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            showMessage(data.message, "success");
            emailInput.value = "";
          } else {
            showMessage(data.message, "error");
          }
        })
        .catch((error) => {
          showMessage("Network error. Please try again.", "error");
        })
        .finally(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        });
    });
  });

  // Message display function
  function showMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll(".form-message");
    existingMessages.forEach((msg) => msg.remove());

    // Create message element
    const messageDiv = document.createElement("div");
    messageDiv.className = `form-message alert alert-${
      type === "success" ? "success" : "danger"
    }`;
    messageDiv.innerHTML = `
            <i class="fa fa-${
              type === "success" ? "check-circle" : "exclamation-circle"
            }"></i>
            ${message}
        `;

    // Insert message
    const form = document.querySelector("#contactForm, .news_form");
    if (form) {
      form.insertBefore(messageDiv, form.firstChild);

      // Auto remove after 5 seconds
      setTimeout(() => {
        messageDiv.remove();
      }, 5000);
    }
  }
});
