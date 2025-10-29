let autoPlayInterval;

export function initGallery() {
    const slides = document.getElementById('slides');
    if (!slides) return;

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
}

function animateSlider() {
    const slides = document.getElementById('slides');
    const slide = document.querySelector('.slide');
    if (!slides || !slide) return;

    const slideWidth = slide.offsetWidth + 10;
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
    clearInterval(autoPlayInterval);

    const slides = document.getElementById('slides');
    const slide = document.querySelector('.slide');
    if (!slides || !slide) return;

    const slideWidth = slide.offsetWidth + 10;
    const currentTransform = getComputedStyle(slides).transform;
    const matrix = new DOMMatrix(currentTransform);
    const currentPosition = matrix.m41;

    slides.style.transition = 'transform 0.5s ease';
    slides.style.transform = `translateX(${currentPosition - (slideWidth * direction)}px)`;

    setTimeout(() => {
        restartAutoPlay();
    }, 400);
}

function restartAutoPlay() {
    clearInterval(autoPlayInterval);

    const slides = document.getElementById('slides');
    const slide = document.querySelector('.slide');
    if (!slides || !slide) return;

    const currentTransform = getComputedStyle(slides).transform;
    const matrix = new DOMMatrix(currentTransform);
    const currentPosition = matrix.m41;

    slides.style.transition = 'transform 120s linear';
    const targetPosition = currentPosition - (slide.offsetWidth + 10) * 4;
    slides.style.transform = `translateX(${targetPosition}px)`;

    setTimeout(() => {
        slides.style.transition = 'none';
        slides.style.transform = 'translateX(0)';
        setTimeout(() => {
            slides.style.transition = 'transform 120s linear';
            animateSlider();
        }, 50);
    }, 120000 - (Math.abs(currentPosition) / (slide.offsetWidth + 10) * 30000));
}

function openModal(imagePath) {
    const modalContent = document.getElementById('modalContent');
    if (!modalContent) return;

    modalContent.innerHTML = `<img src="${imagePath}" alt="Изображение">`;
    document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}