const { chromium, webkit, devices } = require('playwright');
const path = require('path');
const fs = require('fs');
const OUT = path.join(__dirname, 'shots');
fs.mkdirSync(OUT, { recursive: true });
const URL = 'https://psrafa.github.io/start-industrial-site/';

async function check(engineName, engine, deviceName, deviceDescriptor) {
  const browser = await engine.launch();
  const context = await browser.newContext({ ...deviceDescriptor });
  const page = await context.newPage();
  const t0 = Date.now();
  await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 45000 });
  let mounted = true;
  await page.waitForFunction(() => {
    const r = document.getElementById('dc-root');
    return r && r.children.length > 0;
  }, { timeout: 20000 }).catch(() => { mounted = false; });
  const ms = Date.now() - t0;
  await page.screenshot({ path: `${OUT}/live_${engineName}_${deviceName}.png` });
  await browser.close();
  return { engineName, deviceName, mountMs: mounted ? ms : 'NAO MONTOU em 20s', mounted };
}

(async () => {
  const results = [];
  results.push(await check('chromium', chromium, 'iPhone13', devices['iPhone 13']));
  results.push(await check('webkit', webkit, 'iPhone13-safari', devices['iPhone 13']));
  results.push(await check('chromium', chromium, 'Pixel5', devices['Pixel 5']));
  console.log(JSON.stringify(results, null, 2));
})();
