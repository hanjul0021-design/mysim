const CACHE_NAME = 'mye-app-v3';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// 설치 시 캐시 저장 및 즉시 활성화
self.addEventListener('install', (event) => {
  self.skipWaiting(); // 대기 없이 즉시 활성화
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 활성화 시 구 버전 캐시 삭제 및 클라이언트 제어권 획득
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    Promise.all([
      self.clients.claim(), // 즉시 제어권 획득
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    ])
  );
});

// 요청 가로채기
self.addEventListener('fetch', (event) => {
  // 1. 페이지 이동 요청(Navigation)인 경우 무조건 index.html 반환 (SPA 라우팅 지원)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      caches.match('./index.html').then((response) => {
        return response || fetch(event.request).catch(() => {
           // 오프라인이거나 네트워크 실패 시에도 캐시된 index.html 반환 시도
           return caches.match('./index.html');
        });
      })
    );
    return;
  }

  // 2. 그 외 리소스 요청 (이미지, 스크립트 등)
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // 캐시에 있으면 반환, 없으면 네트워크 요청
        return response || fetch(event.request);
      })
  );
});