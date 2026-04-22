export default async function decorate(block) {
  const rows = [...block.children];
  rows.forEach((row) => {
    const questionCell = row.children[0];
    if (!questionCell) return;

    questionCell.addEventListener('click', () => {
      const isOpen = row.classList.contains('open');
      // Close all other items
      rows.forEach((r) => r.classList.remove('open'));
      // Toggle current
      if (!isOpen) {
        row.classList.add('open');
      }
    });
  });
}
