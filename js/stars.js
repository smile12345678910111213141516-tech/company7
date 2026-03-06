(function () {
  const container = document.querySelector('.stars');
  if (!container) return;

  const NAVBAR_SAFE_TOP_PX = 74;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function getStarCount() {
    const area = window.innerWidth * window.innerHeight;
    if (area < 380000) return 55;   // small phones
    if (area < 900000) return 90;   // tablets/laptops
    return 125;                     // desktops
  }

  function buildStars() {
    container.textContent = '';
    const count = getStarCount();
    const fragment = document.createDocumentFragment();

    // Keep stars out of navbar area
    const safeTopPct = Math.min(20, (NAVBAR_SAFE_TOP_PX / window.innerHeight) * 100 + 1);

    for (let i = 0; i < count; i++) {
      const star = document.createElement('span');
      const isDim = Math.random() > 0.62;
      star.className = 'star' + (isDim ? ' star--dim' : '');

      star.style.left = rand(0, 100) + '%';
      star.style.top = rand(safeTopPct, 100) + '%';

      if (prefersReducedMotion) {
        star.style.animation = 'none';
        star.style.opacity = isDim ? '0.4' : '0.75';
      } else {
        // Slight variation looks more natural
        const twinkleDuration = isDim ? rand(3.5, 5.5) : rand(2.1, 4.2);
        const driftDuration = isDim ? rand(28, 42) : rand(20, 34);

        star.style.animationDuration = twinkleDuration + 's, ' + driftDuration + 's';
        star.style.animationDelay = rand(0, 2.5) + 's, ' + rand(0, 2.5) + 's';
      }

      fragment.appendChild(star);
    }

    container.appendChild(fragment);
  }

  function debounce(fn, wait) {
    let t;
    return function () {
      clearTimeout(t);
      t = setTimeout(fn, wait);
    };
  }

  buildStars();
  window.addEventListener('resize', debounce(buildStars, 180));
})();