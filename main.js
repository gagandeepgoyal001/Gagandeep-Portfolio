// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({ behavior: "smooth" });
  });
});

// Animate Progress Bars on Scroll
function animateProgressBars() {
  const progressBars = document.querySelectorAll(".progress-bar");
  progressBars.forEach(bar => {
    const fill = bar.querySelector(".progress-fill");
    const targetWidth = bar.getAttribute("data-progress");
    if (bar.getBoundingClientRect().top < window.innerHeight - 50) {
      fill.style.width = targetWidth + "%";
    }
  });
}
window.addEventListener("scroll", animateProgressBars);
window.addEventListener("load", animateProgressBars);

// AJAX Contact Form Submission with Formspree
const contactForm = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Basic validation
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name === "" || email === "" || message === "") {
    formMsg.textContent = "Please fill in all fields.";
    formMsg.style.color = "#ee5253";
    return;
  }

  // Prepare form data
  const formData = new FormData(contactForm);

  // Send form data using fetch
  fetch(contactForm.action, {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json"
    }
  })
    .then(response => {
      if (response.ok) {
        formMsg.textContent = "Thank you for your message!";
        formMsg.style.color = "#38a169";
        contactForm.reset();
      } else {
        response.json().then(data => {
          if (data.errors) {
            formMsg.textContent = data.errors.map(error => error.message).join(", ");
          } else {
            formMsg.textContent = "Oops! There was a problem submitting your form.";
          }
          formMsg.style.color = "#ee5253";
        });
      }
    })
    .catch(error => {
      formMsg.textContent = "Oops! There was a problem submitting your form.";
      formMsg.style.color = "#ee5253";
    });
});
