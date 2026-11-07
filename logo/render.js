const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const svg = require('fs').readFileSync('sharingan.svg','utf8');
  for (const s of [512,112,56,28]) {
    const p = await b.newPage({viewport:{width:s,height:s}});
    await p.setContent(`<body style="margin:0;background:transparent"><div style="width:${s}px;height:${s}px">${svg.replace('width="512" height="512"','width="100%" height="100%"')}</div></body>`);
    await p.screenshot({path: s===512?'kanalpunkte-512.png':`kanalpunkte-${s}.png`, omitBackground:true});
  }
  await b.close();
})();
