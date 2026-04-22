export default async function decorate(block) {
  // Hero block: single row with one cell containing heading, text, and CTA
  // No restructuring needed — the content structure maps directly to the layout
  const rows = [...block.children];
  rows.forEach((row) => {
    const cells = [...row.children];
    cells.forEach((cell) => {
      cell.classList.add('hero-content');
    });
  });
}
