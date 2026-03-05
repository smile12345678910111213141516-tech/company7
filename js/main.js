(function () {
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  // Set active nav link based on current page (works with file:// and http(s)://)
  const path = (window.location.pathname || window.location.href).replace(/\/$/, '');
  const isHome = !path || path === '' || path.endsWith('index.html') || path.endsWith('/');
  const isAbout = path.indexOf('about') !== -1;
  const isContact = path.indexOf('contact') !== -1;

  document.querySelectorAll('.navbar__links a').forEach(function (a) {
    const href = (a.getAttribute('href') || '').toLowerCase();
    const active =
      (isHome && (href === '' || href === '/' || href === 'index.html')) ||
      (isAbout && href.indexOf('about') !== -1) ||
      (isContact && href.indexOf('contact') !== -1);
    if (active) {
      a.classList.add('active');
      a.setAttribute('aria-current', 'page');
    }
  });

  // Mobile nav toggle
  const nav = document.querySelector('.navbar__nav');
  const toggle = document.querySelector('.navbar__toggle');
  if (nav && toggle) {
    toggle.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('is-open');
      toggle.classList.toggle('navbar__toggle--open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Scroll-triggered animations: reveal elements when they enter viewport
  const animated = document.querySelectorAll('.animate-on-scroll');
  if (animated.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { rootMargin: '0px 0px -60px 0px', threshold: 0.1 }
    );
    animated.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    animated.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }
  (function () {
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });

  // Mobile nav toggle
  const nav = document.querySelector('.navbar__nav');
  const toggle = document.querySelector('.navbar__toggle');
  
  if (nav && toggle) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('is-open');
      // Simple animation for the hamburger bars could go here
    });
  }
})();
})();
