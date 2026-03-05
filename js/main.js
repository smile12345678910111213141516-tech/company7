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
    if (active) a.classList.add('active');
  });
})();
