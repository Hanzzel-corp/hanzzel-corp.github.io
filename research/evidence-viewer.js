/* Progressive enhancement for authentic GitHub images. Fallback: source link works without JS. */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('dialog[data-evidence-dialog]').forEach(dialog => {
    if (typeof dialog.showModal !== 'function') return;
    const scope = dialog.closest('article') || document;
    const image = dialog.querySelector('img[data-evidence-image]');
    const caption = dialog.querySelector('[data-evidence-caption]');
    const original = dialog.querySelector('a[data-evidence-source]');
    const close = dialog.querySelector('button[data-evidence-close]');
    if (!image || !original || !close) return;
    scope.querySelectorAll('a[data-evidence-zoom]').forEach(link => {
      link.classList.add('evidence-zoom');
      link.setAttribute('aria-haspopup', 'dialog');
      link.addEventListener('click', event => {
        const preview = link.querySelector('img');
        if (!preview) return;
        event.preventDefault();
        image.src = preview.currentSrc || preview.src;
        image.alt = preview.alt;
        const text = link.closest('figure')?.querySelector('figcaption')?.textContent?.trim();
        if (caption) caption.textContent = text || preview.alt;
        original.href = link.href;
        dialog.showModal();
      });
    });
    close.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener('close', () => {
      image.removeAttribute('src');
      image.alt = '';
      if (caption) caption.textContent = '';
    });
  });
});
