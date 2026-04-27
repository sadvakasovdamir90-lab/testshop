importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-sw.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-sw.js');

firebase.initializeApp({
    apiKey: "AIzaSyDyRiRE8tgUF-OANANOYQUzYSfl9vtsjuM",
    projectId: "qulanmedia-96282",
    messagingSenderId: "1085151021799",
    appId: "1:1085151021799:web:4475b38903d829c560b042"
});
const messaging = firebase.messaging();