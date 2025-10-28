export function initAnimations() {
    initFadeIn();
    initBurgerScroll();
}

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

    fadeElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });

    fadeInOnScroll();
    window.addEventListener('scroll', fadeInOnScroll);
}

function initBurgerScroll() {
    const navToggle = document.querySelector('.nav-toggle');
    const header = document.querySelector('.header');

    if (!navToggle || !header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > header.offsetHeight) {
            navToggle.classList.add('hidden');
        } else {
            navToggle.classList.remove('hidden');
        }
    });
}