export function initScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTop');
    const header = document.querySelector('.header');

    if (!scrollBtn || !header) return;

    const toggleScrollButton = () => {
        scrollBtn.classList.toggle('show', window.pageYOffset > header.offsetHeight);
    };

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', toggleScrollButton);
}