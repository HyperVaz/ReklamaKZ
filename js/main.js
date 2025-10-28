import { initRippleEffect } from './ripple.js';
import { initGallery } from './gallery.js';
import { initMobileMenu } from './mobileMenu.js';
import { initProjectModal } from './projectModal.js';
import { initAnimations } from './animations.js';

document.addEventListener('DOMContentLoaded', function() {
    initRippleEffect();
    initMobileMenu();
    initAnimations();
    initProjectModal();
    initGallery();
});