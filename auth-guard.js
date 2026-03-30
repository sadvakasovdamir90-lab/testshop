// Авторизацияны тексеру функциясы
function checkAuth(callback) {
    // LocalStorage-тан қолданушыны тексереміз
    const currentUser = localStorage.getItem('currentUser');

    if (!currentUser) {
        // Егер тіркелмеген болса - Premium Alert шығады
        Swal.fire({
            title: '<span class="font-black uppercase tracking-tighter">Нужен аккаунт</span>',
            html: `
                <div class="py-4">
                    <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed">
                        Чтобы совершить покупку, пожалуйста, <br>
                        <span class="text-orange-600">войдите в систему</span> или создайте профиль
                    </p>
                </div>
            `,
            icon: 'warning',
            iconColor: '#ea580c',
            showCancelButton: true,
            confirmButtonText: 'ВОЙТИ / РЕГИСТРАЦИЯ',
            cancelButtonText: 'ОТМЕНА',
            confirmButtonColor: '#000',
            cancelButtonColor: '#f3f4f6',
            customClass: {
                popup: 'rounded-[2.5rem] border-none shadow-2xl',
                confirmButton: 'rounded-2xl px-8 py-4 font-black uppercase text-[10px] tracking-widest',
                cancelButton: 'rounded-2xl px-8 py-4 font-black uppercase text-[10px] tracking-widest text-gray-400'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // Тіркелу бетіне бағыттау
                window.location.href = 'auth.html'; 
            }
        });
        return; // Функцияны тоқтату
    }

    // Егер тіркелген болса, негізгі әрекетті орындау (callback)
    if (callback) callback();
}

// Глобалды тексеру функциясы: Тіркелген бе?
function checkAuth(callback) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser) {
        // Егер тіркелмеген болса, әдемі терезе шығарамыз
        Swal.fire({
            title: '<span class="font-black uppercase tracking-tighter">Нужна авторизация</span>',
            html: `
                <div class="text-center p-2">
                    <p class="text-[11px] font-bold text-gray-500 uppercase leading-relaxed">
                        Чтобы совершить покупку или добавить товар в корзину, необходимо <span class="text-orange-600">войти в аккаунт</span>
                    </p>
                </div>
            `,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'ВОЙТИ / РЕГИСТРАЦИЯ',
            cancelButtonText: 'ПОЗЖЕ',
            confirmButtonColor: '#ea580c',
            cancelButtonColor: '#f3f4f6',
            customClass: {
                popup: 'rounded-[2.5rem]',
                confirmButton: 'rounded-2xl px-6 py-4 font-black uppercase text-[10px] tracking-widest',
                cancelButton: 'rounded-2xl px-6 py-4 font-black uppercase text-[10px] tracking-widest text-gray-400'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // Авторизация бетіне жіберу (Беттің атын өзгертіп ал: login.html немесе auth.html)
                window.location.href = 'auth.html'; 
            }
        });
        return false; // Әрекетті тоқтату
    }
    
    // Егер тіркелген болса, әрі қарай жалғастырамыз
    if (callback) callback();
    return true;
}


// Глобалды авторизацияны тексеру функциясы
function checkAuth(callback) {
    // LocalStorage-тан қолданушыны іздейміз
    const currentUser = localStorage.getItem('currentUser');

    if (!currentUser) {
        // Егер тіркелмеген болса - SweetAlert хабарламасы
        Swal.fire({
            title: '<span class="font-black uppercase tracking-tighter">Нужен аккаунт</span>',
            html: `
                <div class="p-2">
                    <p class="text-[11px] font-bold text-gray-500 uppercase leading-relaxed">
                        Чтобы совершить покупку, пожалуйста,<br>
                        <span class="text-orange-600">войдите в систему</span> или зарегистрируйтесь
                    </p>
                </div>
            `,
            icon: 'warning',
            iconColor: '#ea580c',
            showCancelButton: true,
            confirmButtonText: 'ВОЙТИ / РЕГИСТРАЦИЯ',
            cancelButtonText: 'ПОЗЖЕ',
            confirmButtonColor: '#000',
            cancelButtonColor: '#f3f4f6',
            customClass: {
                popup: 'rounded-[2.5rem] border-none shadow-2xl',
                confirmButton: 'rounded-2xl px-6 py-4 font-black uppercase text-[10px] tracking-widest',
                cancelButton: 'rounded-2xl px-6 py-4 font-black uppercase text-[10px] tracking-widest text-gray-400'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // Авторизация бетіне бағыттау
                window.location.href = 'auth.html'; 
            }
        });
        return; // Функцияны тоқтату
    }

    // Егер тіркелген болса, негізгі функцияны (callback) іске қосамыз
    if (callback) callback();
}

// Жаңартылған addToCart функциясы
function addToCart(id, name, price, icon) {
    // Егер функция ішінде checkAuth қолданғың келсе:
    const currentUser = localStorage.getItem('currentUser');
    
    if (!currentUser) {
        // Егер тіркелмеген болса, функцияны орындамаймыз, 
        // өйткені батырмадағы checkAuth өзі Alert шығарады
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
    updateCartBadge();
    showToast("Тауар себетке қосылды! 🛒");
}