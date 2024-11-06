const cacheName = "v1";
async function impl(e) {
    let cache = await caches.open(cacheName); // Cache megnyitása, async
    let cacheResponse = await cache.match(e.request); // Lookup
    if (cacheResponse) // Ha megvan
        return cacheResponse // Visszadjuk
    else {
        let networkResponse = await fetch(e.request); // Ha nincs meg, akkor elindítjuk a tényleges hálózati lekérdezést
        cache.put(e.request, networkResponse.clone()) // Eltároljuk
        return networkResponse; // Visszadjuk
    }
}
self.addEventListener("fetch", e => e.respondWith(impl(e))); // Eseményre feliratkozás


// self.addEventListener("push", e =>
//     {
//         alert("fsdfs");
//         var msg = e.data?.text();
//         if (msg)
//         {
//             e.waitUntil(self.registration.showNotification("chat", msg));
//         }
//     }); // Eseményre feliratkozás


    self.addEventListener("push", (event) => {
        if (!(self.Notification && self.Notification.permission === "granted")) {
          return;
        }
      
        const data = event.data?.json() ?? {};
        const title = data.title || "Something Has Happened";
        const message =
          data.message || "Here's something you might want to check out.";
        const icon = "images/new-notification.png";
      
        const notification = new self.Notification(title, {
          body: message,
          tag: "simple-push-demo-notification",
          icon,
        });
      
        notification.addEventListener("click", () => {
          clients.openWindow(
            "http://localhost:5173/",
          );
        });
      });