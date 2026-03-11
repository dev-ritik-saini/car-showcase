// AutoVerse Service Worker
const CACHE_NAME = 'autoverse-v1';
const STATIC_CACHE = 'autoverse-static-v1';
const DYNAMIC_CACHE = 'autoverse-dynamic-v1';
const IMAGE_CACHE = 'autoverse-images-v1';

// Assets to cache immediately on install
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/offline.html',
    '/manifest.json',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png'
];

// Cache size limits
const CACHE_LIMITS = {
    images: 50,
    dynamic: 30
};

// Install event - cache static assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => {
                console.log('[SW] Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((keys) => {
                return Promise.all(
                    keys
                        .filter((key) =>
                            key !== STATIC_CACHE &&
                            key !== DYNAMIC_CACHE &&
                            key !== IMAGE_CACHE
                        )
                        .map((key) => {
                            console.log('[SW] Removing old cache:', key);
                            return caches.delete(key);
                        })
                );
            })
            .then(() => self.clients.claim())
    );
});

// Helper function to limit cache size
const limitCacheSize = async (cacheName, maxItems) => {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    if (keys.length > maxItems) {
        await cache.delete(keys[0]);
        return limitCacheSize(cacheName, maxItems);
    }
};

// Fetch strategies
const cacheFirst = async (request, cacheName) => {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
        return cachedResponse;
    }
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(cacheName);
            cache.put(request, networkResponse.clone());
            limitCacheSize(cacheName, CACHE_LIMITS.images);
        }
        return networkResponse;
    } catch (error) {
        return new Response('Image not available offline', { status: 503 });
    }
};

const networkFirst = async (request, cacheName) => {
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(cacheName);
            cache.put(request, networkResponse.clone());
            limitCacheSize(cacheName, CACHE_LIMITS.dynamic);
        }
        return networkResponse;
    } catch (error) {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        // Return offline fallback for navigation requests
        if (request.mode === 'navigate') {
            const offlinePage = await caches.match('/offline.html');
            if (offlinePage) {
                return offlinePage;
            }
            return caches.match('/');
        }
        throw error;
    }
};

const staleWhileRevalidate = async (request, cacheName) => {
    const cachedResponse = await caches.match(request);

    const fetchPromise = fetch(request)
        .then((networkResponse) => {
            if (networkResponse.ok) {
                const cache = caches.open(cacheName);
                cache.then(c => c.put(request, networkResponse.clone()));
            }
            return networkResponse;
        })
        .catch(() => cachedResponse);

    return cachedResponse || fetchPromise;
};

// Fetch event handler
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // Skip chrome-extension and other non-http(s) requests
    if (!url.protocol.startsWith('http')) {
        return;
    }

    // Skip Google Analytics and other tracking
    if (url.hostname.includes('google') ||
        url.hostname.includes('analytics') ||
        url.hostname.includes('gtag')) {
        return;
    }

    // Strategy based on request type
    if (request.destination === 'image' ||
        url.hostname.includes('unsplash') ||
        url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
        // Cache-first for images
        event.respondWith(cacheFirst(request, IMAGE_CACHE));
        return;
    }

    if (url.hostname.includes('fonts.googleapis') ||
        url.hostname.includes('fonts.gstatic')) {
        // Cache-first for fonts
        event.respondWith(cacheFirst(request, STATIC_CACHE));
        return;
    }

    if (request.mode === 'navigate' ||
        request.destination === 'document') {
        // Network-first for HTML pages
        event.respondWith(networkFirst(request, DYNAMIC_CACHE));
        return;
    }

    if (request.destination === 'script' ||
        request.destination === 'style') {
        // Stale-while-revalidate for JS/CSS
        event.respondWith(staleWhileRevalidate(request, STATIC_CACHE));
        return;
    }

    // Default: network-first
    event.respondWith(networkFirst(request, DYNAMIC_CACHE));
});

// Background sync for offline submissions (future feature)
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-contact-form') {
        console.log('[SW] Syncing contact form data');
    }
});

// Push notifications (future feature)
self.addEventListener('push', (event) => {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body,
            icon: '/icons/icon-192x192.png',
            badge: '/icons/icon-72x72.png',
            vibrate: [100, 50, 100],
            data: {
                url: data.url || '/'
            }
        };
        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    }
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});

console.log('[SW] Service Worker loaded');
