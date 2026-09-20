const CACHE = "annabeth-hospital-v18";
const ASSETS = ["./", "./index.html", "./styles.css", "./adventure.css", "./app.js", "./adventure.js", "./manifest.webmanifest", "./assets/icon.svg", "./assets/title-screen-poster.png", "./assets/twinkle-dental-clinic.png", "./assets/magical-kingdom-map.png", "./assets/fern-treatment-room.png", "./assets/bramble-potion-lab.png", "./assets/enchanted-forest-garden.png", "./assets/nova-castle-meadow.png", "./assets/art-recovery-studio.png", "./assets/pip-xray-room.png", "./assets/annabeth-outfits.png", "./assets/annabeth-outfits-2.png", "./assets/annabeth-outfits-3.png", "./assets/annabeth-dressup-base.png", "./assets/patient-emotions.png"];
self.addEventListener("install", event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS))));
self.addEventListener("activate", event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))));
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    const copy = response.clone(); caches.open(CACHE).then(cache => cache.put(event.request, copy)); return response;
  }).catch(() => caches.match("./index.html"))));
});
