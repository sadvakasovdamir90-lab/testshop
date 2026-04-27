// 1. АВТОРИЗАЦИЯ ЖӘНЕ СЕССИЯНЫ ТЕКСЕРУ (ЖЕТІЛДІРІЛГЕН НҰСҚА)
function checkAuth(callbackOrUrl) {
    const currentUser = localStorage.getItem('currentUser');
    const lastAuthTime = localStorage.getItem('lastAuthTime');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const now = new Date().getTime();
    const oneHour = 60 * 60 * 1000; // 1 сағат

    // Тексеру: Логин жоқ болса немесе сессия уақыты (1 сағат) өтіп кетсе
    if (!isLoggedIn || !currentUser || !lastAuthTime || (now - lastAuthTime > oneHour)) {
        
        // Ескі деректерді тазалау
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('lastAuthTime');

        // SweetAlert бар-жоғын тексеру
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                title: '<span class="font-black uppercase italic tracking-tighter">Нужна авторизация</span>',
                html: `<div class="py-2"><p class="text-[11px] font-bold text-gray-500 uppercase leading-relaxed">
                       Сессия завершена или вы не вошли в систему.<br>
                       <span class="text-orange-600 font-black">Доступ активен только 1 час.</span></p></div>`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'ВОЙТИ',
                confirmButtonColor: '#ea580c',
                cancelButtonColor: '#1e293b',
                cancelButtonText: 'ОТМЕНА',
                background: '#ffffff',
                borderRadius: '2.5rem',
                customClass: { popup: 'rounded-[2.5rem] border-none shadow-2xl' }
            }).then((result) => {
                if (result.isConfirmed) {
                    // Бағытталатын бетті анықтау
                    const target = typeof callbackOrUrl === 'string' ? callbackOrUrl : window.location.href;
                    localStorage.setItem('redirectTarget', target);
                    window.location.href = 'auth.html'; 
                }
            });
        } else {
            // Егер SweetAlert жүктелмей қалса (Резервтік жол)
            if (confirm("Сессия аяқталды немесе жүйеге кірмедіңіз. Кіру бетіне өтесіз бе?")) {
                window.location.href = 'auth.html';
            }
        }
        return false;
    }

    // Егер бәрі дұрыс болса (Авторизацияланған)
    if (typeof callbackOrUrl === 'function') {
        callbackOrUrl();
    } else if (typeof callbackOrUrl === 'string') {
        window.location.href = callbackOrUrl;
    }
    return true;
}

// 2. СЕБЕТКЕ ҚОСУ (Өзгеріссіз қалды)
function addToCart(id, name, price, icon) {
    if (!localStorage.getItem('currentUser')) {
        checkAuth(); // Себетке қосар алдында тексеру
        return;
    }

    let cart = JSON.parse(localStorage.getItem('qulanCart')) || [];
    let existingItem = cart.find(item => String(item.id) === String(id));
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, icon, quantity: 1 });
    }
    
    localStorage.setItem('qulanCart', JSON.stringify(cart));
    if (typeof updateCartBadge === 'function') updateCartBadge();
    
    // Егер showToast функциясы болса, хабарлама шығару
    if (typeof showToast === 'function') {
        showToast(`${name} добавлен в корзину! 🛒`);
    }
}