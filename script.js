(function(){
  'use strict';
  var TARGET = "https://preview--admin-dashboard-proper-74252.lovable.app/admin/dashboard";
  var FAV = "https://soundzyglobal.vercel.app/favicon.png";
  var FRAME_ROOT = document.getElementById('frame-root');
  var loader = document.getElementById('loader');
var MAX_REVEAL_MS = 700;

  // create placeholder iframe for instant paint
  var PLACEHOLDER = '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0;font-family:Inter,system-ui,Arial,sans-serif;background:#fff;color:#111;padding:18px}h1{font-size:18px}</style></head><body><h1>Soundzy World Global</h1><p>Loading…</p></body></html>';

  var placeholder = document.createElement('iframe');
  placeholder.id = 'placeholder';
  placeholder.title = 'Snapshot';
  placeholder.sandbox = 'allow-same-origin';
  placeholder.srcdoc = PLACEHOLDER;
  placeholder.style.width = '100vw';
  placeholder.style.height = '100vh';
  placeholder.style.border = '0';
  placeholder.style.zIndex = '1';
  FRAME_ROOT.appendChild(placeholder);

  // create real iframe
  var real = document.createElement('iframe');
  real.id = 'embed';
  real.title = 'Excel Logistics Dashboard';
  real.loading = 'eager';
  real.setAttribute('sandbox','allow-scripts allow-forms allow-same-origin allow-popups allow-top-navigation-by-user-activation');
  real.setAttribute('referrerpolicy','no-referrer');
  real.style.width = '100vw';
  real.style.height = '100vh';
  real.style.border = '0';
  real.style.position = 'absolute';
  real.style.left = '0';
  real.style.top = '0';
  real.style.visibility = 'hidden';
  real.style.zIndex = '0';
  FRAME_ROOT.appendChild(real);

  var loaded = false;

  // Warm-up ping (no-cors fetch and image)
  try{ fetch(TARGET, {mode:'no-cors', cache:'reload'}).catch(function(){}); }catch(e){}
  try{ var img=new Image(); img.src = FAV + '?_=' + Date.now(); img.onload = img.onerror = function(){}; }catch(e){}

  // start loading
  real.src = TARGET;

  real.addEventListener('load', function(){
    loaded = true;
    try{ real.style.visibility = 'visible'; real.style.zIndex = '2'; if(loader) loader.style.display='none'; setTimeout(function(){ try{ placeholder.remove(); }catch(e){} }, 220); }catch(e){}
  }, {passive:true});

  setTimeout(function(){ if(!loaded){ try{ real.style.visibility = 'visible'; real.style.zIndex = '2'; if(loader) loader.style.display='none'; try{ placeholder.remove(); }catch(e){} }catch(e){} } }, MAX_REVEAL_MS);

  // openExternal helper and postMessage listener
  window.openExternal = function(url){ try{ var w = window.open(url, '_blank', 'noopener'); if(!w) window.location.href = url; }catch(e){ try{ window.location.href = url; }catch(e){} } };

  window.addEventListener('message', function(ev){ try{ var data = (typeof ev.data === 'string') ? JSON.parse(ev.data) : ev.data; if(data && data.type === 'open-external' && data.url) window.openExternal(data.url); }catch(e){} }, false);

  // allow hiding cover with double click or long press
  (function(){
    var pressTimer = null;
    // cover removed('dblclick', function(){ cover.style.display='none'; });
    // cover removed('touchstart', function(){ pressTimer = setTimeout(function(){ cover.style.display='none'; }, 700); }, {passive:true});
    // cover removed('touchend', function(){ if(pressTimer){ clearTimeout(pressTimer); pressTimer=null; } }, {passive:true});
  })();

  // Register service worker to cache wrapper shell (for repeat visits)
  if('serviceWorker' in navigator){ try{ navigator.serviceWorker.register('sw.js').catch(function(){}); }catch(e){} }
})();