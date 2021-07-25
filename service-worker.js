// Register service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/hello-world-pwa/service-worker.js');
    });
  }
  
// Install service worker
const CACHE_NAME = 'hello-world-cache';
const urlsToCache = [
  '/hello-world-pwa/',
  '/hello-world-pwa//pages/cats.html',
  '/hello-world-pwa/pages/dogs.html'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Catch requests
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
