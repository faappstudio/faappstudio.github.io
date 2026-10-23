#!/usr/bin/env node
/* V5 design review snapshots. Intentional design review, not automated score. */
import {chromium} from 'playwright-core';
import {mkdirSync} from 'node:fs';
const dir='audit-results/v5';
mkdirSync(dir,{recursive:true});
const browser=await chromium.launch({executablePath:process.env.CHROME_BINARY||'/usr/bin/google-chrome',
  headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
try{
  const cases=[
    {name:'studio-desktop',url:'https://faappstudio.github.io/',width:1440,height:900},
    {name:'studio-mobile',url:'https://faappstudio.github.io/',width:390,height:844,mobile:true},
    {name:'radio-desktop',url:'https://faappstudio.github.io/radio-mexico-de-siempre/',width:1440,height:900},
    {name:'radio-mobile',url:'https://faappstudio.github.io/radio-mexico-de-siempre/',width:390,height:844,mobile:true}
  ];
  for(const c of cases){
    const context=await browser.newContext({
      viewport:{width:c.width,height:c.height},deviceScaleFactor:1,isMobile:!!c.mobile,hasTouch:!!c.mobile,locale:'es-CL'
    });
    const page=await context.newPage();
    try{
      await page.goto(c.url,{waitUntil:'domcontentloaded',timeout:45000});
      await page.evaluate(()=>document.fonts.ready);
      await page.waitForTimeout(850);
      if(c.name.startsWith('radio')){
        const dialog=page.locator('#download-modal');
        if(await dialog.evaluate(el=>el.open)){await page.locator('#close-download').click()}
      }
      await page.screenshot({path:dir+'/'+c.name+'-hero.jpg',type:'jpeg',quality:86});
      await page.screenshot({path:dir+'/'+c.name+'-full.jpg',type:'jpeg',quality:75,fullPage:true});
      if(c.name.startsWith('radio')){
        await page.locator('#vistas').scrollIntoViewIfNeeded();
        await page.screenshot({path:dir+'/'+c.name+'-gallery.jpg',type:'jpeg',quality:86});
        await page.locator('[data-open-reel]').first().click();
        await page.waitForTimeout(1400);
        await page.screenshot({path:dir+'/'+c.name+'-video.jpg',type:'jpeg',quality:82});
        await page.keyboard.press('Escape');
      }
      const metrics=await page.evaluate(()=>({
        scroll:document.documentElement.scrollWidth,
        viewport:window.innerWidth,
        font:getComputedStyle(document.querySelector('h1')).fontFamily,
        h1:getComputedStyle(document.querySelector('h1')).fontSize,
        images:[...document.querySelectorAll('img')].filter(x=>x.closest('main')).map(x=>({
          width:x.naturalWidth,height:x.naturalHeight,displayed:x.getBoundingClientRect().width,
          alt:x.alt.slice(0,70)
        })).slice(0,8)
      }));
      console.log(JSON.stringify({name:c.name,metrics}));
    }finally{await context.close()}
  }
}finally{await browser.close()}
