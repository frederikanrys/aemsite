export default async function decorate(block) {
  const rows = [...block.children];
  rows.forEach((row) => {
    const cells = [...row.children];
    // First cell = background image, second cell = text content
    // Structure is already correct from .plain.html:
    // cell[0] = picture/img (background), cell[1] = text content
    if (cells.length >= 2) {
      cells[0].classList.add('promo-cards-bg');
      cells[1].classList.add('promo-cards-content');
    }
  });
}
