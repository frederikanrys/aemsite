export default async function decorate(block) {
  const rows = [...block.children];
  // Row 0 = heading + description
  // Rows 1-3 = icon + label link cards

  // Build a cards container for rows 1+
  const cardsContainer = document.createElement('div');
  cardsContainer.className = 'help-links-cards';

  rows.forEach((row, i) => {
    if (i === 0) return; // keep heading row as-is

    const cells = [...row.children];
    // cell 0 = icon image, cell 1 = link text
    const imgEl = cells[0]?.querySelector('img');
    const linkEl = cells[1]?.querySelector('a');

    if (imgEl && linkEl) {
      const card = document.createElement('a');
      card.className = 'help-links-card';
      card.href = linkEl.href;

      const icon = document.createElement('img');
      icon.src = imgEl.src;
      icon.alt = imgEl.alt || '';
      icon.width = 40;
      icon.height = 40;

      const label = document.createElement('span');
      label.className = 'help-links-label';
      label.textContent = linkEl.textContent;

      card.append(icon, label);
      cardsContainer.append(card);
    }

    row.remove();
  });

  block.append(cardsContainer);
}
