export function initClientsSlider() {
    const track = document.querySelector('.clients-slider-track');
    const nextBtn = document.querySelector('.slider-btn.next');
    const prevBtn = document.querySelector('.slider-btn.prev');

    if (!track || !nextBtn) return;

    const slideWidth = document.querySelector('.client-slide').offsetWidth + 20;

    nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: slideWidth, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -slideWidth, behavior: 'smooth' });
    });
}