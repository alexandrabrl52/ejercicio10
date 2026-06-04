const CACHE_NAME = "shooter-pwa-v2";

const urlsToCache = [
  "/",
  "/index.html",
  "/game.css",
  "/Game.js",
  "/Entity.js",
  "/Character.js",
  "/Player.js",
  "/Opponent.js",
  "/Shot.js",
  "/main.js",

  "/assets/bueno.png",
  "/assets/bueno_muerto.png",
  "/assets/malo.png",
  "/assets/malo_muerto.png",
  "/assets/shot1.png",
  "/assets/shot2.png",
  "/assets/game_over.png",

  "/manifest.json"
];

// INSTALACIÓN
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// ACTIVACIÓN (limpia caches antiguas)
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// FETCH (offline support)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});