// Modern Portfolio JavaScript

// DOM Elements
const header = document.querySelector('.header');
const menuBtn = document.createElement('div');
const navLinks = document.querySelector('.nav-links');
const skillItems = document.querySelectorAll('.skill');
const sections = document.querySelectorAll('section');
const progressBars = document.querySelectorAll(".progress-bar");
const contactForm = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");
const themeToggle = document.querySelector('.theme-toggle');
const backToTop = document.querySelector('.back-to-top');
const preloader = document.querySelector('.preloader');
const html = document.documentElement;

// Mobile Menu Setup
menuBtn.className = 'menu-btn';
menuBtn.innerHTML = `
  <span></span>
  <span></span>
  <span></span>
`;
document.querySelector('.nav-container').appendChild(menuBtn);

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
  // Hide preloader after page loads
  setTimeout(() => {
    preloader.classList.add('hidden');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }, 1000);

  // Initialize theme
  initTheme();
  
  // Initialize animations
  initTypewriter();
  animateProgressBars();
  revealSections();
  
  // Add animation classes to elements
  document.querySelectorAll('.skill').forEach((skill, index) => {
    skill.style.animationDelay = `${index * 0.1}s`;
    skill.classList.add('fade-in');
  });
  
  document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    card.classList.add('fade-in');
  });
});

window.addEventListener('scroll', function() {
  handleHeaderScroll();
  animateProgressBars();
  revealSections();
  toggleBackToTop();
});

// Theme Toggle Functionality
themeToggle.addEventListener('click', function() {
  if (html.getAttribute('data-theme') === 'light') {
    html.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    html.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
});

// Back to top button
backToTop.addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Initialize theme from localStorage
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', savedTheme);
}

// Mobile Menu Toggle
menuBtn.addEventListener('click', function() {
  this.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function() {
    menuBtn.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 100,
        behavior: "smooth"
      });
    }
  });
});

// Toggle back to top button visibility
function toggleBackToTop() {
  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}

// Header Scroll Effect
function handleHeaderScroll() {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

// Animate Progress Bars
function animateProgressBars() {
  progressBars.forEach(bar => {
    const fill = bar.querySelector(".progress-fill");
    const targetWidth = bar.getAttribute("data-progress");
    const barTop = bar.getBoundingClientRect().top;
    
    if (barTop < window.innerHeight - 50) {
      setTimeout(() => {
        fill.style.width = targetWidth + "%";
      }, 200);
    }
  });
}

// Section reveal animation
function revealSections() {
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight * 0.8;
    
    if (sectionTop < triggerPoint) {
      section.classList.add('visible');
    }
  });
}

// Skill item hover effect
skillItems.forEach(item => {
  item.addEventListener('mouseenter', function() {
    this.classList.add('active');
  });
  
  item.addEventListener('mouseleave', function() {
    this.classList.remove('active');
  });
});

// Typewriter effect for hero text
function initTypewriter() {
  const text = document.querySelector('.hero-text h2');
  if (!text) return;
  
  const originalText = text.textContent;
  text.textContent = '';
  let i = 0;
  
  const typeWriter = () => {
    if (i < originalText.length) {
      text.textContent += originalText.charAt(i);
      i++;
      setTimeout(typeWriter, 70);
    }
  };
  
  setTimeout(typeWriter, 500);
}

// Parallax effect on mouse movement
document.addEventListener('mousemove', function(e) {
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    const heroRect = heroSection.getBoundingClientRect();
    
    if (
      mouseY > heroRect.top &&
      mouseY < heroRect.bottom &&
      mouseX > heroRect.left &&
      mouseX < heroRect.right
    ) {
      const moveX = (mouseX - heroRect.left) / heroRect.width - 0.5;
      const moveY = (mouseY - heroRect.top) / heroRect.height - 0.5;
      
      const heroImage = document.querySelector('.hero-image');
      const heroText = document.querySelector('.hero-text');
      
      if (heroImage && heroText) {
        heroImage.style.transform = `translateX(${moveX * 20}px) translateY(${moveY * 20}px)`;
        heroText.style.transform = `translateX(${moveX * -20}px) translateY(${moveY * -10}px)`;
      }
    }
  }
});

// Particles background
function createParticles() {
  const particles = document.createElement('div');
  particles.className = 'particles';
  document.body.appendChild(particles);
  
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position, size, and animation delay
    const size = Math.random() * 5 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * 100}vh`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    
    particles.appendChild(particle);
  }
}
// Uncomment to enable particles: createParticles();

// AJAX Contact Form Submission with Formspree
contactForm.addEventListener("submit", function(e) {
  e.preventDefault();
  
  // Add loading state
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
  submitBtn.disabled = true;

  // Basic validation
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name === "" || email === "" || message === "") {
    formMsg.textContent = "Please fill in all fields.";
    formMsg.style.color = "#ee5253";
    resetButton();
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
        formMsg.textContent = "Thank you for your message! I'll get back to you soon.";
        formMsg.style.color = "#38a169";
        contactForm.reset();
        
        // Add success animation
        formMsg.classList.add('success-animation');
        setTimeout(() => {
          formMsg.classList.remove('success-animation');
        }, 5000);
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
      resetButton();
    })
    .catch(error => {
      formMsg.textContent = "Oops! There was a problem submitting your form.";
      formMsg.style.color = "#ee5253";
      resetButton();
    });
    
  function resetButton() {
    submitBtn.innerHTML = originalBtnText;
    submitBtn.disabled = false;
  }
});

// Animate counter statistics
function animateStats() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  statNumbers.forEach(stat => {
    const target = parseInt(stat.textContent);
    const duration = 2000; // 2 seconds
    const step = 30; // Update every 30ms
    const increment = target / (duration / step);
    let current = 0;
    
    const counter = setInterval(() => {
      current += increment;
      if (current >= target) {
        stat.textContent = target + '+';
        clearInterval(counter);
      } else {
        stat.textContent = Math.floor(current) + '+';
      }
    }, step);
  });
}

// Run stat animation when stats are visible
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateStats();
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsContainer = document.querySelector('.hero-stats');
if (statsContainer) {
  observer.observe(statsContainer);
}
