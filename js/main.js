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

  // Favicon: switch to black icon on light/white page backgrounds
  function parseRgb(colorString) {
    const match = colorString && colorString.match(/rgba?\(([^)]+)\)/i);
    if (!match) return null;
    const parts = match[1].split(',').map(function (p) { return Number(p.trim()); });
    if (parts.length < 3) return null;
    return { r: parts[0], g: parts[1], b: parts[2] };
  }

  function luminance(rgb) {
    const srgb = [rgb.r, rgb.g, rgb.b].map(function (v) {
      const c = v / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
  }

  function updateFaviconByBackground() {
    const icon = document.getElementById('site-favicon') || document.querySelector('link[rel="icon"]');
    if (!icon || !document.body) return;

    const bg = getComputedStyle(document.body).backgroundColor;
    const rgb = parseRgb(bg);
    if (!rgb) return;

    const isLightBackground = luminance(rgb) > 0.72;
    const targetHref = isLightBackground ? 'favicon-black.svg' : 'favicon.svg';
    icon.setAttribute('href', targetHref);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateFaviconByBackground);
  } else {
    updateFaviconByBackground();
  }

  window.addEventListener('pageshow', updateFaviconByBackground);

  if (document.body && 'MutationObserver' in window) {
    const observer = new MutationObserver(updateFaviconByBackground);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class', 'style']
    });
  }
})();