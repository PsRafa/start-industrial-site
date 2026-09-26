const { chromium } = require('playwright');
const fs = require('fs');
const OUT = 'C:\\Users\\TJ-APP~1\\AppData\\Local\\Temp\\claude\\d--src-trampo-ja-backup\\c5d24138-89c9-4809-8de4-4a45a7469203\\scratchpad\\shots';
fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await chromium.launch();
  const errors = [];
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  page.on('pageerror', (err) => errors.push('pageerror: ' + err.message));
  await page.goto('http://localhost:8802/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2500);
  const height = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < height; y += 250) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(35);
  }
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}\\dc_mobile.png`, fullPage: true });
  console.log('saved dc_mobile.png');
  await browser.close();
  console.log('--- ERRORS ---');
  errors.forEach((e) => console.log(e));
  if (errors.length === 0) console.log('(nenhum erro fatal)');
})();
