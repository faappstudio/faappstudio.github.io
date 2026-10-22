(function(){
  // La fuente/campaña acompaña al visitante hasta la ficha de Google Play.
  // Google Play Console puede mostrar dimensiones UTM; no cuenta instalaciones por sí solo.
  (function(){
    var allowed=/^[a-zA-Z0-9_-]{1,60}$/;
    var query=new URLSearchParams(window.location.search);
    var source=query.get('utm_source');
    var medium=query.get('utm_medium');
    var campaign=query.get('utm_campaign');
    if(!allowed.test(source||''))source='faappstudio';
    if(!allowed.test(medium||''))medium='website';
    if(!allowed.test(campaign||''))campaign='radio_mexico_de_siempre';
    document.querySelectorAll('a[data-play-cta]').forEach(function(link){
      try{
        var u=new URL(link.href);
        u.searchParams.set('utm_source',source);
        u.searchParams.set('utm_medium',medium);
        u.searchParams.set('utm_campaign',campaign);
        var context=link.closest('.install-dialog')?'modal':link.closest('.reel-dialog')?'video':link.closest('.mobile-cta')?'sticky':link.closest('.hero')?'hero':link.closest('.app-gallery-section')?'galeria':link.closest('.share-section')?'compartir':link.closest('.final-call')?'final':'navegacion';
        u.searchParams.set('utm_content',context);
        link.href=u.toString();
      }catch(e){}
    });
  })();
  // Visor independiente de <dialog> para evitar alturas gigantes en Brave.
  (function(){
    var overlay=document.getElementById('reel-lightbox');
    var card=overlay&&overlay.querySelector('.reel-window');
    var player=document.getElementById('reel-player');
    var closeButton=document.getElementById('close-reel');
    if(!overlay||!card||!player||!closeButton)return;
    var opener=null,oldOverflow='',activeFrame=null;
    var reelURL="https://facebook.com/reel/1776460783652969";
    function fit(){
      var vv=window.visualViewport;
      var w=Math.min(window.innerWidth||document.documentElement.clientWidth,vv?vv.width:Infinity);
      var h=Math.min(window.innerHeight||document.documentElement.clientHeight,vv?vv.height:Infinity);
      var videoW=Math.max(130,Math.floor(Math.min(400,w-34,Math.max(130,(h-116)*9/16))));
      var videoH=Math.round(videoW*16/9);
      card.style.width=(videoW+12)+'px';
      card.style.height=(videoH+100)+'px';
      player.style.width=videoW+'px';
      player.style.height=videoH+'px';
      if(activeFrame){activeFrame.style.width=videoW+'px';activeFrame.style.height=videoH+'px'}
      return videoW;
    }
    function close(){
      if(overlay.hidden)return;
      player.replaceChildren();activeFrame=null;overlay.hidden=true;
      document.body.style.overflow=oldOverflow;
      window.removeEventListener('resize',fit);
      if(window.visualViewport)window.visualViewport.removeEventListener('resize',fit);
      if(opener&&typeof opener.focus==='function')opener.focus();
    }
    function open(button){
      opener=button;oldOverflow=document.body.style.overflow;overlay.hidden=false;
      document.body.style.overflow='hidden';
      var width=fit();
      var frame=document.createElement('iframe');
      frame.title='Video promocional de Radio México de Siempre en Facebook';
      frame.allow='autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share';
      frame.allowFullscreen=true;
      frame.referrerPolicy='strict-origin-when-cross-origin';
      frame.src='https://www.facebook.com/plugins/video.php?href='+encodeURIComponent(reelURL)+'&show_text=false&width='+width;
      activeFrame=frame;frame.style.width=player.style.width;frame.style.height=player.style.height;
      player.replaceChildren(frame);
      window.addEventListener('resize',fit,{passive:true});
      if(window.visualViewport)window.visualViewport.addEventListener('resize',fit,{passive:true});
      closeButton.focus();
    }
    document.querySelectorAll('[data-open-reel]').forEach(function(b){b.addEventListener('click',function(){open(b)})});
    closeButton.addEventListener('click',close);
    overlay.addEventListener('click',function(e){if(e.target===overlay)close()});
    document.addEventListener('keydown',function(e){
      if(overlay.hidden)return;
      if(e.key==='Escape'){e.preventDefault();close();return}
      if(e.key==='Tab'){
        var first=closeButton,last=overlay.querySelector('.reel-fallback');
        if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
        else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
      }
    });
  })();
  var copy=document.getElementById('copy'),copyLabel=document.getElementById('copy-label');
  if(copy&&copyLabel){
    copy.addEventListener('click',function(){
      if(!navigator.clipboard||!navigator.clipboard.writeText){copyLabel.textContent='Abre Google Play para copiar el enlace';return}
      navigator.clipboard.writeText("https://play.google.com/store/apps/details?id=cl.rancherasfacil.app").then(function(){
        copyLabel.textContent='¡Enlace copiado!';
        window.setTimeout(function(){copyLabel.textContent='Copiar enlace de la app'},2400);
      },function(){copyLabel.textContent='No se pudo copiar el enlace'});
    });
  }
  var modal=document.getElementById('download-modal');
  if(modal){
    function close(){if(modal.open)modal.close();else modal.removeAttribute('open')}
    var x=document.getElementById('close-download'),browse=document.getElementById('keep-browsing');
    if(x)x.addEventListener('click',close);
    if(browse)browse.addEventListener('click',close);
    modal.addEventListener('click',function(e){if(e.target===modal)close()});
    modal.querySelectorAll('a').forEach(function(link){link.addEventListener('click',close)});
    if(typeof modal.showModal==='function'){
      try{modal.showModal()}catch(e){modal.setAttribute('open','')}
    }else{modal.setAttribute('open','')}
  }
})();
