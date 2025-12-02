/* main.js
   Controls mobile menu, highlights nav links for current page,
   and handles contact form submission on contact.html
*/

(function () {
  // Mobile menu toggle
  window.toggleMobileMenu = function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (!mobileMenu) return;
    mobileMenu.classList.toggle('active');
  };

  // Highlight nav links according to current path
  function highlightCurrentNav() {
    const path = location.pathname.split('/').pop() || 'index.html';
    const pageName = path === '' || path === 'index.html' ? 'home' : path.replace('.html', '');
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href') || '';
      if (href.endsWith(pageName + '.html') || (pageName === 'home' && href.endsWith('index.html'))) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
    document.querySelectorAll('.mobile-link').forEach(link => {
      const href = link.getAttribute('href') || '';
      if (href.endsWith(pageName + '.html') || (pageName === 'home' && href.endsWith('index.html'))) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Contact form handling (AJAX-like UI only)
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      console.log('Form submitted:', data);

      // Show success message and hide form
      const container = document.getElementById('contactFormContainer');
      const success = document.getElementById('successMessage');
      if (container) container.classList.add('hidden');
      if (success) success.classList.remove('hidden');

      // Reset and restore UI after 3s (simulate async completion)
      setTimeout(() => {
        form.reset();
        if (container) container.classList.remove('hidden');
        if (success) success.classList.add('hidden');
      }, 3000);

      // NOTE: replace console.log with an actual fetch() to your backend or service (e.g. Netlify Functions, Zapier, Email API)
      // when ready. Keep UX consistent (disable submit while sending, show errors, etc).
    });
  }

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', function () {
    highlightCurrentNav();
    initContactForm();

    // Close mobile menu when clicking outside (optional)
    document.addEventListener('click', function (e) {
      const mobileMenu = document.getElementById('mobileMenu');
      const btn = document.querySelector('.mobile-menu-btn');
      if (!mobileMenu || !btn) return;
      if (!mobileMenu.classList.contains('active')) return;
      const insideMenu = mobileMenu.contains(e.target) || btn.contains(e.target);
      if (!insideMenu) mobileMenu.classList.remove('active');
    });
  });
})();
