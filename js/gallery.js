let autoPlayInterval;
let isPaused = false;
let animationStartTime;
let animationDuration = 40000;
let animationStartPosition;
let animationTargetPosition;
let slidesContainer;
let slideWidth;
let totalSlides;

export function initGallery() {
    const slides = document.getElementById('slides');
    if (!slides) return;

    slidesContainer = slides;

    // Получаем общее количество слайдов
    totalSlides = document.querySelectorAll('.slide').length;

    // Глобальные функции для кнопок слайдера
    window.moveSlider = moveSlider;
    window.openModal = openModal;
    window.closeModal = closeModal;

    // Запускаем анимацию
    animateSlider();

    // Закрытие модального окна по клику на фон
    document.getElementById('modal')?.addEventListener('click', function(e) {
        if (e.target === this) closeModal();
    });

    // Добавляем обработчики для паузы при наведении
    const sliderContainer = slides.closest('.slider-container') || slides.parentElement;
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', pauseSlider);
        sliderContainer.addEventListener('mouseleave', resumeSlider);
    }
}

function pauseSlider() {
    isPaused = true;
    if (!slidesContainer) return;

    // Сохраняем текущую позицию и останавливаем анимацию
    const currentTransform = getComputedStyle(slidesContainer).transform;
    slidesContainer.style.transform = currentTransform;
    slidesContainer.style.transition = 'none';
}

function resumeSlider() {
    if (!isPaused) return;

    isPaused = false;
    if (!slidesContainer) return;

    // Получаем текущую позицию
    const currentTransform = getComputedStyle(slidesContainer).transform;
    const matrix = new DOMMatrix(currentTransform);
    const currentPosition = matrix.m41;

    // Вычисляем оставшееся время анимации на основе прогресса
    const totalDistance = Math.abs(animationTargetPosition - animationStartPosition);
    const currentDistance = Math.abs(currentPosition - animationStartPosition);
    const progress = Math.min(currentDistance / totalDistance, 1);
    const elapsedTime = progress * animationDuration;
    const remainingTime = animationDuration - elapsedTime;

    // Продолжаем анимацию с оставшимся временем
    slidesContainer.style.transition = `transform ${remainingTime}ms linear`;
    slidesContainer.style.transform = `translateX(${animationTargetPosition}px)`;

    // Запланировать закольцовывание после завершения текущей анимации
    setTimeout(() => {
        if (!isPaused) {
            seamlessLoop();
        }
    }, remainingTime);
}

function animateSlider() {
    if (isPaused) return;

    const slide = document.querySelector('.slide');
    if (!slidesContainer || !slide) return;

    // Вычисляем ширину слайда
    slideWidth = slide.offsetWidth + 10;

    // Сохраняем параметры анимации для возможности возобновления
    animationStartPosition = 0;
    animationTargetPosition = -slideWidth * totalSlides;
    animationStartTime = Date.now();

    slidesContainer.style.transition = `transform ${animationDuration}ms linear`;
    slidesContainer.style.transform = `translateX(${animationTargetPosition}px)`;

    // Планируем закольцовывание
    setTimeout(() => {
        if (!isPaused) {
            seamlessLoop();
        }
    }, animationDuration);
}

function seamlessLoop() {
    if (!slidesContainer) return;

    // Бесшовное закольцовывание - мгновенно возвращаемся к началу
    slidesContainer.style.transition = 'none';
    slidesContainer.style.transform = 'translateX(0)';

    // Небольшая задержка перед началом новой анимации
    setTimeout(() => {
        if (!isPaused) {
            // Запускаем новую анимацию
            animateSlider();
        }
    }, 50);
}

function moveSlider(direction) {
    clearInterval(autoPlayInterval);
    isPaused = false;

    if (!slidesContainer) return;
    const slide = document.querySelector('.slide');
    if (!slide) return;

    // Обновляем ширину слайда если нужно
    if (!slideWidth) {
        slideWidth = slide.offsetWidth + 10;
    }

    const currentTransform = getComputedStyle(slidesContainer).transform;
    const matrix = new DOMMatrix(currentTransform);
    let currentPosition = matrix.m41;

    // Вычисляем новую позицию
    let newPosition = currentPosition - (slideWidth * direction);

    // Проверяем границы и обеспечиваем закольцовывание
    const maxPosition = -slideWidth * (totalSlides - 1);

    // Если вышли за правую границу (начало), переходим в конец
    if (newPosition > 0) {
        newPosition = maxPosition;
    }
    // Если вышли за левую границу (конец), переходим в начало
    else if (newPosition < -slideWidth * totalSlides) {
        newPosition = 0;
    }

    slidesContainer.style.transition = 'transform 0.5s ease';
    slidesContainer.style.transform = `translateX(${newPosition}px)`;

    setTimeout(() => {
        restartAutoPlay();
    }, 400);
}

function restartAutoPlay() {
    clearInterval(autoPlayInterval);
    isPaused = false;

    if (!slidesContainer) return;
    const slide = document.querySelector('.slide');
    if (!slide) return;

    // Обновляем ширину слайда если нужно
    if (!slideWidth) {
        slideWidth = slide.offsetWidth + 10;
    }

    const currentTransform = getComputedStyle(slidesContainer).transform;
    const matrix = new DOMMatrix(currentTransform);
    const currentPosition = matrix.m41;

    // Сохраняем параметры анимации для возможности возобновления
    animationStartPosition = currentPosition;
    animationTargetPosition = currentPosition - slideWidth * totalSlides;
    animationStartTime = Date.now();

    slidesContainer.style.transition = `transform ${animationDuration}ms linear`;
    slidesContainer.style.transform = `translateX(${animationTargetPosition}px)`;

    // Планируем закольцовывание
    setTimeout(() => {
        if (!isPaused) {
            seamlessLoop();
        }
    }, animationDuration);
}

// Остальные функции без изменений
function openModal(imagePath) {
    const modalContent = document.getElementById('modalContent');
    if (!modalContent) return;

    modalContent.innerHTML = `<img src="${imagePath}" alt="Изображение">`;
    document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}