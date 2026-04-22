export default async function decorate(block) {
  const rows = [...block.children];
  rows.forEach((row) => {
    const cells = [...row.children];
    // First cell = image (background), second cell = text content
    // The CSS handles positioning via absolute/relative
    if (cells.length >= 2) {
      cells[0].setAttribute('aria-hidden', 'true');
    }
  });
}
