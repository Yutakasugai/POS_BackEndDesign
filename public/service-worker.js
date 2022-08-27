var cacheName ='v1';

// var filesToCache = [
//     'testWS.html',
//     '/public/css/style.css',
//     '/public/js/index.js',
//     '/public/images/pic-1.svg'
// ];


self.addEventListener('install', function(e) {

    console.log('Service Worker: Install');

    e.waitUntil(
        caches.open(cacheName).then(function(cache) {

            console.log('[ServiceWorker] Caching app shell');
            cache.add('/public/testWS.html');

        }).then(function() {
            self.skipWaiting(); 
        })
    );
});

self.addEventListener('install', function(e) {
    console.log("Service Worker: Activated"); 

    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== cacheName){
                        console.log('Service Worker: Clearing Old Cache'); 
                        return caches.delete(cache); 
                    }
                })
            )
        })
    )
})

self.addEventListener('fetch', function(e) { 
    console.log('Service Worker: Fetching'); 

    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    )
})

// The files already tested 
// '/css/style.css', js/index.js