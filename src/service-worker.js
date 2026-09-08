/// <reference lib="webworker" />
import { build, files, version, prerendered } from '$service-worker';

const cacheName = `cache-${version}`;

// Filter files from static/ to avoid caching the massive 57MB of images upfront.
// We only precache icons, manifest, and potentially fonts.
const essentialStaticAssets = files.filter(file => {
  return file.includes('/icons/') || 
         file.includes('manifest.json') || 
         file.includes('favicon.png') || 
         file.endsWith('.woff2');
});

const preCacheFiles = [
  ...build,
  ...prerendered,
  ...essentialStaticAssets
];

self.addEventListener('install', (event) => {
  // Create a new cache and add all essential files to it
  async function addFilesToCache() {
    const cache = await caches.open(cacheName);
    await cache.addAll(preCacheFiles);
  }

  event.waitUntil(addFilesToCache());
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Remove previous cached data from disk
  async function deleteOldCaches() {
    for (const key of await caches.keys()) {
      if (key !== cacheName) {
        await caches.delete(key);
      }
    }
  }

  event.waitUntil(deleteOldCaches());
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  const isHttp = url.protocol.startsWith('http');
  const isDevServerRequest = url.hostname === self.location.hostname && url.port !== self.location.port;

  if (!isHttp || isDevServerRequest) return;

  async function respond() {
    const cache = await caches.open(cacheName);

    // Cache-first strategy
    const cachedResponse = await cache.match(event.request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // If not in cache, fetch from network and cache it dynamically
    try {
      const networkResponse = await fetch(event.request);

      // Only cache valid responses
      if (networkResponse.ok || networkResponse.type === 'opaque') {
        cache.put(event.request, networkResponse.clone());
      }

      return networkResponse;
    } catch (error) {
      // Offline fallback can be implemented here if needed
      throw error;
    }
  }

  event.respondWith(respond());
});
