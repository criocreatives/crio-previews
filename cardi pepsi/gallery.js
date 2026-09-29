(() => {
  const dialog = document.getElementById('viewer');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const links = Array.from(document.querySelectorAll('a[data-view-index]'));
  const items = [];
  links.forEach(link => {
    const index = Number(link.dataset.viewIndex);
    if (!items[index]) items[index] = {src: link.getAttribute('href'), title: link.dataset.title, alt: link.querySelector('img').alt};
  });
  const image = document.getElementById('viewer-image');
  const title = document.getElementById('viewer-title');
  const count = document.getElementById('viewer-count');
  const download = document.getElementById('viewer-download');
  let current = 0;
  let returnFocus;

  function show(index) {
    current = (index + items.length) % items.length;
    const item = items[current];
    image.src = item.src;
    image.alt = item.alt;
    title.textContent = item.title;
    count.textContent = `${String(current + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`;
    download.href = item.src;
    download.download = `Cardi-B-Pepsi-Tunnel-${String(current + 1).padStart(2, '0')}.jpg`;
  }

  links.forEach(link => link.addEventListener('click', event => {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    returnFocus = link;
    show(Number(link.dataset.viewIndex));
    dialog.showModal();
    document.body.classList.add('is-viewing');
  }));
  dialog.querySelector('.viewer-close').addEventListener('click', () => dialog.close());
  document.getElementById('viewer-prev').addEventListener('click', () => show(current - 1));
  document.getElementById('viewer-next').addEventListener('click', () => show(current + 1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      show(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('is-viewing');
    image.removeAttribute('src');
    if (returnFocus) returnFocus.focus({preventScroll: true});
  });
})();
