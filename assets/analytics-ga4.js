/*
 * FA App Studio · Google Analytics 4
 *
 * Inserta el ID de medición web (G-...) en MEASUREMENT_ID para habilitar GA4.
 * Mientras esté vacío, no solicita recursos externos ni almacena datos.
 * Se inicia después del evento load y cuando el navegador está libre:
 * nunca bloquea el HTML, las imágenes, el audio ni la navegación.
 *
 * La ruta /radio-mexico-de-siempre/descargar/ se deja SIN analítica:
 * su redirección instantánea hacia Google Play es prioritaria.
 */
(function () {
  'use strict';

  var MEASUREMENT_ID = '';
  if (!/^G-[A-Z0-9]{6,}$/.test(MEASUREMENT_ID)) return;
  if (navigator.globalPrivacyControl === true || navigator.doNotTrack === '1') return;

  // Preparamos la cola oficial de gtag sin descargar todavía terceros.
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', MEASUREMENT_ID);

  var started = false;
  function loadGoogleTag() {
    if (started) return;
    started = true;
    var tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(MEASUREMENT_ID);
    document.head.appendChild(tag);
  }

  function schedule() {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(loadGoogleTag, { timeout: 2000 });
    } else {
      window.setTimeout(loadGoogleTag, 0);
    }
  }

  if (document.readyState === 'complete') {
    schedule();
  } else {
    window.addEventListener('load', schedule, { once: true });
  }
})();
