const CACHE = "flip-sync-cache";

// Install stage sets up the offline page in the cache and opens a new cache
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll([
        "/",
        "/manifest.json",
        "/app-icon-192.png",
        "/app-icon-512.png",
      ]);
    })
  );
});

// If any fetch fails, it will look for the request in the cache and serve it from there first
self.addEventListener("fetch", function (event) {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then(function (response) {
        // If request was successful, return it
        if (response.status === 200) {
          return response;
        }

        // Try to get it from the cache
        return caches.match(event.request).then(function (response) {
          // Return cached response or fallback to offline page
          return response || caches.match("/");
        });
      })
      .catch(function (error) {
        // Check to see if you have it in the cache
        // Return response
        return caches.match(event.request).then(function (response) {
          // Return cached response or fallback to offline page
          return response || caches.match("/");
        });
      })
  );
});
