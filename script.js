// Improved Click Effect System
class ClickEffectManager {
  constructor() {
    this.ripples = [];
    this.colors = [
      'rgba(91, 51, 230, 0.6)',
      'rgba(172, 83, 240, 0.6)',
      'rgba(11, 80, 198, 0.5)',
      'rgba(164, 92, 216, 0.5)'
    ];
    this.init();
  }

  init() {
    document.addEventListener('click', (event) => this.createRipple(event));
  }

  createRipple(event) {
    // Skip if clicking on input elements
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName)) {
      return;
    }

    const ripple = document.createElement('div');
    const size = Math.random() * 8 + 6; // Random size between 6-14px
    const color = this.colors[Math.floor(Math.random() * this.colors.length)];

    ripple.classList.add('click-ripple');
    ripple.style.cssText = `
      position: fixed;
      left: ${event.clientX - size / 2}px;
      top: ${event.clientY - size / 2}px;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: radial-gradient(circle, ${color} 0%, transparent 70%);
      box-shadow: 0 0 ${size * 0.8}px ${size / 3}px ${color};
      pointer-events: none;
      z-index: 9999;
      transform: scale(0);
      opacity: 1;
      animation: rippleEffect 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    `;

    document.body.appendChild(ripple);
    this.ripples.push(ripple);

    // Clean up after animation
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
      this.ripples = this.ripples.filter(r => r !== ripple);
    }, 600);

    // Limit max ripples for performance
    if (this.ripples.length > 10) {
      const oldRipple = this.ripples.shift();
      if (oldRipple.parentNode) {
        oldRipple.parentNode.removeChild(oldRipple);
      }
    }
  }
}

// Initialize the improved click effect
const clickEffectManager = new ClickEffectManager();



const menuBtn = document.querySelector('.menu-btn');
const navbarWrapper = document.querySelector('.navbar-wrapper');
const menuCancelBtn = document.querySelector('.menu-cancel-btn');
const menuLinks = document.querySelectorAll('.navbar-wrapper ul li a');

const mainNavbar = document.querySelector('.main-navbar');
const profileImage = document.querySelector('.about-col-2 img');
const aboutContents = document.querySelector('.about .about-contents-wrapper');

menuBtn.addEventListener('click', toggleMenu);
menuCancelBtn.addEventListener('click', toggleMenu);
menuLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    closeMenu();

    // Smooth scroll with offset for fixed navbar
    const href = link.getAttribute('href');
    if (href.startsWith('#') && href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offsetTop = target.offsetTop - 5; // Account for navbar height + extra spacing
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  });
});


function toggleMenu() {
  navbarWrapper.classList.toggle('active');
  menuCancelBtn.classList.toggle('active');
  if (profileImage) {
    toggleImageVisibility();
  }
}

function closeMenu() {
  navbarWrapper.classList.remove('active');
  menuCancelBtn.classList.remove('active');
  if (profileImage) {
    profileImage.classList.remove('hide');
  }
}

function toggleImageVisibility() {
  if (profileImage) {
    profileImage.classList.toggle('hide');
  }
}


window.onscroll = function () { myFunction() };

function myFunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myScrollBar").style.width = scrolled + "%";
}

function sendMail() {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const submitBtn = document.querySelector('.form-btn');

  // Validate inputs
  if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
    alert("Please fill in all fields before sending.");
    return;
  }

  // Show loading state
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  var params = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    message: messageInput.value.trim(),
  };

  const serviceID = "service_dzyb976";
  const templateID = "template_dyv65x5";

  emailjs.send(serviceID, templateID, params)
    .then(res => {
      nameInput.value = "";
      emailInput.value = "";
      messageInput.value = "";
      alert("Thank you! Your message has been sent successfully. I'll get back to you soon.");
    })
    .catch(err => {
      console.error('EmailJS Error:', err);
      alert("Sorry, there was an error sending your message. Please try again or contact me directly via email.");
    })
    .finally(() => {
      // Restore button state
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    });
}


// document.addEventListener("contextmenu", function (event) {
//   event.preventDefault();
// })

const checkbox = document.getElementById("checkbox")
checkbox.addEventListener("change", () => {
  document.body.classList.toggle("light");
})



document.getElementById('showMoreBtn').addEventListener('click', function () {
  const allProjects = document.querySelectorAll('.projectBox');
  const hiddenProjects = document.querySelectorAll('.projectBox.hidden');
  const button = this;

  const isExpanding = hiddenProjects.length > 0;

  // Add loading state
  button.style.opacity = '0.7';
  button.style.pointerEvents = 'none';

  // Animate projects with stagger effect
  setTimeout(() => {
    allProjects.forEach((project, index) => {
      if (!project.classList.contains('always-visible')) {
        setTimeout(() => {
          project.classList.toggle('hidden', !isExpanding);
        }, index * 50); // Stagger animation
      }
    });

    button.textContent = isExpanding ? 'Show Less' : 'Show More';

    // Restore button state
    setTimeout(() => {
      button.style.opacity = '1';
      button.style.pointerEvents = 'auto';
    }, 300);
  }, 100);
});



const dob = new Date(2003, 7, 27);
const today = new Date();

let age = today.getFullYear() - dob.getFullYear();
const monthDiff = today.getMonth() - dob.getMonth();
if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
  age--;
}
document.getElementById('age').textContent = age + ' Years';

// External Link Modal System
class ExternalLinkModal {
  constructor() {
    this.modal = document.getElementById('linkModal');
    this.urlDisplay = document.getElementById('externalUrl');
    this.closeBtn = this.modal.querySelector('.link-modal-close');
    this.cancelBtn = this.modal.querySelector('.btn-cancel');
    this.proceedBtn = this.modal.querySelector('.btn-proceed');
    this.pendingUrl = null;
    this.init();
  }

  init() {
    // Intercept ALL clicks to catch links, onclick handlers, and form submissions
    document.addEventListener('click', (e) => {
      // Check for links first
      const link = e.target.closest('a[href]');
      if (link && this.isExternalLink(link)) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        setTimeout(() => this.showModal(link.href), 50);
        return;
      }

      // Check for project boxes with onclick handlers
      const projectBox = e.target.closest('.projectBox');
      if (projectBox && projectBox.hasAttribute('onclick')) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        // Extract URL from onclick attribute
        const onclickAttr = projectBox.getAttribute('onclick');
        const urlMatch = onclickAttr.match(/window\.open\(['"](.*?)['"]/);
        if (urlMatch && urlMatch[1]) {
          setTimeout(() => this.showModal(urlMatch[1]), 50);
        }
        return;
      }

      // Check for form submissions (like My Resume button)
      const form = e.target.closest('form[action]');
      if (form && e.target.type === 'submit') {
        const action = form.getAttribute('action');
        if (action && (action.startsWith('http://') || action.startsWith('https://'))) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          setTimeout(() => this.showModal(action), 50);
          return;
        }
      }
    }, true); // Use capture phase to intercept before other handlers

    // Close modal handlers
    this.closeBtn.addEventListener('click', () => this.hideModal());
    this.cancelBtn.addEventListener('click', () => this.hideModal());
    this.proceedBtn.addEventListener('click', () => this.proceed());

    // Close on background click
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.hideModal();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('active')) {
        this.hideModal();
      }
    });
  }

  isExternalLink(link) {
    const href = link.getAttribute('href');

    // Skip empty, mailto, tel, and hash-only links
    if (!href || href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href === '#' || href.startsWith('#')) {
      return false;
    }

    // Check if it's an external link (different domain or starts with http/https)
    try {
      // If it starts with http/https, it's definitely external
      if (href.startsWith('http://') || href.startsWith('https://')) {
        const linkUrl = new URL(href);
        const currentUrl = new URL(window.location.href);
        // Check if different hostname OR has target="_blank"
        return linkUrl.hostname !== currentUrl.hostname ||
          link.getAttribute('target') === '_blank';
      }
      return false;
    } catch (e) {
      // If URL parsing fails, check if has target blank
      return href.startsWith('http') || link.getAttribute('target') === '_blank';
    }
  }

  showModal(url) {
    this.pendingUrl = url;
    // Extract and display clean URL
    try {
      const urlObj = new URL(url);
      this.urlDisplay.textContent = urlObj.hostname + urlObj.pathname;
    } catch (e) {
      this.urlDisplay.textContent = url;
    }
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  hideModal() {
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
      this.pendingUrl = null;
    }, 400);
  }

  proceed() {
    if (this.pendingUrl) {
      window.open(this.pendingUrl, '_blank', 'noopener,noreferrer');
      this.hideModal();
    }
  }
}

// Scroll Reveal Animation System
class ScrollRevealManager {
  constructor() {
    this.observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };
    this.init();
  }

  init() {
    // Create intersection observer
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Optionally unobserve after revealing
          this.observer.unobserve(entry.target);
        }
      });
    }, this.observerOptions);

    // Observe all scroll reveal elements
    this.observeElements();
  }

  observeElements() {
    const revealElements = document.querySelectorAll(
      '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale'
    );

    revealElements.forEach(el => {
      this.observer.observe(el);
    });
  }
}

// Navbar Logo Scroll to Top
function initNavbarScrollToTop() {
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.style.cursor = 'url("images/Pointer.cur"), pointer';
    logo.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// Typing Animation Effect
class TypingEffect {
  constructor() {
    this.typingElement = document.querySelector('.typing-text');
    this.texts = [
      'Computer Science Student',
      'Freshworks Developer',
      'Full Stack Enthusiast',
      'Problem Solver'
    ];
    this.textIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.typingSpeed = 100;
    this.deletingSpeed = 50;
    this.pauseDelay = 2000;
    this.init();
  }

  init() {
    if (this.typingElement) {
      this.type();
    }
  }

  type() {
    const currentText = this.texts[this.textIndex];

    if (this.isDeleting) {
      // Deleting text
      this.typingElement.textContent = currentText.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      // Typing text
      this.typingElement.textContent = currentText.substring(0, this.charIndex + 1);
      this.charIndex++;
    }

    // Determine typing speed
    let speed = this.isDeleting ? this.deletingSpeed : this.typingSpeed;

    // Check if word is complete
    if (!this.isDeleting && this.charIndex === currentText.length) {
      // Pause at end of word
      speed = this.pauseDelay;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      // Move to next word
      this.isDeleting = false;
      this.textIndex = (this.textIndex + 1) % this.texts.length;
      speed = 500; // Pause before typing next word
    }

    setTimeout(() => this.type(), speed);
  }
}

// Initialize external link modal after DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  new ExternalLinkModal();
  new ScrollRevealManager();
  initNavbarScrollToTop();
  new TypingEffect();
});