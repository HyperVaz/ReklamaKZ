export function initTestimonialModal() {
    const modal = document.getElementById('testimonialModal');
    const modalImg = document.getElementById('testimonialModalImg');
    const closeBtn = document.querySelector('.close-testimonial');
    const testimonialCards = document.querySelectorAll('.card-testimonials');

    // Если нет необходимых элементов - выходим
    if (!modal || !modalImg) return;

    function openTestimonialModal(src) {
        modalImg.src = src;
        modal.style.display = 'flex';
    }

    function closeTestimonialModal() {
        modal.style.display = 'none';
    }

    // Обработчики для карточек
    testimonialCards.forEach(card => {
        const img = card.querySelector('img');
        if (img) {
            card.addEventListener('click', () => openTestimonialModal(img.src));
        }
    });

    // Закрытие по кнопке (только если кнопка существует)
    closeBtn?.addEventListener('click', closeTestimonialModal);

    // Закрытие по клику вне изображения
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeTestimonialModal();
        }
    });

    // Закрытие по Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeTestimonialModal();
        }
    });
}