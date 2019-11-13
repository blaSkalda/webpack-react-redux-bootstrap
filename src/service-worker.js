/* eslint-disable */
// @flow

const cacheName = 'cache-v1.0.1';
const filesToCache = ['/'];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      self.__precacheManifest.map(pm => filesToCache.push(pm.url));
      return cache.addAll(filesToCache);
    }),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keyList) => {
    keyList.map((k) => {
      if (cacheName !== k) {
        return caches.delete(k);
      }
    });
  }));
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches
      .open(cacheName)
      .then(cache => cache.match(event.request, { ignoreSearch: true }))
      .then(response => response || fetch(event.request)),
  );
});
