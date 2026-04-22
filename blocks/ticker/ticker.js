export default async function decorate(block) {
  // Extract the text content from the single row/cell
  const cell = block.querySelector('div > div');
  if (!cell) return;

  const text = cell.textContent.trim();
  // Parse items separated by · (middle dot)
  const items = text.split('·').map((s) => s.trim()).filter(Boolean);

  // Build the ticker track with duplicated items for seamless loop
  const track = document.createElement('div');
  track.className = 'ticker-track';

  function appendItems() {
    items.forEach((item, i) => {
      const span = document.createElement('span');
      span.textContent = item;
      track.appendChild(span);

      // Add separator after each item (including last, for seamless loop)
      const sep = document.createElement('span');
      sep.className = 'ticker-sep';
      sep.textContent = '·';
      track.appendChild(sep);
    });
  }

  // Two copies for seamless scrolling
  appendItems();
  appendItems();

  // Replace block content
  block.textContent = '';
  block.setAttribute('aria-hidden', 'true');
  block.appendChild(track);
}
