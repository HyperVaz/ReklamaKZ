export function initRippleEffect() {
    const rippleBg = document.querySelector('.ripple-bg');
    if (!rippleBg) return;

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

    for (let i = 0; i < 5; i++) {
        setTimeout(createRipple, i * 200);
    }

    setInterval(createRipple, 1000);
}