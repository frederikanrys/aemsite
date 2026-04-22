export default async function decorate(block) {
  const rows = [...block.children];
  rows.forEach((row) => {
    // Each row is a card: first cell = image, second cell = body
    const cells = [...row.children];
    if (cells.length >= 2) {
      // Make the card link from the last link in the body
      const bodyCell = cells[cells.length - 1];
      const links = bodyCell.querySelectorAll('a');
      if (links.length > 0) {
        const lastLink = links[links.length - 1];
        const href = lastLink.href;

        // Wrap the entire row in a clickable link
        const wrapper = document.createElement('a');
        wrapper.href = href;
        wrapper.className = 'articles-card-link';
        wrapper.style.textDecoration = 'none';
        wrapper.style.color = 'inherit';
        wrapper.style.display = 'contents';

        row.parentNode.insertBefore(wrapper, row);
        wrapper.appendChild(row);
      }
    }
  });
}
