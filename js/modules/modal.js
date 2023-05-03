"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openModal = exports.closeModal = void 0;
const closeModal = (selector) => {
    const modal = document.querySelector(selector);
    modal.style.display = '';
    document.body.style.overflow = 'auto';
};
exports.closeModal = closeModal;
const openModal = (selector, modalTImerId) => {
    const modal = document.querySelector(selector);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    clearTimeout(modalTImerId);
};
exports.openModal = openModal;
const modal = (modalSelector, openBtnsSelector, modalTImerId) => {
    const openModalBtns = document.querySelectorAll(openBtnsSelector);
    const modal = document.querySelector(modalSelector);
    openModalBtns.forEach((btn) => btn.addEventListener('click', () => (0, exports.openModal)(modalSelector, modalTImerId)));
    modal.addEventListener('click', (e) => {
        if (e.target === modal ||
            (e.target instanceof HTMLElement &&
                e.target.getAttribute('data-closemodal') === '')) {
            (0, exports.closeModal)(modalSelector);
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.style.display === 'block') {
            (0, exports.closeModal)(modalSelector);
        }
    });
    const showModalByScroll = () => {
        const { offsetHeight, clientHeight } = document.documentElement;
        if (offsetHeight - clientHeight <= window.pageYOffset) {
            (0, exports.openModal)(modalSelector, modalTImerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    };
    window.addEventListener('scroll', showModalByScroll);
};
exports.default = modal;
