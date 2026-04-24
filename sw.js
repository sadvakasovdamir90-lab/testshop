const CACHE_NAME = 'qulanshop-v1';
const assets = [
  'index.html',
  'profile.html',
  'admin.html',
  'manifest.json'
];

// Орнату және файлдарды сақтау
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(assets))
  );
});

// Интернетсіз жұмыс істеу режимі
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyDyRiRE8tgUF-OANANOYQUzYSfl9vtsjuM",
    authDomain: "qulanmedia-96282.firebaseapp.com",
    projectId: "qulanmedia-96282",
    messagingSenderId: "1085151021799",
    appId: "1:1085151021799:web:4475b38903d829c560b042"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: 'https://i.yapx.ru/ddHXU.png',
        data: { url: payload.data ? payload.data.url : '/news.html' }
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});