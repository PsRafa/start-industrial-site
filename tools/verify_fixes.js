const { chromium } = require('playwright');
const fs = require('fs');
const OUT = require('path').join(__dirname, 'shots');
fs.mkdirSync(OUT, { recursive: true });
const URL = 'http://localhost:8802/';

(async () => {
  const browser = await chromium.launch();
  const errors = [];
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  page.on('console', (msg) => { if (msg.type() === 'error') errors.push('console: ' + msg.text()); });
  page.on('pageerror', (err) => errors.push('pageerror: ' + err.message));
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForFunction(() => document.getElementById('dc-root')?.children.length > 0, { timeout: 15000 });
  await page.waitForTimeout(800);

  // 1) hero heading fits without hyphen-break, no huge font
  const hero = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    return { text: h1.innerText, fontSize: getComputedStyle(h1).fontSize, rectWidth: h1.getBoundingClientRect().width, scrollWidth: h1.scrollWidth };
  });
  console.log('HERO H1:', JSON.stringify(hero));

  // 2) aboutText renders (not undefined/blank)
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.55));
  await page.waitForTimeout(600);
  const aboutText = await page.evaluate(() => {
    const els = [...document.querySelectorAll('p')].filter(p => p.innerText.includes('Indústria de sistemas'));
    return els.length ? els[0].innerText : 'NOT FOUND';
  });
  console.log('ABOUT TEXT:', aboutText);

  // 3) sistemas grid - all product images fully visible (object-fit contain, no crop) + no pin-scroll leftover huge blank space
  await page.evaluate(() => document.getElementById('sistemas').scrollIntoView());
  await page.waitForTimeout(600);
  const sistemasInfo = await page.evaluate(() => {
    const sec = document.getElementById('sistemas');
    const arts = [...sec.querySelectorAll('article')];
    return { sectionHeight: sec.getBoundingClientRect().height, articleCount: arts.length };
  });
  console.log('SISTEMAS GRID:', JSON.stringify(sistemasInfo));
  await page.screenshot({ path: `${OUT}/verify_sistemas.png` });

  // 4) family click scrolls to #sistemas section correctly
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  try {
    await page.click('#familias article, #familias [onclick], #familias button, #familias div[style*="cursor:pointer"]', { timeout: 4000 }).catch(() => {});
  } catch (e) {}
  // fallback: find a "Ver sistemas" clickable inside familias
  const famClicked = await page.evaluate(() => {
    const sec = document.getElementById('familias');
    if (!sec) return false;
    const clickable = [...sec.querySelectorAll('*')].find(el => el.innerText && el.innerText.trim() === 'StartFlow');
    if (clickable) { clickable.click(); return true; }
    return false;
  });
  await page.waitForTimeout(900);
  const scrollAfterFamClick = await page.evaluate(() => window.scrollY);
  console.log('FAM CLICKED:', famClicked, 'SCROLL Y AFTER CLICK:', scrollAfterFamClick);

  // 5) modal open + prev/next buttons present and functional
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await page.click('#sistemas article', { timeout: 5000 });
  await page.waitForTimeout(600);
  const modalBtns = await page.evaluate(() => {
    const btns = [...document.querySelectorAll('button')].map(b => b.innerText.trim()).filter(t => t.includes('sistema'));
    return btns;
  });
  console.log('MODAL BUTTONS:', JSON.stringify(modalBtns));
  const nameBefore = await page.evaluate(() => document.querySelector('h3, h2')?.innerText || '');
  await page.screenshot({ path: `${OUT}/verify_modal.png` });
  // click "Próximo sistema"
  await page.evaluate(() => {
    const btn = [...document.querySelectorAll('button')].find(b => b.innerText.includes('Próximo'));
    if (btn) btn.click();
  });
  await page.waitForTimeout(500);
  // click "Sistema anterior" back
  await page.evaluate(() => {
    const btn = [...document.querySelectorAll('button')].find(b => b.innerText.includes('anterior'));
    if (btn) btn.click();
  });
  await page.waitForTimeout(500);
  console.log('PREV/NEXT click sequence executed without throwing');

  // 6) no horizontal overflow anywhere
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  console.log('HORIZONTAL OVERFLOW:', overflow);

  // 7) domain / Site card removed, no .com.br anywhere
  const bodyText = await page.evaluate(() => document.body.innerText);
  console.log('CONTAINS .com.br:', bodyText.includes('.com.br'));
  console.log('CONTAINS .ind.br:', bodyText.includes('.ind.br'));

  await browser.close();
  console.log('--- ERRORS ---');
  errors.forEach((e) => console.log(e));
  if (errors.length === 0) console.log('(nenhum erro de console/página)');
})();
