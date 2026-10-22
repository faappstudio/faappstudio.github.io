/* Catálogo corporativo: el producto principal queda en HTML para SEO y acceso sin JS.
   Agrega futuras aplicaciones publicadas a /assets/products.json. */
(function(){
  'use strict';
  var target=document.getElementById('future-apps');
  if(!target||!window.fetch)return;
  function node(tag,cls,txt){
    var e=document.createElement(tag);
    if(cls)e.className=cls;
    if(typeof txt==='string')e.textContent=txt;
    return e;
  }
  function localPath(p){return typeof p==='string'&&/^\/[a-z0-9_\/-]+\/$/i.test(p)?p:null}
  function officialStore(s){
    if(typeof s!=='string')return null;
    try{var u=new URL(s);return u.protocol==='https:'&&['play.google.com','apps.apple.com'].includes(u.hostname)?u.href:null}catch(e){return null}
  }
  function card(item){
    if(!item||typeof item.name!=='string'||typeof item.description!=='string')return null;
    var page=localPath(item.page),store=officialStore(item.store);
    if(!page&&!store)return null;
    var article=node('article','catalog-card');
    var iconWrap=node('div','catalog-card-top');
    var image=document.createElement('img');
    image.src=typeof item.icon==='string'&&item.icon.startsWith('https://play-lh.googleusercontent.com/')?item.icon:'/assets/fa-app-studio-logo.webp';
    image.loading='lazy';image.width=64;image.height=64;
    image.alt='Icono de '+item.name;
    iconWrap.appendChild(image);
    var titles=node('div','catalog-card-head');
    titles.appendChild(node('span','catalog-card-type',item.category||'Aplicación'));
    titles.appendChild(node('h3','catalog-card-title',item.name));
    iconWrap.appendChild(titles);
    article.appendChild(iconWrap);
    article.appendChild(node('p','catalog-card-description',item.description));
    var actions=node('div','catalog-card-links');
    if(page){
      var a=node('a','catalog-card-link catalog-card-primary','Conocer aplicación ↗');
      a.href=page;actions.appendChild(a);
    }
    if(store){
      var b=node('a','catalog-card-link','Descargar ↗');
      b.href=store;b.target='_blank';b.rel='noopener noreferrer';actions.appendChild(b);
    }
    article.appendChild(actions);
    return article;
  }
  fetch('/assets/products.json').then(function(r){if(!r.ok)throw Error('Catálogo no disponible');return r.json()}).then(function(catalog){
    if(!catalog||!Array.isArray(catalog.products))return;
    var future=catalog.products.filter(function(p){return p&&p.status==='published'&&p.id!=='radio-mexico-de-siempre'});
    future.forEach(function(item){var e=card(item);if(e)target.appendChild(e)});
    if(target.childElementCount){
      target.hidden=false;
      var placeholder=document.getElementById('portfolio-next');
      if(placeholder)placeholder.hidden=true;
    }
  }).catch(function(){/* La página corporativa continúa funcionando sin el catálogo */});
})();