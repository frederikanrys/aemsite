export default async function decorate(block) {
  const rows = [...block.children];
  if (rows.length === 0) return;

  const row = rows[0];
  const cells = [...row.children];
  if (cells.length < 2) return;

  const leftCell = cells[0];
  const rightCell = cells[1];

  // --- Left Panel ---
  leftCell.classList.add('left-panel');

  // Find the quiz section (paragraphs after the list)
  const ul = leftCell.querySelector('ul');
  if (ul) {
    const quizDiv = document.createElement('div');
    quizDiv.classList.add('quiz-section');
    // Move all elements after the ul into quiz-section
    const siblings = [...leftCell.children];
    let afterList = false;
    siblings.forEach((child) => {
      if (child === ul) {
        afterList = true;
        return;
      }
      if (afterList) {
        quizDiv.append(child);
      }
    });
    if (quizDiv.children.length > 0) {
      leftCell.append(quizDiv);
    }
  }

  // --- Right Panel ---
  rightCell.classList.add('right-panel');

  // Get the children - first p is badge, second p is subtitle, rest are action cards
  const rightChildren = [...rightCell.children];
  const actionCards = [];

  rightChildren.forEach((child, index) => {
    if (index === 0) {
      // Badge: "Je bent aangemeld"
      const strong = child.querySelector('strong');
      if (strong) {
        const badgeDiv = document.createElement('div');
        badgeDiv.classList.add('badge');
        badgeDiv.textContent = strong.textContent;
        child.replaceWith(badgeDiv);
      }
    } else if (index === 1) {
      // Subtitle text
      child.classList.add('subtitle');
    } else {
      // Action cards with icon + text + chevron
      const link = child.querySelector('a');
      if (link) {
        const cardDiv = document.createElement('a');
        cardDiv.classList.add('action-card');
        cardDiv.href = link.href;

        const text = link.textContent.trim();
        // Remove emoji prefix (including surrogate pairs) and arrow suffix
        const cleanText = text
          .replace(/^[\u2600-\u27BF\uD83C-\uDBFF\uDC00-\uDFFF\u2699\uFE0F⚙💰❓]+\s*/u, '')
          .replace(/\s*→$/, '')
          .replace(/^\W+\s*/, '');

        // Determine icon based on content
        let iconSrc = '/drafts/images/icon-faq-assistent.svg';
        if (text.includes('⚙') || cleanText.includes('Beheer')) {
          iconSrc = '/drafts/images/icon-settings.svg';
        } else if (text.includes('💰') || cleanText.includes('korting')) {
          iconSrc = '/drafts/images/icon-promo-euro.svg';
        }

        cardDiv.innerHTML = `
          <img class="action-icon" src="${iconSrc}" alt="">
          <span class="action-text">${cleanText}</span>
          <span class="action-chevron">›</span>
        `;

        child.replaceWith(cardDiv);
      }
    }
  });
}
