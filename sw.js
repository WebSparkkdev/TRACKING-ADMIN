const CACHE_NAME = 'excel-shell-v1';
const ASSETS = ['/','/index.html','/styles.css','/script.js','/manifest.json'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS).catch(()=>{})));
  self.skipWaiting();
});

self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if(event.request.mode==='navigate' || url.origin===location.origin){
    event.respondWith(fetch(event.request).then(resp => { const copy = resp.clone(); caches.open(CACHE_NAME).then(c=>c.put(event.request, copy)); return resp; }).catch(()=>caches.match('/index.html')));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached=>cached || fetch(event.request).catch(()=>{})));
});