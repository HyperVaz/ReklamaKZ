// Инициализация риппл-эффекта фона

const slides = document.getElementById('slides');
let autoPlayInterval;

function animateSlider() {
    const slideWidth = document.querySelector('.slide').offsetWidth + 10;
    slides.style.transform = `translateX(-${slideWidth * 4}px)`;

    setTimeout(() => {
        slides.style.transition = 'none';
        slides.style.transform = 'translateX(0)';
        setTimeout(() => {
            slides.style.transition = 'transform 120s linear';
            animateSlider();
        }, 50);
    }, 120000);
}

function moveSlider(direction) {
    // Останавливаем авто-прокрутку при ручном управлении
    clearInterval(autoPlayInterval);

    const slideWidth = document.querySelector('.slide').offsetWidth + 10;
    const currentTransform = getComputedStyle(slides).transform;
    const matrix = new DOMMatrix(currentTransform);
    const currentPosition = matrix.m41; // текущее положение X

    slides.style.transition = 'transform 0.5s ease';
    slides.style.transform = `translateX(${currentPosition - (slideWidth * direction)}px)`;

    // Через 10 секунд возобновляем авто-прокрутку
    setTimeout(() => {
        restartAutoPlay();
    }, 400);
}

function restartAutoPlay() {
    clearInterval(autoPlayInterval);
    // Перезапускаем плавную анимацию
    const currentTransform = getComputedStyle(slides).transform;
    const matrix = new DOMMatrix(currentTransform);
    const currentPosition = matrix.m41;

    slides.style.transition = 'transform 120s linear';
    const targetPosition = currentPosition - (document.querySelector('.slide').offsetWidth + 10) * 4;
    slides.style.transform = `translateX(${targetPosition}px)`;

    setTimeout(() => {
        slides.style.transition = 'none';
        slides.style.transform = 'translateX(0)';
        setTimeout(() => {
            slides.style.transition = 'transform 120s linear';
            animateSlider();
        }, 50);
    }, 120000 - (Math.abs(currentPosition) / (document.querySelector('.slide').offsetWidth + 10) * 30000));
}

function openModal(imagePath) {
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `
                <img src="${imagePath}" alt="Изображение">
            `;
    document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Запускаем анимацию
animateSlider();

// Закрытие модалки по клику на фон
document.getElementById('modal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});

document.addEventListener('DOMContentLoaded', function() {
    initRippleEffect();
    initMobileMenu();
    initFadeIn();
});

function initRippleEffect() {
    const rippleBg = document.querySelector('.ripple-bg');
    if (!rippleBg) return;

    // Проверяем наличие data-colors и парсим безопасно
    const colorsAttr = rippleBg.getAttribute('data-colors');
    let colors;
    try {
        colors = colorsAttr ? JSON.parse(colorsAttr) : ["#ffea1d", "#ffd909", "#ffc800", "#ffe538", "#ffb81b"];
    } catch (e) {
        colors = ["#ffea1d", "#ffd909", "#ffc800", "#ffe538", "#ffb81b"];
    }

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
            if (ripple.parentNode === rippleBg) {
                ripple.remove();
            }
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
// Инициализация мобильного меню
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.main-nav ul');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation(); // Предотвращаем всплытие
            navMenu.classList.toggle('active');

            // Меняем иконку бургера на крестик при открытии
            if (navMenu.classList.contains('active')) {
                navToggle.innerHTML = '✕';
            } else {
                navToggle.innerHTML = '☰';
            }
        });

        // Закрытие меню при клике на ссылку
        const navLinks = document.querySelectorAll('.main-nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('active');
                    navToggle.innerHTML = '☰';
                }
            });
        });

        // Закрытие меню при клике вне его области
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.main-nav') && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.innerHTML = '☰';
            }
        });

        // Предотвращаем закрытие при клике на само меню
        navMenu.addEventListener('click', function(e) {
            e.stopPropagation();
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
