const CACHE_NAME = 'sdsuv-nexus-cache-v1';

const STATIC_ASSETS = [
  '/',
  '/learn',
  '/pyqs',
  '/saved',
  '/simulator',
  '/careers',
  '/manifest.json',
  '/images/sdsuv_crest.png',
  '/images/himalayan_peaks.jpg',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
];

// Install Event: Cache Core Shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate Event: Cleanup Old Caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event: Stale-While-Revalidate Strategy
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Don't intercept chrome-extension, non-http, YouTube embeds, Next.js internal chunks, APIs, or dev localhost
  if (
    !event.request.url.startsWith('http') ||
    url.hostname.includes('youtube') ||
    url.hostname.includes('googlevideo') ||
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/api') ||
    url.hostname === 'localhost' ||
    url.hostname === '127.0.0.1'
  ) {
    return;
  }

  // Handle HTML navigation and static assets
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // If offline and navigating, return cached root or page
          if (event.request.mode === 'navigate') {
            return caches.match('/');
          }
        });

      return cachedResponse || fetchPromise;
    })
  );
});
