// Инициализация риппл-эффекта фона
document.addEventListener('DOMContentLoaded', function() {
    initRippleEffect();
    initMobileMenu();
    initFadeIn();
});

function initRippleEffect() {
    const rippleBg = document.querySelector('.ripple-bg');
    if (!rippleBg) return;

    const colors = JSON.parse(rippleBg.getAttribute('data-colors') || '["#ffea1d", "#ffd909", "#ffc800", "#ffe538", "#ffb81b"]');

    function createRipple() {
        const ripple = document.createElement('div');
        ripple.className = 'ripple';

        const size = Math.random() * 100 + 50;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const color = colors[Math.floor(Math.random() * colors.length)];

        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;
        ripple.style.left = `${x}%`;
        ripple.style.top = `${y}%`;
        ripple.style.backgroundColor = color;

        rippleBg.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 1000);
    }

    // Создаем несколько рипплов при загрузке
    for (let i = 0; i < 5; i++) {
        setTimeout(createRipple, i * 200);
    }

    // Периодическое создание новых рипплов
    setInterval(createRipple, 1000);
}

// Инициализация мобильного меню
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.main-nav ul');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Закрытие меню при клике на пункт (для мобильных)
        const navLinks = document.querySelectorAll('.main-nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('active');
                }
            });
        });
    }
}

// Инициализация анимации появления элементов
function initFadeIn() {
    const fadeElements = document.querySelectorAll('.fade-in');

    const fadeInOnScroll = function() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Сначала скрываем все элементы
    fadeElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });

    // Запускаем при загрузке
    fadeInOnScroll();

    // И при прокрутке
    window.addEventListener('scroll', fadeInOnScroll);
}