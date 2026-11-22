/* Independent mobile navigation: original site scripts and animations unchanged. */
document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('.mobile-nav');
  if (!menu) return;

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => { menu.open = false; });
  });

  menu.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.open) {
      menu.open = false;
      menu.querySelector('summary')?.focus();
    }
  });

  document.addEventListener('pointerdown', event => {
    if (menu.open && !menu.contains(event.target)) menu.open = false;
  });

  window.matchMedia('(min-width: 769px)').addEventListener('change', event => {
    if (event.matches) menu.open = false;
  });
});
