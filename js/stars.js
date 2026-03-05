(function () {
  const container = document.querySelector('.stars');
  if (!container) return;

  const count = 120;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i++) {
    const star = document.createElement('span');
    star.className = 'star' + (Math.random() > 0.6 ? ' star--dim' : '');
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDuration = (2 + Math.random() * 3) + 's';
    star.style.animationDelay = Math.random() * 2 + 's';
    fragment.appendChild(star);
  }

  container.appendChild(fragment);
})();
