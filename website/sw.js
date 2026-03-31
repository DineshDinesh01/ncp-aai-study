const CACHE_NAME = 'ncp-aai-cache-v2';
const API_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';

// Setup Mock Data
const MOCK_RESPONSE = {
    id: "chatcmpl-mock-" + Math.random().toString(36).substr(2, 9),
    object: "chat.completion",
    created: Math.floor(Date.now() / 1000),
    model: "meta/llama-3.1-70b-instruct",
    choices: [{
        index: 0,
        message: {
            role: "assistant",
            content: "This is a simulated AI response provided by the NCP-AAI Study Platform Service Worker. No API Key required!\n\nYou can use this endpoint to test your LangChain or raw prompt scripts in Pyodide completely offline."
        },
        finish_reason: "stop"
    }],
    usage: {
        prompt_tokens: 15,
        completion_tokens: 35,
        total_tokens: 50
    }
};

self.addEventListener('install', (event) => {
    // Skip waiting so the service worker activates immediately
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // 1. MOCK NVIDIA NIM API ENDPOINT
    if (url.origin === 'https://integrate.api.nvidia.com' && url.pathname.includes('/v1/chat/completions') && event.request.method === 'POST') {
        const jsonResponse = new Response(JSON.stringify(MOCK_RESPONSE), {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        event.respondWith(jsonResponse);
        return;
    }

    // Handle OPTIONS requests (CORS preflight) for the mock API
    if (url.origin === 'https://integrate.api.nvidia.com' && event.request.method === 'OPTIONS') {
        event.respondWith(new Response(null, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Amz-Date, X-Api-Key, X-Amz-Security-Token'
            }
        }));
        return;
    }

    // 2. STALE-WHILE-REVALIDATE CACHE STRATEGY FOR ALL OTHER ASSETS
    event.respondWith(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.match(event.request).then((cachedResponse) => {
                const fetchPromise = fetch(event.request).then((networkResponse) => {
                    // Cache the response if it is successful, ignore external CDNs if they fail
                    if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
                        cache.put(event.request, networkResponse.clone());
                    }
                    return networkResponse;
                }).catch(() => {
                    // Ignore fetch failures (offline mode)
                });
                return cachedResponse || fetchPromise;
            });
        })
    );
});
