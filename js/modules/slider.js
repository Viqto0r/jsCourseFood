"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services/services");
const slider = (props) => {
    let offset = 0;
    const { sliderWrapperSelector, sliderInnerSelector, nextBtnSelector, prevBtnSelector, slidesCountSelector, currentSlideNumberSelector, slideSelector, } = props;
    const sliderWrapper = document.querySelector(sliderWrapperSelector);
    const sliderInner = sliderWrapper.querySelector(sliderInnerSelector);
    const slides = sliderInner.querySelectorAll('.offer__slide');
    const slidesCount = document.querySelector(slidesCountSelector);
    const currentSlideNumber = document.querySelector(currentSlideNumberSelector);
    const prevSlideBtn = document.querySelector(prevBtnSelector);
    const nextSlideBtn = document.querySelector(nextBtnSelector);
    const slideWidth = window.getComputedStyle(sliderWrapper).width;
    const fixSlideSize = () => {
        slides.forEach((slide) => (slide.style.width = slideWidth));
    };
    prevSlideBtn.addEventListener('click', () => {
        const slideWidthInt = parseFloat(slideWidth);
        if (offset === 0) {
            offset = -(slideWidthInt * (slides.length - 1));
        }
        else {
            offset += slideWidthInt;
        }
        swapSlide(slideWidthInt);
    });
    nextSlideBtn.addEventListener('click', () => {
        const slideWidthInt = parseFloat(slideWidth);
        if (Math.abs(offset) === slideWidthInt * (slides.length - 1)) {
            offset = 0;
        }
        else {
            offset -= slideWidthInt;
        }
        swapSlide(slideWidthInt);
    });
    const swapSlide = (slideWidthInt) => {
        sliderInner.style.transform = `translateX(${offset}px)`;
        currentSlideNumber.textContent = `${(0, services_1.getZero)(Math.abs(offset) / slideWidthInt + 1)}`;
        activeDots(Math.abs(offset / slideWidthInt));
    };
    slidesCount.textContent = `${(0, services_1.getZero)(slides.length)}`;
    sliderInner.style.width = parseInt(slideWidth) * 4 + 'px';
    sliderInner.style.display = 'flex';
    sliderInner.style.transition = 'all 0.5s';
    sliderWrapper.style.overflow = 'hidden';
    sliderWrapper.style.position = 'relative';
    currentSlideNumber.textContent = `${(0, services_1.getZero)(offset + 1)}`;
    fixSlideSize();
    const dotsContainer = document.createElement('div');
    dotsContainer.classList.add('carousel-indicators');
    sliderWrapper.append(dotsContainer);
    const createDots = (count) => {
        const dots = [];
        for (let i = 0; i < count; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) {
                dot.classList.add('active');
            }
            dots.push(dot);
        }
        return dots;
    };
    dotsContainer.append(...createDots(slides.length));
    dotsContainer.addEventListener('click', (e) => {
        if (e.target instanceof Element) {
            if (e.target.classList.contains('dot')) {
                const idx = Array.from(dots).indexOf(e.target);
                const slideWidthInt = parseFloat(slideWidth);
                offset = slideWidthInt * -idx;
                swapSlide(slideWidthInt);
                activeDots(idx);
            }
        }
    });
    const dots = document.querySelectorAll('.dot');
    const activeDots = (n) => {
        dots.forEach((dot, idx) => {
            if (idx === n) {
                dot.classList.add('active');
            }
            else {
                dot.classList.remove('active');
            }
        });
    };
};
exports.default = slider;
