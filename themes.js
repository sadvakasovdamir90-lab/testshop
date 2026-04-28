document.addEventListener('DOMContentLoaded', () => {
    const theme = localStorage.getItem('current_holiday_theme');
    const body = document.body;

    // 1. БАРЛЫҚ МЕРЕКЕЛЕРГЕ ОРТАҚ ТАЗАЛАУ (Ескі эффектілерді өшіру)
    const removeOldEffects = () => {
        const snowflakes = document.querySelectorAll('.snowflake');
        snowflakes.forEach(s => s.remove());
        const ornaments = document.querySelectorAll('.nauryz-ornament');
        ornaments.forEach(o => o.remove());
    };

    removeOldEffects();

    // ❄️ ЖАҢА ЖЫЛ РЕЖИМІ
    if (theme === 'newyear') {
        const snowStyle = document.createElement('style');
        snowStyle.innerHTML = `
            .snowflake { color: #fff; font-size: 1.2em; position: fixed; top: -10%; z-index: 9999; pointer-events: none; animation: snow linear infinite; }
            @keyframes snow { to { transform: translateY(110vh) rotate(360deg); } }
        `;
        document.head.appendChild(snowStyle);

        for(let i=0; i<30; i++) {
            let flake = document.createElement('div');
            flake.className = 'snowflake';
            flake.innerText = '❄';
            flake.style.left = Math.random() * 100 + 'vw';
            flake.style.animationDuration = (Math.random() * 3 + 5) + 's';
            flake.style.opacity = Math.random();
            flake.style.fontSize = (Math.random() * 10 + 10) + 'px';
            document.body.appendChild(flake);
        }
    }

    // 🌸 НАУРЫЗ РЕЖИМІ
    else if (theme === 'nauryz') {
        const nauryzStyle = document.createElement('style');
        nauryzStyle.innerHTML = `
            .nauryz-ornament { position: fixed; bottom: 0; width: 100%; height: 50px; background: url('https://upload.wikimedia.org/wikipedia/commons/e/e0/Kazakh_ornament.svg') repeat-x; background-size: contain; z-index: 9998; opacity: 0.3; pointer-events: none; }
            .flower-petal { position: fixed; color: #ffb7c5; font-size: 20px; z-index: 9999; animation: falling 7s linear infinite; pointer-events: none; }
            @keyframes falling { to { transform: translateY(110vh) rotate(180deg); } }
        `;
        document.head.appendChild(nauryzStyle);

        // Төменге ою қосу
        let pattern = document.createElement('div');
        pattern.className = 'nauryz-ornament';
        document.body.appendChild(pattern);

        // Қызғалдақ/Гүл жапырақтарын жауғызу
        for(let i=0; i<15; i++) {
            let petal = document.createElement('div');
            petal.className = 'flower-petal';
            petal.innerText = '🌸';
            petal.style.left = Math.random() * 100 + 'vw';
            petal.style.animationDuration = (Math.random() * 5 + 5) + 's';
            petal.style.opacity = Math.random();
            document.body.appendChild(petal);
        }
    }

    // 🎖 ЖЕҢІС КҮНІ НЕМЕСЕ ТӘУЕЛСІЗДІК КҮНІ (Мысалы, сайттың фонын өзгерту)
    else if (theme === 'victory' || theme === 'independence') {
        body.style.filter = "sepia(0.2)"; // Жеңіл ретро немесе салтанатты эффект
        console.log("🎖 Патриоттық тақырып қосылды");
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const theme = localStorage.getItem('current_holiday_theme');
    
    // Ескі эффектілерді тазалау
    const cleanup = () => {
        document.querySelectorAll('.holiday-element').forEach(el => el.remove());
        document.body.style.filter = "none";
    };
    cleanup();

    // 🎖 ЖЕҢІС КҮНІ РЕЖИМІ (VICTORY)
    if (theme === 'victory') {
        const victoryStyle = document.createElement('style');
        victoryStyle.className = 'holiday-element';
        victoryStyle.innerHTML = `
            /* Салтанатты лента астында */
            .victory-line { 
                position: fixed; bottom: 0; width: 100%; height: 8px; 
                background: linear-gradient(90deg, #000 20%, #ff6600 20%, #ff6600 40%, #000 40%, #000 60%, #ff6600 60%, #ff6600 80%, #000 80%);
                z-index: 9999; 
            }
            /* Отшашу анимациясы */
            .firework {
                position: fixed; width: 4px; height: 4px; border-radius: 50%;
                z-index: 10000; pointer-events: none; animation: explode 2s ease-out infinite;
            }
            @keyframes explode {
                0% { transform: scale(1); opacity: 1; box-shadow: 0 0 0 white; }
                100% { transform: scale(20); opacity: 0; box-shadow: 0 0 40px red, 20px -20px 40px orange, -20px 20px 40px yellow; }
            }
        `;
        document.head.appendChild(victoryStyle);

        // Төменгі лентаны қосу
        const line = document.createElement('div');
        line.className = 'victory-line holiday-element';
        document.body.appendChild(line);

        // Кездейсоқ отшашулар жасау
        for(let i=0; i<10; i++) {
            let fw = document.createElement('div');
            fw.className = 'firework holiday-element';
            fw.style.left = Math.random() * 100 + 'vw';
            fw.style.top = Math.random() * 100 + 'vh';
            fw.style.animationDelay = Math.random() * 2 + 's';
            document.body.appendChild(fw);
        }
        console.log("🎖 День Победы: Эффекты активированы");
    }

    // ❄️ ЖАҢА ЖЫЛ ЖӘНЕ 🌸 НАУРЫЗ КОДТАРЫ ОСЫ ЖЕРДЕ ЖАЛҒАСА БЕРЕДІ...
});