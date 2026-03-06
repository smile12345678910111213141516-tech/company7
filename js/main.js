(function () {
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  // Active nav states
  const path = (window.location.pathname || window.location.href).toLowerCase().replace(/\/$/, '');
  const isHome = !path || path.endsWith('index.html') || path.endsWith('/');
  const isAbout = path.includes('about');
  const isContact = path.includes('contact');

  document.querySelectorAll('.navbar__links a').forEach(function (a) {
    const href = (a.getAttribute('href') || '').toLowerCase();
    const active =
      (isHome && (href === '' || href === '/' || href === 'index.html')) ||
      (isAbout && href.includes('about'));
    if (active) {
      a.classList.add('active');
      a.setAttribute('aria-current', 'page');
    }
  });

  const contactBtn = document.querySelector('.btn--nav[href*="contact"]');
  if (contactBtn && isContact) {
    contactBtn.classList.add('active');
    contactBtn.setAttribute('aria-current', 'page');
  }

  // Scroll-triggered reveal
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
      { rootMargin: '0px 0px -50px 0px', threshold: 0.1 }
    );

    animated.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    animated.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }
})();