#!/usr/bin/env node
/**
 * V4 browser interaction checks. No screenshots or subjective visual QA.
 * Run with Node 22 + playwright-core and system Chrome from repository root.
 */
import assert from 'node:assert/strict';
import {chromium} from 'playwright-core';

const BASE='https://faappstudio.github.io/';
const RADIO=BASE+'radio-mexico-de-siempre/';
let passed=0;
const results=[];
function check(condition,label){
  assert.ok(condition,label);
  passed++;
  results.push('✓ '+label);
}

const browser=await chromium.launch({
  executablePath:process.env.CHROME_BINARY||'/usr/bin/google-chrome',
  headless:true,
  args:['--no-sandbox','--disable-dev-shm-usage']
});
try{
  const cases=[
    {label:'mobile 360',width:360,height:780,mobile:true},
    {label:'mobile 390',width:390,height:844,mobile:true},
    {label:'portrait desktop-mode 980',width:980,height:1600,mobile:true},
    {label:'desktop 1440',width:1440,height:900,mobile:false}
  ];
  for(const view of cases){
    const context=await browser.newContext({
      viewport:{width:view.width,height:view.height},
      isMobile:view.mobile,
      hasTouch:view.mobile,
      deviceScaleFactor:view.mobile?2:1,
      locale:'es-CL'
    });
    try{
      const page=await context.newPage();
      await page.goto(BASE,{waitUntil:'domcontentloaded',timeout:45000});
      await page.locator('#hero-title').waitFor({timeout:15000});
      const studio=await page.evaluate(()=>({
        overflow:document.documentElement.scrollWidth-window.innerWidth,
        h1:document.querySelectorAll('h1').length,
        css:Array.from(document.styleSheets).some(s=>(s.href||'').includes('studio-v4.css'))
      }));
      check(studio.h1===1&&studio.css,'Corporativa carga la hoja V4 en '+view.label);
      check(studio.overflow<=2,'Corporativa sin desbordamiento horizontal en '+view.label+
        ' (diferencia '+studio.overflow+'px)');

      await page.goto(RADIO,{waitUntil:'domcontentloaded',timeout:45000});
      await page.waitForFunction(()=>document.getElementById('download-modal')?.open===true,null,{timeout:15000});
      check(await page.locator('#download-modal').evaluate(el=>el.open),'Popup inicial en '+view.label);
      await page.locator('#close-download').click();
      check(!(await page.locator('#download-modal').evaluate(el=>el.open)),
        'Popup cierra en '+view.label);

      const radio=await page.evaluate(()=>({
        overflow:document.documentElement.scrollWidth-window.innerWidth,
        css:Array.from(document.styleSheets).some(s=>(s.href||'').includes('radio-v4.css'))
      }));
      check(radio.css,'Radio usa CSS V4 en '+view.label);
      check(radio.overflow<=2,'Radio sin desbordamiento horizontal en '+view.label+
        ' (diferencia '+radio.overflow+'px)');

      const trigger=page.locator('[data-open-reel]').first();
      await trigger.click();
      const geometry=await page.evaluate(()=>{
        const overlay=document.getElementById('reel-lightbox');
        const card=overlay.querySelector('.reel-window');
        const player=document.getElementById('reel-player');
        const frame=player.querySelector('iframe');
        const c=card.getBoundingClientRect(),p=player.getBoundingClientRect();
        return {
          hidden:overlay.hidden,
          cardW:c.width,cardH:c.height,videoW:p.width,videoH:p.height,
          viewportW:window.innerWidth,viewportH:window.innerHeight,
          focused:document.activeElement?.id,
          inert:document.querySelector('.site-header')?.inert,
          frame:frame?.src||''
        };
      });
      check(!geometry.hidden&&geometry.frame.includes('facebook.com/plugins/video.php'),
        'Reel abre video oficial en '+view.label);
      check(geometry.focused==='close-reel'&&geometry.inert===true,
        'Reel conserva foco y bloquea fondo en '+view.label);
      check(Math.abs(geometry.videoW/geometry.videoH-9/16)<.012,
        'Reel mantiene aspecto 9:16 en '+view.label);
      check(Math.abs(geometry.cardH-geometry.videoH-100)<=3,
        'Reel sin altura vacía adicional en '+view.label);
      check(geometry.cardH<=geometry.viewportH-8&&geometry.cardW<=geometry.viewportW,
        'Reel cabe en la pantalla en '+view.label);

      await page.keyboard.press('Escape');
      const restored=await page.evaluate(()=>({
        closed:document.getElementById('reel-lightbox').hidden,
        inert:document.querySelector('.site-header').inert,
        focus:document.activeElement?.hasAttribute('data-open-reel')
      }));
      check(restored.closed&&!restored.inert&&restored.focus,
        'Escape cierra Reel y restaura foco en '+view.label);
    }finally{await context.close()}
  }

  const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  try{
    const page=await context.newPage();
    await page.goto(BASE+'radio/?utm_source=facebook&utm_medium=organic_social&utm_campaign=radio_test',
      {waitUntil:'domcontentloaded',timeout:45000});
    await page.locator('#hero-title').waitFor();
    const url=new URL(page.url());
    check(url.pathname==='/radio-mexico-de-siempre/'&&
      url.searchParams.get('utm_campaign')==='radio_test','/radio/ conserva redirección y campaña');
    const cta=new URL(await page.locator('.hero a[data-play-cta]').first().getAttribute('href'));
    check(cta.searchParams.get('utm_source')==='facebook'&&
      cta.searchParams.get('utm_campaign')==='radio_test',
      'CTA Google Play conserva el origen de la campaña');
  }finally{await context.close()}

  console.log(results.join('\n'));
  console.log('\n✓ '+passed+' comprobaciones con Chrome real aprobadas');
}finally{
  await browser.close();
}
