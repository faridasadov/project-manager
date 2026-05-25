import puppeteer from 'puppeteer';
const br = await puppeteer.launch({args:['--no-sandbox','--disable-setuid-sandbox']});
const page = await br.newPage();
await page.setViewport({width:1400,height:900});
await page.goto('http://localhost:3000');
await page.waitForSelector('#heroLoginBtn',{timeout:6000});
await page.click('#heroLoginBtn');
await new Promise(r=>setTimeout(r,1000));
await page.type('#loginUsername','adminklinika',{delay:40});
await page.type('#loginPassword','adminklinika123',{delay:40});
await page.evaluate(()=>{
  const forms = document.querySelectorAll('form');
  for(const f of forms){
    if(f.querySelector('#loginUsername')){
      const btn=f.querySelector('button[type=submit],button:last-of-type');
      if(btn) btn.click();
    }
  }
});
await new Promise(r=>setTimeout(r,3000));
await page.evaluate(()=>{ if(typeof setView==='function') setView('list'); });
await new Promise(r=>setTimeout(r,1200));

// close-up of control-strip
const stripInfo = await page.evaluate(()=>{
  const s = document.querySelector('.control-strip');
  if(!s) return null;
  const r = s.getBoundingClientRect();
  return {top:r.top,h:r.height,w:r.width,x:r.left};
});
console.log('strip:', JSON.stringify(stripInfo));
await page.screenshot({path:'/tmp/filter_closeup.png', clip:{
  x: stripInfo.x,
  y: stripInfo.top - 2,
  width: stripInfo.w,
  height: stripInfo.h + 4
}});
await br.close();
