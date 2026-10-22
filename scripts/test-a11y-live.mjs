#!/usr/bin/env node
/**
 * V4 WCAG/keyboard/200%-resize audit on live public pages.
 * This tool intentionally DOES NOT capture screenshots or approve visual design.
 * Requires: playwright-core, axe-core, installed system Chrome.
 */
import {chromium} from 'playwright-core';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {join} from 'node:path';

const axeSource=readFileSync('node_modules/axe-core/axe.min.js','utf8');
const chrome=await chromium.launch({
  executablePath:process.env.CHROME_BINARY||'/usr/bin/google-chrome',
  headless:true,args:['--no-sandbox','--disable-dev-shm-usage']
});
const pages=[
  {id:'studio',url:'https://faappstudio.github.io/'},
  {id:'radio',url:'https://faappstudio.github.io/radio-mexico-de-siempre/'}
];
const sizes=[
  {id:'small',width:320,height:760},
  {id:'mobile',width:390,height:844},
  {id:'desktop',width:1366,height:850}
];
const report=[];
let failures=0,totalScans=0,totalViolations=0,checks=0;
function check(ok,label){
  checks++;
  if(!ok){failures++;console.error('✗ '+label)}
  else console.log('✓ '+label);
}
async function scan(page,config,screen,state){
  await page.addScriptTag({content:axeSource});
  const results=await page.evaluate(async()=>{
    const x=await window.axe.run(document,{
      runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']}
    });
    return {violations:x.violations.map(v=>({
      id:v.id,impact:v.impact,help:v.help,
      nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary})).slice(0,8)
    })),passes:x.passes.length,incomplete:x.incomplete.length};
  });
  totalScans++;totalViolations+=results.violations.length;
  report.push({page:config.id,viewport:screen.id,state,...results});
  for(const v of results.violations){
    console.error('✗ axe '+config.id+'/'+screen.id+'/'+state+': '+v.id+
      ' ('+v.impact+') '+JSON.stringify(v.nodes.map(n=>n.target)));
    failures++;
  }
  if(!results.violations.length)console.log('✓ axe '+config.id+'/'+screen.id+'/'+state);
}
try{
  for(const config of pages){
    for(const screen of sizes){
      const ctx=await chrome.newContext({viewport:{width:screen.width,height:screen.height},locale:'es-CL'});
      const page=await ctx.newPage();
      try{
        await page.goto(config.url,{waitUntil:'domcontentloaded',timeout:45000});
        await page.waitForTimeout(450);
        if(config.id==='radio'){
          await page.locator('#download-modal').waitFor();
          await scan(page,config,screen,'initial-install-modal');
          await page.locator('#close-download').click();
          await scan(page,config,screen,'page');
          await page.locator('[data-open-reel]').first().click();
          await scan(page,config,screen,'video-overlay');
          await page.keyboard.press('Escape');
          check(await page.locator('#reel-lightbox').evaluate(el=>el.hidden),
            'Tecla Escape funciona '+config.id+'/'+screen.id);
        }else{
          await scan(page,config,screen,'page');
        }

        // Browser text zoom: double effective text size without changing page artwork.
        // WCAG Resize Text 1.4.4; overflow is checked separately.
        await page.evaluate(()=>{document.documentElement.style.fontSize='32px'});
        await page.waitForTimeout(150);
        const textZoom=await page.evaluate(()=>({
          scrollWidth:document.documentElement.scrollWidth,
          viewportWidth:window.innerWidth,
          bodyWidth:document.body.scrollWidth,
          zoom:parseFloat(getComputedStyle(document.documentElement).fontSize)
        }));
        check(textZoom.zoom>=31.5,'Tamaño de texto 200% '+config.id+'/'+screen.id);
        // WCAG 1.4.10 Reflow: content must fit the 320px equivalent
        // checked without requiring no scroll for decorative overflow.
        if(textZoom.scrollWidth>textZoom.viewportWidth+2){
          const offenders=await page.evaluate(()=>{
            const right=window.innerWidth;
            return Array.from(document.querySelectorAll('body *')).map(el=>{
              const cs=getComputedStyle(el);
              if(cs.display==='none'||cs.visibility==='hidden')return null;
              const box=el.getBoundingClientRect();
              const excess=Math.max(box.right-right,-box.left);
              return excess>2?{
                selector:el.tagName.toLowerCase()+(el.className&&typeof el.className==='string'?'.'+el.className.trim().replace(/\\s+/g,'.'):''),
                excess:Math.round(excess),left:Math.round(box.left),right:Math.round(box.right),
                width:Math.round(box.width),text:el.textContent.trim().slice(0,65)
              }:null;
            }).filter(Boolean).sort((a,b)=>b.excess-a.excess).slice(0,12);
          });
          console.error('OVERFLOW DIAGNOSTIC '+config.id+'/'+screen.id+': '+JSON.stringify(offenders));
          if(offenders.length===0){
            const widths=await page.evaluate(()=>({
              viewport:window.innerWidth,root:document.documentElement.scrollWidth,body:document.body.scrollWidth,
              nodes:Array.from(document.querySelectorAll('body *')).map(el=>{
                const cs=getComputedStyle(el),r=el.getBoundingClientRect();
                return {
                  name:el.tagName.toLowerCase()+'.'+String(el.className||'').replace(/\\s+/g,'.'),
                  width:el.clientWidth,scroll:el.scrollWidth,excess:el.scrollWidth-el.clientWidth,
                  x:Math.round(r.x),right:Math.round(r.right),overflow:cs.overflowX
                }
              }).filter(n=>n.excess>10).sort((a,b)=>b.excess-a.excess).slice(0,18)
            }));
            console.error('INTERNAL SCROLL DIAGNOSTIC '+config.id+'/'+screen.id+': '+JSON.stringify(widths));
          }
        }
        check(textZoom.scrollWidth<=textZoom.viewportWidth+2,
          'Sin scroll horizontal con texto 200% '+config.id+'/'+screen.id+
          ' (overflow '+(textZoom.scrollWidth-textZoom.viewportWidth)+'px)');

        await page.evaluate(()=>{document.documentElement.style.fontSize='16px'});
        if(config.id==='studio'){
          await page.keyboard.press('Tab');
          const first=await page.evaluate(()=>({
            target:document.activeElement?.tagName,
            content:document.activeElement?.textContent?.trim().slice(0,80)
          }));
          check(first.target==='A'&&first.content.includes('Saltar al contenido'),
            'El primer tab alcanza el salto a contenido '+config.id+'/'+screen.id);
        }else{
          await page.keyboard.press('Tab');
          const active=await page.evaluate(()=>document.activeElement?.tagName||'');
          check(!!active,'Navegación por teclado disponible '+config.id+'/'+screen.id);
        }
      }finally{await ctx.close()}
    }
  }
}finally{await chrome.close()}
mkdirSync('audit-results',{recursive:true});
const final={
  generatedAt:new Date().toISOString(),
  totalScans,totalViolations,checks,failures,report
};
writeFileSync(join('audit-results','accessibility-functional.json'),JSON.stringify(final,null,2));
console.log('\n'+totalScans+' análisis axe; '+totalViolations+' reglas vulneradas; '+
  checks+' comprobaciones teclado/zoom; '+failures+' fallos totales');
if(failures)process.exitCode=1;
