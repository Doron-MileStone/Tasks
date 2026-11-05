/* Service worker: שומר את קבצי האפליקציה כדי שתיפתח גם בלי רשת */
const VERSION = 'tasks-v8';
const SHELL = ['./', './index.html', './styles.css', './app.js', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  // שיתוף מאפליקציה אחרת (Share target): שומרים את מה ששותף ופותחים את האפליקציה
  if (e.request.method === 'POST' && url.origin === self.location.origin && url.pathname.endsWith('/share')) {
    e.respondWith((async () => {
      const form = await e.request.formData();
      const files = form.getAll('files').filter((f) => f && f.size);
      const cache = await caches.open('tm-share');
      await Promise.all(files.map((f, i) => cache.put('share-file-' + i, new Response(f, { headers: { 'content-type': f.type } }))));
      await cache.put('share-meta', new Response(JSON.stringify({
        title: form.get('title') || '', text: form.get('text') || '', url: form.get('url') || '',
        files: files.length, names: files.map((f) => f.name)
      })));
      return Response.redirect(new URL('./?shared=1#today', self.registration.scope).href, 303);
    })());
    return;
  }
  if (e.request.method !== 'GET') return;
  // קבצי האפליקציה: קודם רשת (כדי לקבל עדכונים), ואם אין – מהמטמון
  if (url.origin === self.location.origin) {
    e.respondWith(
      fetch(e.request).then((res) => {
        const copy = res.clone();
        caches.open(VERSION).then((c) => c.put(e.request, copy));
        return res;
      }).catch(() => caches.match(e.request, { ignoreSearch: true }).then((r) => r || caches.match('./index.html')))
    );
    return;
  }
  // גופנים של גוגל: מהמטמון אם יש
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request).then((res) => {
      const copy = res.clone();
      caches.open(VERSION).then((c) => c.put(e.request, copy));
      return res;
    })));
  }
  // בקשות לשרת (Apps Script) לא עוברות דרך המטמון
});
