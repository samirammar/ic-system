'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "2d38d68eb5415ca85e5744d7235e3e5b",
"assets/assets/%25D9%2586%25D8%25A7%25D8%25B5%25D8%25B1.png": "6d2be076541a309d591dddf40d522826",
"assets/assets/1.jpg": "96eb2861cc791c643eb91d2e4c09cacd",
"assets/assets/1_1.jpg": "8f40335acc757f7281b50fa2f1f5332c",
"assets/assets/2_2.jpg": "1e0ad1e4649debe8c6959f030a8ad18a",
"assets/assets/2_2.png": "1e0ad1e4649debe8c6959f030a8ad18a",
"assets/assets/3_3.jpg": "526c32154ba518b66d17cacc271eaea1",
"assets/assets/4_4.jpg": "0b446a84debbb3043e4701ec3dd36d76",
"assets/assets/5_5.jpg": "35ed2de6effd54ea49abc2bd705bbb7e",
"assets/assets/alahly.jpg": "8e27c7ff362d4a9e96aaf34ed5d0b359",
"assets/assets/bank%2520misr.png": "4f5690aa92fa3c8bfe5eb99c725bba94",
"assets/assets/cairo.jpg": "9ab24dfab8c4941dafdab008661ac7c0",
"assets/assets/cib.jpg": "ce7da0da16528c8c8fc4ed3ea7f33f6d",
"assets/assets/eskan.jpg": "581cc810d47ef0a8a834d3fc9748b455",
"assets/assets/fonts/jannah.ttf": "0655ac2529565b93080fef53a0e85ffe",
"assets/assets/logo.jpg": "451a5a290700a28c8576e669dcb3d0bd",
"assets/assets/logo.png": "451a5a290700a28c8576e669dcb3d0bd",
"assets/assets/m.jpg": "2cadfab9eb7c1fc282885b130b6a0811",
"assets/assets/p.pdf": "fc58fd19703db83ac7b95ebefd78945d",
"assets/assets/ss.jpg": "113a453281b87f71115ec99486937106",
"assets/assets/zra3i.jpg": "fa2a2793dc29c2fa8e49483e0f44522a",
"assets/FontManifest.json": "eab1a378e61cec69e059b97f654dc483",
"assets/fonts/MaterialIcons-Regular.otf": "7e7a6cccddf6d7b20012a548461d5d81",
"assets/NOTICES": "821d6daec9a739e555ec743d3e1cd259",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"canvaskit/canvaskit.js": "c2b4e5f3d7a3d82aed024e7249a78487",
"canvaskit/canvaskit.wasm": "4b83d89d9fecbea8ca46f2f760c5a9ba",
"canvaskit/profiling/canvaskit.js": "ae2949af4efc61d28a4a80fffa1db900",
"canvaskit/profiling/canvaskit.wasm": "95e736ab31147d1b2c7b25f11d4c32cd",
"favicon.png": "e2eee463bfecaf90979b58b2106308e2",
"icons/Icon-192.png": "506dd554171fa7dabb9e4506b619f46a",
"icons/Icon-512.png": "db43efa40fb0ab965239f3cd3c08be6d",
"icons/Icon-maskable-192.png": "0f0350a5cf551038c5a97e8c73ff1b0a",
"icons/Icon-maskable-512.png": "da28bd1e3efb40b9de87fb4e994f6afe",
"index.html": "dafc475f28026095f4317d6e673b9477",
"/": "dafc475f28026095f4317d6e673b9477",
"main.dart.js": "4207d1d7417719c48ce7f37af0bc1e8b",
"manifest.json": "c864079c9a8c7f207e9b7eec27ed6357",
"splash/img/dark-1x.png": "e6308e35471023ee6c19b85656c44bf8",
"splash/img/dark-2x.png": "87062eaf1e89025eb6bf97c365dd1e55",
"splash/img/dark-3x.png": "ca46241ec3d62fe864cd1c95c915b016",
"splash/img/dark-4x.png": "d2184d1c3a40bd4dff51c623b989fac1",
"splash/img/light-1x.png": "e6308e35471023ee6c19b85656c44bf8",
"splash/img/light-2x.png": "87062eaf1e89025eb6bf97c365dd1e55",
"splash/img/light-3x.png": "ca46241ec3d62fe864cd1c95c915b016",
"splash/img/light-4x.png": "d2184d1c3a40bd4dff51c623b989fac1",
"splash/splash.js": "c6a271349a0cd249bdb6d3c4d12f5dcf",
"splash/style.css": "3979c95d9a8eb983d84ecdf10cec8e71",
"version.json": "b784914e4b91bd09b0c9b47f2664e85c"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
