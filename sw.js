const CACHE = 'soulvibes-v3';
const ASSETS = [
  '/contract-app/',
  '/contract-app/index.html',
  '/contract-app/icon-192.png',
  '/contract-app/icon-512.png',
  '/contract-app/favicon.ico',
  '/contract-app/favicon-32.png',
  '/contract-app/apple-touch-icon.png',
  '/contract-app/manifest.json',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
