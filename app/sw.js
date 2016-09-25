var dataCacheName = 'groceries-data';
var cacheName = 'groceries-cache';

var filesToCache = [ 
	'index.html', 
	'scripts/scripts.js',
	'scripts/vendor.js',
	'styles/main.css',
	'styles/vendor.css',
	'images/carrot.svg',
	'images/cancel.svg',
	'images/food.svg',
	'images/hamburger-icon.svg',
	'images/meat.svg',
	'images/milk.svg',
	'images/plus.svg',
	'images/ui-icons_444444_256x240.png',
	'images/ui-icons_555555_256x240.png',
	'images/ui-icons_777620_256x240.png',
	'images/ui-icons_777777_256x240.png',
	'images/ui-icons_cc0000_256x240.png',
	'images/ui-icons_ffffff_256x240.png'
];

//Install the service worker and cache the app shell

self.addEventListener('install', function(e) {
	console.log('[ServiceWorker] Install');
	e.waitUntil(
		caches.open(cacheName).then(function(cache) {
			console.log('[ServiceWorker] Caching app shell');
			return cache.addAll(filesToCache);
		}).catch(function(e) {
			console.log(e);
		})
	);
});

//Update the app shell cache when it changes

self.addEventListener('activate', function(e) {
	console.log('[ServiceWorker] Activate');
	e.waitUntil(
		caches.keys().then(function(keyList) {
			return Promise.all(keyList.map(function(key) {
				if (key !== cacheName && key !== dataCacheName) {
					return caches.delete(key);
				}
			}))
		}).catch(function(e) {
			console.log(e);
		})
	);
});

//Check in the service worker if the cache app shell is needed 

self.addEventListener('fetch', function(e) {
	console.log('[Service Worker] fetch',e.request.url);
	e.respondWith(
		caches.match(e.request).then(function(response) {
			console.log('[Service Worker] Fetch Response: ',response);
			if (response) return response;
			return fetch(e.request);
		})
	);
});