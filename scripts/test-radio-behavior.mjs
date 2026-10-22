#!/usr/bin/env node
/**
 * Pruebas de comportamiento con DOM simulado, sin dependencias ni navegador.
 * Ejecutar desde la raíz: node scripts/test-radio-behavior.mjs
 * No sustituye las pruebas visuales en Brave/Android del propietario.
 */
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

const script=readFileSync('assets/radio-v4.js','utf8');
const play='https://play.google.com/store/apps/details?id=cl.rancherasfacil.app';
let assertions=0;
function verify(condition,message){assert.ok(condition,message);assertions++}

function setup(search){
  const listeners=new Map();
  const makeElement=name=>{
    const events=new Map();
    return {
      name, inert:false,hidden:false,style:{},children:[],
      addEventListener(type,listener){events.set(type,listener)},
      removeEventListener(type){events.delete(type)},
      dispatch(type,event={}){const fn=events.get(type);assert.ok(fn,'Falta evento '+name+'.'+type);return fn(event)},
      focus(){document.activeElement=this},
      replaceChildren(...children){this.children=children},
      setAttribute(attr,value){this[attr]=value}
    };
  };
  const overlay=makeElement('overlay');overlay.hidden=true;
  const card=makeElement('card');
  const fallback=makeElement('fallback');
  const player=makeElement('player');
  const closeReel=makeElement('closeReel');
  const openReel=makeElement('openReel');
  const copyButton=makeElement('copy');
  const copyLabel=makeElement('copyLabel');copyLabel.textContent='Copiar enlace de la app';
  const download=makeElement('download');
  const closeDownload=makeElement('closeDownload');
  const browse=makeElement('browse');
  const header=makeElement('header');
  const main=makeElement('main');
  const footer=makeElement('footer');footer.inert=true; // Estado previo a respetar
  const sticky=makeElement('sticky');
  const copied=[];
  const ctas=['.hero','.install-dialog'].map(where=>({
    href:play,closest(sel){return sel===where?{}:null}
  }));
  const items={
    'reel-lightbox':overlay,'reel-player':player,'close-reel':closeReel,
    'copy':copyButton,'copy-label':copyLabel,'download-modal':download,
    'close-download':closeDownload,'keep-browsing':browse
  };
  const document={
    activeElement:null,body:{style:{overflow:'scroll'},children:[header,main,footer,sticky,overlay,download]},
    getElementById(id){return items[id]||null},
    querySelectorAll(selector){
      if(selector==='a[data-play-cta]')return ctas;
      if(selector==='[data-open-reel]')return [openReel];
      throw new Error('Unexpected selector '+selector)
    },
    createElement(tag){assert.equal(tag,'iframe');return makeElement('iframe')},
    addEventListener(type,fn){listeners.set(type,fn)},
    dispatch(type,event={}){return listeners.get(type)?.(event)}
  };
  overlay.querySelector=sel=>sel==='.reel-window'?card:sel==='.reel-fallback'?fallback:null;
  download.querySelectorAll=sel=>sel==='a'?[]:[];
  download.showModal=()=>{download.open=true};
  download.close=()=>{download.open=false};
  const window={
    location:{search},innerWidth:390,innerHeight:800,visualViewport:null,
    addEventListener(){},removeEventListener(){},
    setTimeout(fn){/* El resultado de copiar se deja visible en la prueba */ }
  };
  const navigator={clipboard:{writeText(text){copied.push(text);return Promise.resolve()}}};
  runInNewContext(script,{document,window,navigator,URL,URLSearchParams,console});
  return {overlay,card,player,openReel,closeReel,copyButton,copyLabel,
    download,browse,header,main,footer,sticky,document,window,ctas,copied};
}

const env=setup('?utm_source=facebook&utm_medium=organic_social&utm_campaign=lanzamiento');
const cta=new URL(env.ctas[0].href);
verify(cta.searchParams.get('utm_source')==='facebook','No preservó fuente de campaña');
verify(cta.searchParams.get('utm_medium')==='organic_social','No preservó medio');
verify(cta.searchParams.get('utm_campaign')==='lanzamiento','No preservó campaña');
verify(cta.searchParams.get('utm_content')==='hero','No identificó CTA del hero');
verify(new URL(env.ctas[1].href).searchParams.get('utm_content')==='modal','No identificó CTA modal');
verify(env.download.open===true,'Modal de descarga no abrió al iniciar');
env.browse.dispatch('click');
verify(env.download.open===false,'Modal de descarga no cerró');

env.openReel.dispatch('click');
verify(env.overlay.hidden===false,'El Reel no abrió');
verify(env.document.activeElement===env.closeReel,'El foco no entró al modal Reel');
verify(env.header.inert&&env.main.inert&&env.sticky.inert,'El fondo no quedó inerte');
verify(env.player.children.length===1,'El video no creó un iframe');
verify(env.player.children[0].src.includes('facebook.com/plugins/video.php'),'URL de Facebook incorrecta');
verify(env.window.document===undefined,'No se expuso un document innecesario');
verify(env.window.innerHeight>=parseInt(env.card.style.height,10),'Reel supera la ventana');
verify(env.document.body.style.overflow==='hidden','El fondo quedó desplazable');

env.closeReel.dispatch('click');
verify(env.overlay.hidden===true,'No cerró el Reel');
verify(env.header.inert===false&&env.main.inert===false,'No restauró el fondo');
verify(env.footer.inert===true,'No preservó el estado inert previo');
verify(env.document.body.style.overflow==='scroll','No restauró scroll');
verify(env.document.activeElement===env.openReel,'No devolvió el foco al botón inicial');

env.openReel.dispatch('click');
let escapePrevented=false;
env.document.dispatch('keydown',{key:'Escape',preventDefault(){escapePrevented=true}});
verify(escapePrevented&&env.overlay.hidden,'Escape no cerró el Reel');

env.copyButton.dispatch('click');
await Promise.resolve();
verify(env.copied.length===1&&env.copied[0]===play,'Copiar enlace usó otra URL');
verify(env.copyLabel.textContent==='¡Enlace copiado!','No anunció el resultado del copiado');

const invalid=setup('?utm_source=%3Cscript%3E&utm_medium=bad%20value&utm_campaign=x'.repeat(1));
const safe=new URL(invalid.ctas[0].href);
verify(safe.searchParams.get('utm_source')==='faappstudio','Fuente inválida no saneada');
verify(safe.searchParams.get('utm_medium')==='website','Medio inválido no saneado');
verify(safe.searchParams.get('utm_campaign')==='x','Campaña válida no mantenida');

console.log('✓ '+assertions+' comprobaciones de comportamiento aprobadas');
