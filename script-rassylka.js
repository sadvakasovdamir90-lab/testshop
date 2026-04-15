// --- ГЛОБАЛДЫ ХАБАРЛАМАЛАР ЖҮЙЕСІ (БАРЛЫҚ БЕТ ҮШІН) ---
// 1. Хабарламалар келіп түскенде сақтау және санын көрсету
window.addEventListener('storage', (event) => {
    if (event.key === 'global_push_signal' && event.newValue) {
        const data = JSON.parse(event.newValue);
        
        // Хабарламалар тарихын алу
        let notifications = JSON.parse(localStorage.getItem('user_notifications')) || [];
        
        // Жана хабарлама қосу (оқылмаған күйде)
        notifications.push({
            id: Date.now(),
            message: data.message,
            time: new Date().toLocaleTimeString().slice(0, 5),
            isRead: false // МАҢЫЗДЫ: Жаңа хабарлама әлі оқылған жоқ
        });
        
        localStorage.setItem('user_notifications', JSON.stringify(notifications));
        updateNotifyBadge(); // Санағышты жаңарту
        renderNotifications(); // Тізімді жаңарту
    }
});

// 2. Оқылмаған хабарламалар санын есептеу және көрсету
function updateNotifyBadge() {
    const notifications = JSON.parse(localStorage.getItem('user_notifications')) || [];
    const unreadCount = notifications.filter(n => n.isRead === false).length;
    const badge = document.getElementById('notify-count');

    if (unreadCount > 0) {
        badge.innerText = unreadCount;
        badge.classList.remove('hidden');
    } else {
        badge.classList.add('hidden');
    }
}

// 3. Мәзірді ашқанда барлығын "Оқылды" деп белгілеу
function toggleNotifyMenu() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) return; // Тіркелмеген болса ашпау

    const dropdown = document.getElementById('notify-dropdown');
    dropdown.classList.toggle('hidden');

    // Егер меню ашылса, барлық хабарламаны оқылды қылу
    if (!dropdown.classList.contains('hidden')) {
        let notifications = JSON.parse(localStorage.getItem('user_notifications')) || [];
        notifications.forEach(n => n.isRead = true); // Барлығын "оқылды" қылу
        localStorage.setItem('user_notifications', JSON.stringify(notifications));
        
        setTimeout(updateNotifyBadge, 500); // Санағышты жаңарту (сәл кідіріспен)
    }
}

// Бет жүктелгенде санағышты тексеру
document.addEventListener('DOMContentLoaded', updateNotifyBadge);
function showGlobalPush(msg) {
    // 1. Дыбыстық сигнал (Kaspi-дің хабарламасы сияқты)
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3');
    audio.play().catch(() => console.log("Дыбыс үшін бетпен әрекет керек"));

    // 2. SweetAlert2 арқылы хабарлама шығару
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            title: '<div class="text-[10px] font-black uppercase text-orange-600 tracking-[0.3em] mb-2 italic">QulanShop News</div>',
            html: `
                <div class="text-center p-2">
                    <div class="w-16 h-16 bg-orange-50 rounded-[1.8rem] flex items-center justify-center mx-auto mb-5 shadow-inner">
                        <i class="fas fa-bolt text-orange-600 text-2xl"></i>
                    </div>
                    <p class="text-[13px] font-black italic uppercase text-slate-800 leading-relaxed tracking-tight">${msg}</p>
                </div>
            `,
            timer: 15000, // 15 секунд тұрады
            timerProgressBar: true,
            confirmButtonText: 'ТҮСІНІКТІ',
            confirmButtonColor: '#ea580c',
            showCloseButton: true,
            customClass: {
                popup: 'rounded-[2.5rem] border-4 border-orange-500 shadow-2xl animate-modal'
            }
        });
    } else {
        // Егер кейбір бетте Swal жүктелмеген болса, стандартты alert шығады
        alert("QulanShop: " + msg);
    }
}


const NOTIFY_DB = 'qulanshop_notifications';
const MONTH_MS = 30 * 24 * 60 * 60 * 1000;

document.addEventListener('DOMContentLoaded', () => {
    // 1. Тек тіркелгендерге көрсету
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
        document.getElementById('notify-wrapper').classList.remove('hidden');
        autoCleanNotifications();
        checkNewNotify();
    }
});

// 2. 30 күннен асқанды өшіру
function autoCleanNotifications() {
    let list = JSON.parse(localStorage.getItem(NOTIFY_DB)) || [];
    const now = Date.now();
    list = list.filter(n => (now - n.id) < MONTH_MS);
    localStorage.setItem(NOTIFY_DB, JSON.stringify(list));
}

// 3. Менюді ашу
function toggleNotifyMenu() {
    const menu = document.getElementById('notify-dropdown');
    menu.classList.toggle('hidden');
    if (!menu.classList.contains('hidden')) {
        document.getElementById('notify-dot').classList.add('hidden');
        renderNotifyItems('all');
    }
}

// 4. Категориялар мен тізімді шығару
function renderNotifyItems(activeTab) {
    const list = JSON.parse(localStorage.getItem(NOTIFY_DB)) || [];
    const tabsBox = document.getElementById('notify-tabs');
    const listBox = document.getElementById('notify-list');

    // Категорияларды топтау
    const categories = ['all', ...new Set(list.map(n => n.category))];
    tabsBox.innerHTML = categories.map(cat => {
        const count = cat === 'all' ? list.length : list.filter(n => n.category === cat).length;
        return `<span onclick="renderNotifyItems('${cat}')" class="notify-tab ${activeTab === cat ? 'active' : ''}">${cat === 'all' ? 'Бәрі' : cat} (${count})</span>`;
    }).join('');

    const filtered = activeTab === 'all' ? list : list.filter(n => n.category === activeTab);

    if (filtered.length === 0) {
        listBox.innerHTML = `<div class="py-12 text-center text-gray-300 font-bold text-[10px] uppercase italic">Хабарлама жоқ</div>`;
        return;
    }

    listBox.innerHTML = filtered.reverse().map(n => `
        <div onclick="notifyAction('${n.link}')" class="notify-card">
            <div class="flex justify-between items-center mb-1">
                <span class="text-[8px] font-black text-orange-600 uppercase italic tracking-widest">${n.category}</span>
                <span class="text-[8px] text-gray-300 font-bold">${n.time}</span>
            </div>
            <p class="text-[12px] font-bold text-slate-700 leading-tight uppercase italic">${n.message}</p>
        </div>
    `).join('');
}

// 5. Лақтыру (Redirect)
function notifyAction(link) {
    if (link && link !== '#') {
        window.location.href = link;
    }
}

// 6. Жаңа хабарлама келуі
window.addEventListener('storage', (e) => {
    // Егер сигнал келсе
    if (e.key === 'global_push_signal' && e.newValue) {
        const data = JSON.parse(e.newValue);
        
        // Тек тіркелген қолданушы болса ғана сақтаймыз
        if (localStorage.getItem('isLoggedIn') === 'true') {
            let list = JSON.parse(localStorage.getItem('qulanshop_notifications')) || [];
            
            // Жаңа хабарламаны тізімге қосу
            // Мұнда data.message өзгеріссіз (кіші/үлкен әріп сақталып) қосылады
            list.push({
                id: data.id || Date.now(),
                message: data.message, // Мәтін регистрі сақталады
                category: data.category || 'Общее',
                link: data.link || '#',
                time: data.time || new Date().toLocaleTimeString().slice(0, 5)
            });
            
            localStorage.setItem('qulanshop_notifications', JSON.stringify(list));
            
            // Қызыл нүктені жағу
            const dot = document.getElementById('notify-dot');
            if (dot) dot.classList.remove('hidden');
            
            // Егер iPhone стиліндегі Push болса, оны да көрсету
            if (typeof showMobileStyledPush === 'function') {
                showMobileStyledPush(data.message);
            }
        }
    }
});