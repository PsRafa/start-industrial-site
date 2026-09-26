const { chromium } = require('playwright');
const fs = require('fs');
const OUT = 'C:\\Users\\TJ-APP~1\\AppData\\Local\\Temp\\claude\\d--src-trampo-ja-backup\\c5d24138-89c9-4809-8de4-4a45a7469203\\scratchpad\\shots';
fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await chromium.launch();
  const errors = [];
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  page.on('console', (msg) => { if (msg.type() === 'error') errors.push('console: ' + msg.text()); });
  page.on('pageerror', (err) => errors.push('pageerror: ' + err.message));
  page.on('requestfailed', (req) => errors.push('requestfailed: ' + req.url() + ' — ' + req.failure()?.errorText));
  page.on('response', (res) => { if (res.status() >= 400) errors.push('HTTP ' + res.status() + ': ' + res.url()); });
  await page.goto('https://psrafa.github.io/start-industrial-site/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3500); // da tempo do React/Babel do CDN carregarem e montarem
  await page.screenshot({ path: `${OUT}\\dc_no_scroll.png`, fullPage: true });
  console.log('saved dc_no_scroll.png');

  // simula rolagem real de usuario, devagar, do topo ao fim
  const height = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < height; y += 300) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(40);
  }
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}\\dc_after_scroll.png`, fullPage: true });
  console.log('saved dc_after_scroll.png');
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);

  // testa clique num produto pra ver se o modal abre
  try {
    await page.click('#sistemas article', { timeout: 5000 });
    await page.waitForTimeout(800);
    await page.screenshot({ path: `${OUT}\\dc_modal.png`, fullPage: false });
    console.log('saved dc_modal.png');
  } catch (e) {
    errors.push('modal click failed: ' + e.message);
  }

  await browser.close();
  console.log('--- ERRORS ---');
  errors.forEach((e) => console.log(e));
  if (errors.length === 0) console.log('(nenhum erro)');
})();
