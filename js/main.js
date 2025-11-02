import { initRippleEffect } from './ripple.js';
import { initGallery } from './gallery.js';
import { initMobileMenu } from './mobileMenu.js';
import { initProjectModal } from './projectModal.js';
import { initPackageModal } from './projectModal.js';
import { initAnimations } from './animations.js';
import { initScrollToTop } from './scrollToTop.js';
import {initClientsSlider} from "./clientsSlider.js";
import {initTestimonialModal} from "./testimonialModal.js";

document.addEventListener('DOMContentLoaded', function() {
    initRippleEffect();
    initMobileMenu();
    initAnimations();
    initProjectModal();
    initPackageModal();
    initGallery();
    initScrollToTop();
    initClientsSlider();
    initTestimonialModal();
});
