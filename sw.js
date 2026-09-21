const CACHE = 'luan-caca-v1';
const ARQUIVOS = ['index.html','manifest.json','icon.svg'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARQUIVOS)).then(()=>self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});

self.addEventListener('fetch', e => {
  if(e.request.url.includes('firebaseio') || e.request.url.includes('gstatic')) return;
  e.respondWith(
    fetch(e.request).catch(()=>caches.match(e.request))
  );
});
