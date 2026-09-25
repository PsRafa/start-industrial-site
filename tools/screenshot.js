const { chromium } = require('playwright');

const OUT = process.env.SHOT_DIR || 'C:\\Users\\TJ-APP~1\\AppData\\Local\\Temp\\claude\\d--src-trampo-ja-backup\\c5d24138-89c9-4809-8de4-4a45a7469203\\scratchpad\\shots';
const fs = require('fs');
fs.mkdirSync(OUT, { recursive: true });

const pages = [
  { url: 'https://psrafa.github.io/start-industrial-site/', name: 'home' },
  { url: 'https://psrafa.github.io/start-industrial-site/produtos.html', name: 'produtos' },
];

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];

(async () => {
  const browser = await chromium.launch();
  const errors = [];
  for (const vp of viewports) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    for (const p of pages) {
      const page = await context.newPage();
      page.on('console', (msg) => {
        if (msg.type() === 'error') errors.push(`[${p.name}/${vp.name}] console: ${msg.text()}`);
      });
      page.on('pageerror', (err) => errors.push(`[${p.name}/${vp.name}] pageerror: ${err.message}`));
      page.on('requestfailed', (req) => errors.push(`[${p.name}/${vp.name}] requestfailed: ${req.url()} — ${req.failure()?.errorText}`));
      await page.goto(p.url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(500);
      // simula scroll real do usuario pra disparar o IntersectionObserver de .reveal
      await page.evaluate(async () => {
        const step = 400;
        const height = document.body.scrollHeight;
        for (let y = 0; y < height; y += step) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 60));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(500);
      const file = `${OUT}\\${p.name}_${vp.name}.png`;
      await page.screenshot({ path: file, fullPage: true });
      console.log('saved', file);
      await page.close();
    }
    await context.close();
  }
  await browser.close();
  console.log('--- ERRORS ---');
  errors.forEach((e) => console.log(e));
  if (errors.length === 0) console.log('(nenhum erro de console/rede detectado)');
})();
