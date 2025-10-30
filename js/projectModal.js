export function initProjectModal() {
    const modal = document.getElementById('projectModal');
    const openBtn = document.querySelector('.payment__section .btn');
    const closeBtn = document.querySelector('.close-modal');
    const form = document.querySelector('.project-form');
    const phoneInput = document.querySelector('.project-form input[type="tel"]');
    const checkbox = document.getElementById('agreePolicy');
    const submitBtn = document.querySelector('.submit-btn');

    if (!modal || !openBtn) return;

    openBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    closeBtn?.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    function validateForm() {
        const isPhoneValid = phoneInput.value.trim().length >= 5;
        const isCheckboxChecked = checkbox.checked;
        submitBtn.disabled = !(isPhoneValid && isCheckboxChecked);
    }

    phoneInput?.addEventListener('input', validateForm);
    checkbox?.addEventListener('change', validateForm);

    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!submitBtn.disabled) {
            alert('Форма отправлена! Мы свяжемся с вами в ближайшее время.');
            modal.style.display = 'none';
            form.reset();
            submitBtn.disabled = true;
        }
    });
}
export function initPackageModal() {
    const modal = document.getElementById('packageModal');
    const openBtn = document.querySelector('.package .btn');
    const closeBtn = modal.querySelector('.close-modal');
    const form = modal.querySelector('.project-form');
    const phoneInput = form.querySelector('input[type="tel"]');
    const checkbox = document.getElementById('agreePolicyPackage');
    const submitBtn = form.querySelector('.submit-btn');

    if (!modal || !openBtn) return;

    openBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    closeBtn?.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    function validateForm() {
        const isPhoneValid = phoneInput.value.trim().length >= 5;
        const isCheckboxChecked = checkbox.checked;
        submitBtn.disabled = !(isPhoneValid && isCheckboxChecked);
    }

    phoneInput?.addEventListener('input', validateForm);
    checkbox?.addEventListener('change', validateForm);

    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!submitBtn.disabled) {
            alert('Форма отправлена! Мы свяжемся с вами в ближайшее время.');
            modal.style.display = 'none';
            form.reset();
            submitBtn.disabled = true;
        }
    });
}