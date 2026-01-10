'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"404.html": "8ca9759e190704770a7931c4c140aec4",
"ads.txt": "b8faa4dfb8f72be61b884e91456fd11b",
"assets/AssetManifest.bin": "92018a8119e5d0628cff3f7a8e914566",
"assets/AssetManifest.bin.json": "e6ed555e5dcba81cb46088028bf49a48",
"assets/AssetManifest.json": "e1577f39df48da49224ea8dff259a343",
"assets/assets/instagram.svg": "d2205c5220672c44939b0e0261b04689",
"assets/assets/tistory.svg": "db7b85c807ee7487bce0ef935ca9554a",
"assets/assets/youtube.svg": "171d7c2e55875bb0fceaca55df68207b",
"assets/FontManifest.json": "f96e874d104c6ab4ba75924126ba39b8",
"assets/fonts/CookieRunBlack.ttf": "e34b3a3a57b661882166c48ca294f2c3",
"assets/fonts/Hack-Regular.ttf": "d9ab192896af1ab48c760f3368842b79",
"assets/fonts/IBMPlexSansKR-Bold.ttf": "c62fa10d33ac6811e5c9c15ca821b35a",
"assets/fonts/IBMPlexSansKR-Light.ttf": "42871cceaf1dba424ae957424dfb016d",
"assets/fonts/IBMPlexSansKR-medium.ttf": "2424a629f9970a11ed29f68d96f1b75e",
"assets/fonts/IBMPlexSansKR-regular.ttf": "21d164e86f5cdb0161376ffbd601f339",
"assets/fonts/IropkeBatangM.ttf": "bcf98dd35af3ec00f5986542a664f82a",
"assets/fonts/MaterialIcons-Regular.otf": "3134b7bbfe9d93b7b918149c1537e3fd",
"assets/fonts/NanumGothicCoding-Regular.ttf": "19b942c8590412fc0e8a65291fda2d86",
"assets/fonts/NanumSquareNeo-aLt.ttf": "e7218dfd0284a5e5b4a9ce231f88db65",
"assets/fonts/NanumSquareNeo-bRg.ttf": "8e204e046fce31563177dd08b27ce94b",
"assets/fonts/NanumSquareNeo-cBd.ttf": "d437afc2ea82bd95d2bc0c4b88de9573",
"assets/fonts/NanumSquareNeo-dEb.ttf": "7775f17c10a169509b8fca4156c621b6",
"assets/fonts/NotoSansKR-ExtraBold.ttf": "74d89e10cb25b3a61efb87587d4866d1",
"assets/fonts/NotoSansKR-Medium.ttf": "b8165f63b5501b9bcb376762fafadec2",
"assets/fonts/NotoSansKR-Regular.ttf": "bec8dbb27b423cafdf3e921c590d65a2",
"assets/fonts/NotoSansKR-SemiBold.ttf": "6929fa11db4b9b3f744f3307735c2dde",
"assets/NOTICES": "4bfeef2a4d83211664f1f0bb56317401",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "140ccb7d34d0a55065fbd422b843add6",
"canvaskit/canvaskit.js.symbols": "58832fbed59e00d2190aa295c4d70360",
"canvaskit/canvaskit.wasm": "07b9f5853202304d3b0749d9306573cc",
"canvaskit/chromium/canvaskit.js": "5e27aae346eee469027c80af0751d53d",
"canvaskit/chromium/canvaskit.js.symbols": "193deaca1a1424049326d4a91ad1d88d",
"canvaskit/chromium/canvaskit.wasm": "24c77e750a7fa6d474198905249ff506",
"canvaskit/skwasm.js": "1ef3ea3a0fec4569e5d531da25f34095",
"canvaskit/skwasm.js.symbols": "0088242d10d7e7d6d2649d1fe1bda7c1",
"canvaskit/skwasm.wasm": "264db41426307cfc7fa44b95a7772109",
"canvaskit/skwasm_heavy.js": "413f5b2b2d9345f37de148e2544f584f",
"canvaskit/skwasm_heavy.js.symbols": "3c01ec03b5de6d62c34e17014d1decd3",
"canvaskit/skwasm_heavy.wasm": "8034ad26ba2485dab2fd49bdd786837b",
"favicon.ico": "06760752f8306d9dfee6c53a5f940578",
"favicon.png": "8f494fda5804aafd39fd6a118f0383e2",
"flutter.js": "888483df48293866f9f41d3d9274a779",
"flutter_bootstrap.js": "c9070920e2042c42686b6afdee8dd3ee",
"googlef2362ae8f409974e.html": "c34f5761d6455aa63db62bace00a1ac7",
"icons/Icon-192.png": "b1c461094f5d9954dd88808b4200db6d",
"icons/Icon-512.png": "a38d68006437d7e6b250cd3808899481",
"icons/Icon-maskable-512.png": "0341e1e6f64f4ee8d165d6b72fffc6c1",
"index.html": "8d709baffc6c478a6f3cb6ae1f2931f0",
"/": "8d709baffc6c478a6f3cb6ae1f2931f0",
"main.dart.js": "338de097d0b76d95b419cad7c05cf1a5",
"manifest.json": "f81efd59342a304324c9f85f901e0acd",
"posts/00_img/00_noimage.webp": "b4ea514661378ec44dfe9d7edc5fa05f",
"posts/00_img/01_python.webp": "2d1af0f7d5700dd428c9437388bde998",
"posts/00_img/02_vba.webp": "32c2f81a7789ecedc012339f24ae7927",
"posts/00_img/03_flutter.webp": "46e1e47a8e7056da2d7f100c1bb39cea",
"posts/00_img/04_powerpoint.webp": "44e6769c60ca1f5219ee398322c44c94",
"posts/00_img/05_excel.webp": "c0b4a931f902c38e5082e7882cc8be56",
"posts/flutter/03997_fl_desktopshrortcut.md": "bae92b967682a04c9f5fa5770b116b13",
"posts/flutter/03998_fl_click_ani.md": "5a1066ce99119b164dbc344f5d1b401d",
"posts/flutter/03999_fl_hiding_key.md": "adf28611e660d7b0babedce3f57e5887",
"posts/index.json": "641504939176000a7b8d460561b50ec8",
"posts/life/05990_life_sigma56.md": "242dd7f3b62d9a8919beee16a8d47b08",
"posts/life/05991_life_elec_shutter.md": "2bba892f03ead3c6858b5cd414470dc7",
"posts/life/05992_life_melobuds.md": "172e94f6c931df499463fa021da4d0f4",
"posts/life/05993_life_window_resize.md": "93e6a7d7e3fdd52ca8e3b409a4932b0c",
"posts/life/05994_life_wide_lens.md": "5755b34d26a8ae347866bef1e5dbe2c3",
"posts/life/05995_life_ks_backup.md": "8e3435874cd135c794765eb9c53f6f4c",
"posts/life/05996_life_samyang75.md": "6f95919ec3a9ea7400d6993bd9236f97",
"posts/life/05997_life_camera_remote.md": "35b3446de10b29bad2639b77c928cdbb",
"posts/life/05998_life_newblog.md": "3d55e2cfb2464989d7b443e519e43364",
"posts/life/05999_life_viltrox_lens.md": "148122e1def6fffcdf0020ff5ad97f0d",
"posts/office/00993_ex_array_formula.md": "f04686547822eef4d08ff6e11f292a07",
"posts/office/00994_ex_fn_xlookup.md": "c5a808878f9a21c54dcc5e949767683e",
"posts/office/00995_ex_fn_numstring.md": "b9b88840c92ef28d51b7885f383b3792",
"posts/office/00996_ex_fn_index_match.md": "0a0fc42e83f8a457ed47a672705f90d2",
"posts/office/00997_ex_fn_vlookup_rank_dsum.md": "90f11ccc622427e49fb7e18658aac344",
"posts/office/00999_ex_copy_visible.md": "4d519b04c72eb2442238b6ee3e60d922",
"posts/office/0998_ex_error.md": "9ad1b52d8cf4422c770417fa99fa3485",
"posts/office_vba/01993_vba_projectunviewable.md": "06efc64ed6b84e321c8b4d7dfe138d18",
"posts/office_vba/01994_vba_lock_shape.md": "aab3b922c83175ac04aa2de49ff1f6c5",
"posts/office_vba/01995_vba_using_vba.md": "0e53463459d7652425c524cfaeb0df8b",
"posts/office_vba/01996_ppt_excel_table_copy.md": "d873169dda187a3abe912ec16f317a78",
"posts/office_vba/01999_mt_intro.md": "f881bfc17d6107a23b8eb58095a8f7d7",
"posts/python/02997_py_webp_convertor.md": "4a1ba833304ca51a190c04f3153dc373",
"posts/python/02998_py_move_file_ext.md": "f73ba739535deffe90aaea22a9f34e47",
"posts/python/02999_py_extracting_table_pdf.md": "cda00b33a11cd5d21fbcf688410a6048",
"robots.txt": "d39f0ba3d7d9ed546ed30b9da6ac85ac",
"version.json": "63d767112a66e87252ddc52fc4ca206c"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
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
        // Claim client to enable caching on first launch
        self.clients.claim();
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
      // Claim client to enable caching on first launch
      self.clients.claim();
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
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
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
