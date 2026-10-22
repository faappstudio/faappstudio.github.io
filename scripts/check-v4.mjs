#!/usr/bin/env node
/**
 * FA App Studio · V4 smoke checks.
 * Run: node scripts/check-v4.mjs
 * Offline checks only; not a substitute for a11y/UX/mobile owner review.
 */
import {readFileSync, existsSync} from 'node:fs';
import {join} from 'node:path';
import {Script} from 'node:vm';

const root=process.cwd();
const load=path=>{
  const full=join(root,path);
  if(!existsSync(full)) throw new Error('Falta archivo requerido: '+path);
  return readFileSync(full,'utf8');
};
const company=load('index.html');
const radio=load('radio-mexico-de-siempre/index.html');
const radioCss=load('assets/radio-v4.css');
const companyCss=load('assets/studio-v4.css');
const radioJs=load('assets/radio-v4.js');
const catalog=JSON.parse(load('assets/products.json'));
const short=load('radio/index.html');
const privacy=load('privacy.html');
const stations=load('stations-live.json');
const appAds=load('app-ads.txt');

const approvedMessage=[
  '🇨🇱🤝🏻🇲🇽 🎶❤️ ¡Qué lindo es volver a escuchar esas rancheras que traen tantos recuerdos!',
  '',
  '📻 Radio México de Siempre, una app sencilla para disfrutar emisoras de rancheras, mariachi y música mexicana.',
  '',
  '💛 ¡Es GRATIS!',
  '',
  '📲 Descárgala aquí 👇',
  'https://play.google.com/store/apps/details?id=cl.rancherasfacil.app'
].join('\n');

let failures=0,passed=0;
function check(label, ok){
  if(ok){passed++;console.log('✓ '+label)}
  else{failures++;console.error('✗ '+label)}
}
const contains=(s,n)=>s.includes(n);
const waUrls=[...radio.matchAll(/https:\/\/wa\.me\/\?text=[^"]+/g)].map(m=>m[0]);
const whatsappMessages=waUrls.map(u=>decodeURIComponent(u.slice('https://wa.me/?text='.length)));
const ids=[...radio.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
const duplicatedIds=ids.filter((id,i)=>ids.indexOf(id)!==i);
const anchorRefs=[...radio.matchAll(/href="#([^"]+)"/g)].map(m=>m[1]);
const requiredProduct='cl.rancherasfacil.app';
const logo='/assets/fa-app-studio-logo.webp';
const reelURL='https://facebook.com/reel/1776460783652969';

check('Un único H1 en cada página', (company.match(/<h1\b/g)||[]).length===1&&(radio.match(/<h1\b/g)||[]).length===1);
check('Página corporativa con CSS V4',contains(company,'/assets/studio-v4.css')&&contains(companyCss,'.hero-art'));
check('Landing Radio con CSS V4',contains(radio,'/assets/radio-v4.css')&&contains(radioCss,'.reel-lightbox[hidden]'));
check('JavaScript de Radio enlazado',contains(radio,'src="/assets/radio-v4.js"'));
try{new Script(radioJs,{filename:'radio-v4.js'});check('JavaScript parseable',true)}
catch(e){check('JavaScript parseable: '+e.message,false)}
check('Tres botones WhatsApp con texto exacto',whatsappMessages.length===3&&whatsappMessages.every(x=>x===approvedMessage));
check('Play Store oficial en ambos sitios',company.includes(requiredProduct)&&radio.includes(requiredProduct));
check('Enlaces UTM conservados',radioJs.includes("utm_campaign")&&radioJs.includes("utm_content"));
check('Reel vertical independiente y enlace alternativo',radio.includes('id="reel-lightbox"')&&radio.includes(reelURL)&&radioJs.includes('function fit()'));
check('No se reintrodujo dialog nativo para Reel',!radio.includes('<dialog id="reel-dialog"'));
check('Modal de instalación y apertura inmediata',radio.includes('id="download-modal"')&&radioJs.includes('modal.showModal()'));
check('Controles de cierre de ambos visores',radio.includes('id="close-reel"')&&radio.includes('id="close-download"'));
check('Copiar enlace tiene controlador',radio.includes('id="copy-label"')&&radioJs.includes('clipboard.writeText'));
check('Sin IDs HTML duplicados',duplicatedIds.length===0);
check('Anclas internas existentes',anchorRefs.every(id=>ids.includes(id)));
check('Enlaces institucionales, soporte y privacidad',company.includes('mailto:faappstudio@gmail.com')&&radio.includes('href="/"')&&radio.includes('href="/privacy.html"'));
check('Catálogo extensible conectado',company.includes('id="future-apps"')&&company.includes('id="portfolio-next"')&&company.includes('/assets/catalog.js')&&catalog.products.some(p=>p.id==='radio-mexico-de-siempre'&&p.status==='published'));
check('Alias corto conserva navegación',short.includes('/radio-mexico-de-siempre/')&&short.includes('location.search+location.hash'));
check('Metadatos SEO diferenciados',company.includes('rel="canonical" href="https://faappstudio.github.io/"')&&radio.includes('rel="canonical" href="https://faappstudio.github.io/radio-mexico-de-siempre/"'));
check('Logo oficial disponible',existsSync(join(root,logo.slice(1))));
check('Documentos y archivos Android protegidos presentes',privacy.includes('Política de privacidad')&&stations.length>1000&&appAds.length>8);
check('Sin dependencias de fuentes externas',!companyCss.includes('@import')&&!radioCss.includes('@import'));
check('Movilidad y reducción de movimiento contempladas',radioCss.includes('@media(max-width:580px)')&&radioCss.includes('prefers-reduced-motion'));
console.log('\n'+passed+' controles aprobados; '+failures+' fallidos');
if(failures)process.exitCode=1;
