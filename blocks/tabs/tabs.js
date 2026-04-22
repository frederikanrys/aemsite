export default async function decorate(block) {
  const rows = [...block.children];

  // Group rows by tab label (cell 0 text)
  const tabMap = new Map();
  rows.forEach((row) => {
    const cells = [...row.children];
    const label = cells[0]?.textContent.trim();
    if (!label) return;
    if (!tabMap.has(label)) tabMap.set(label, []);
    tabMap.get(label).push({ imageCell: cells[1], textCell: cells[2] });
  });

  // Clear block
  block.textContent = '';

  // Build tab menu
  const menu = document.createElement('ul');
  menu.className = 'tabs-menu';
  menu.setAttribute('role', 'tablist');

  const panels = [];
  let first = true;

  tabMap.forEach((cards, label) => {
    const id = label.toLowerCase().replace(/\s+/g, '-');

    // Tab button
    const li = document.createElement('li');
    li.setAttribute('role', 'presentation');
    const btn = document.createElement('button');
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', first ? 'true' : 'false');
    btn.setAttribute('aria-controls', `panel-${id}`);
    btn.id = `tab-${id}`;
    btn.textContent = label;
    li.append(btn);
    menu.append(li);

    // Tab panel
    const panel = document.createElement('div');
    panel.className = `tabs-panel${first ? ' is-active' : ''}`;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', `tab-${id}`);
    panel.id = `panel-${id}`;

    cards.forEach(({ imageCell, textCell }) => {
      const card = document.createElement('div');
      card.className = 'tabs-card';

      // Image
      const imgWrap = document.createElement('div');
      imgWrap.className = 'tabs-card-image';
      const pic = imageCell?.querySelector('picture');
      if (pic) imgWrap.append(pic);
      card.append(imgWrap);

      // Body
      const body = document.createElement('div');
      body.className = 'tabs-card-body';

      if (textCell) {
        const paragraphs = [...textCell.querySelectorAll('p')];
        const h3 = textCell.querySelector('h3');

        // First <p> = tag
        if (paragraphs[0]) {
          const tag = document.createElement('span');
          tag.className = 'tabs-tag';
          tag.textContent = paragraphs[0].textContent.trim();
          body.append(tag);
        }

        // h3 = title
        if (h3) {
          const title = document.createElement('h3');
          title.textContent = h3.textContent.trim();
          body.append(title);
        }

        // Second <p> = description
        if (paragraphs[1]) {
          const desc = document.createElement('p');
          desc.className = 'tabs-desc';
          desc.textContent = paragraphs[1].textContent.trim();
          body.append(desc);
        }
      }

      card.append(body);
      panel.append(card);
    });

    panels.push(panel);
    first = false;
  });

  block.append(menu);
  panels.forEach((p) => block.append(p));

  // Tab switching
  menu.addEventListener('click', (e) => {
    const btn = e.target.closest('button[role="tab"]');
    if (!btn) return;

    menu.querySelectorAll('button[role="tab"]').forEach((b) => {
      b.setAttribute('aria-selected', 'false');
    });
    btn.setAttribute('aria-selected', 'true');

    block.querySelectorAll('.tabs-panel').forEach((p) => {
      p.classList.remove('is-active');
    });
    const target = block.querySelector(`#${btn.getAttribute('aria-controls')}`);
    if (target) target.classList.add('is-active');
  });
}
