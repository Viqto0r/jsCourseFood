/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const calc = () => {
    let sex = localStorage.getItem('sex') || 'female', activity = +localStorage.getItem('activity') || 1.375, height, weight, age;
    const calcResult = document.querySelector('.calculating__result span');
    const calcInit = () => {
        calcResult.textContent = '____';
        deactivateBtns('div.calculating__choose-item', 'calculating__choose-item_active');
        activateBtns(`#${sex}`);
        activateBtns(`[data-ratio="${activity}"]`);
    };
    const setStaticInfo = (selector, activeClass) => {
        const btns = document.querySelectorAll(selector);
        btns.forEach((btn) => {
            btn.addEventListener('click', () => {
                deactivateBtns(selector, activeClass);
                btn.classList.add(activeClass);
                if (selector === '#gender div') {
                    const { id } = btn;
                    sex = id;
                    localStorage.setItem('sex', id);
                }
                else {
                    const ratio = btn.getAttribute('data-ratio');
                    activity = +ratio;
                    localStorage.setItem('activity', ratio);
                }
                calcTotal();
            });
        });
    };
    const setDynamicInfo = () => {
        const inputs = document.querySelectorAll('.calculating__choose input');
        inputs.forEach((input) => {
            input.addEventListener('input', (e) => {
                if (e.target instanceof HTMLInputElement) {
                    switch (e.target.id) {
                        case 'height':
                            height = +e.target.value;
                            break;
                        case 'weight':
                            weight = +e.target.value;
                            break;
                        case 'age':
                            age = +e.target.value;
                            break;
                    }
                    checkErrorField(e.target);
                }
                calcTotal();
            });
        });
    };
    const deactivateBtns = (selector, activeClass) => {
        const btns = document.querySelectorAll(selector);
        btns.forEach((btn) => {
            btn.classList.remove(activeClass);
        });
    };
    const activateBtns = (selecor) => {
        var _a;
        (_a = document
            .querySelector(selecor)) === null || _a === void 0 ? void 0 : _a.classList.add('calculating__choose-item_active');
    };
    const calcTotal = () => {
        let total;
        if (!height || !weight || !age) {
            calcResult.textContent = '____';
            return;
        }
        if (sex === 'male') {
            total = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * activity);
        }
        else {
            total = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * activity);
        }
        calcResult.textContent = String(total);
    };
    const validateInput = (str) => {
        return str.match(/\D/g);
    };
    const checkErrorField = (field) => {
        if (validateInput(field.value)) {
            field.style.border = '1px solid red';
        }
        else {
            field.style.border = 'none';
        }
    };
    setDynamicInfo();
    setStaticInfo('#gender div', 'calculating__choose-item_active');
    setStaticInfo('.calculating__choose_big div', 'calculating__choose-item_active');
    calcInit();
};
exports["default"] = calc;


/***/ }),

/***/ "./js/modules/card.js":
/*!****************************!*\
  !*** ./js/modules/card.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const card = () => {
    class Card {
        constructor(src, alt, title, description, price, parent, ...classes) {
            this.transfer = 27;
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.price = price;
            this.parent = document.querySelector(parent);
            this.convertToRub();
            this.classes = classes;
        }
        convertToRub() {
            this.price *= this.transfer;
        }
        createCardItem({ tag, className, text, src, alt }) {
            const item = document.createElement(tag);
            if (className) {
                item.classList.add(className);
            }
            if (text) {
                item.textContent = text;
            }
            if (src && alt && item instanceof HTMLImageElement) {
                item.src = src;
                item.alt = alt;
            }
            return item;
        }
        render() {
            const card = this.createCardItem({ tag: 'div', className: 'menu__item' });
            const img = this.createCardItem({
                tag: 'img',
                src: this.src,
                alt: this.alt,
            });
            const title = this.createCardItem({
                tag: 'h3',
                className: 'menu__item-subtitle',
                text: this.title,
            });
            const description = this.createCardItem({
                tag: 'div',
                className: 'menu__item-descr',
                text: this.description,
            });
            const divider = this.createCardItem({
                tag: 'div',
                className: 'menu__item-divider',
            });
            const price = this.createCardItem({
                tag: 'div',
                className: 'menu__item-price',
            });
            const cost = this.createCardItem({
                tag: 'div',
                className: 'menu__item-cost',
                text: 'Цена',
            });
            const total = this.createCardItem({
                tag: 'div',
                className: 'menu__item-total',
                text: ' руб/день',
            });
            const span = this.createCardItem({
                tag: 'span',
                text: String(this.price),
            });
            this.classes.forEach((className) => card.classList.add(className));
            total.prepend(span);
            price.append(cost, total);
            card.append(img, title, description, divider, price);
            this.parent.append(card);
        }
    }
    const getProducts = () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:3000/menu');
        return yield response.json();
    });
    getProducts().then((data) => {
        data.forEach(({ img, altimg, title, descr, price }) => {
            new Card(img, altimg, title, descr, price, '.menu .container').render();
        });
    });
};
exports["default"] = card;


/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const modal_1 = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
const forms = (formSelector, modalTImerId) => {
    const forms = document.querySelectorAll('form');
    let ResponseMessage;
    (function (ResponseMessage) {
        ResponseMessage["SUCCESS"] = "\u041C\u044B \u0441 \u0432\u0430\u043C\u0438 \u0441\u0432\u044F\u0436\u0435\u043C\u0441\u044F";
        ResponseMessage["LODADING"] = "img/form/spinner.svg";
        ResponseMessage["ERROR"] = "\u0427\u0442\u043E\u0442\u043E \u043F\u043E\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A...";
    })(ResponseMessage || (ResponseMessage = {}));
    const postData = (url, body) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            return yield response.json();
        }
        else {
            throw new Error('Ошибка');
        }
    });
    const bindPostData = (form) => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const img = document.createElement('img');
            img.src = ResponseMessage.LODADING;
            img.style.cssText = `
			display:block;
			margin: 0 auto;`;
            form.insertAdjacentElement('afterend', img);
            const obj = {};
            formData.forEach((value, key) => (obj[key] = value));
            postData('http://localhost:3000/requests', obj)
                .then((data) => {
                img.remove();
                console.log(data);
            })
                .then(() => {
                showThanksModal(ResponseMessage.SUCCESS);
            })
                .catch((err) => {
                console.error(err);
                showThanksModal(ResponseMessage.ERROR);
            })
                .finally(() => {
                form.reset();
            });
        });
    };
    forms.forEach((form) => bindPostData(form));
    const showThanksModal = (message) => {
        var _a;
        const prevModal = document.querySelector('.modal__dialog');
        if (prevModal instanceof HTMLElement) {
            prevModal.style.display = 'none';
        }
        (0, modal_1.openModal)(formSelector, modalTImerId);
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
			<div class="modal__content">
					<div class="modal__close" data-closemodal>×</div>
					<div class="modal__title">${message}</div>
			</div>
			`;
        (_a = document.querySelector('.modal')) === null || _a === void 0 ? void 0 : _a.append(thanksModal);
        setTimeout(() => {
            (0, modal_1.closeModal)(formSelector);
            if (prevModal instanceof HTMLElement) {
                prevModal.style.display = 'block';
            }
            thanksModal.remove();
        }, 2000);
    };
};
exports["default"] = forms;


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
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
exports["default"] = modal;


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const services_1 = __webpack_require__(/*! ../services/services */ "./js/services/services.js");
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
exports["default"] = slider;


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tabs = (tabSelector, tabActiveSelector, tabContentSelector, tabsParentSelector) => {
    const tabsParent = document.querySelector(tabsParentSelector);
    const tabs = tabsParent.querySelectorAll(tabSelector);
    const tabContent = document.querySelectorAll(tabContentSelector);
    const hideTabContent = () => {
        tabContent.forEach((item) => (item.style.display = 'none'));
        tabs.forEach((item) => item.classList.remove(tabActiveSelector));
    };
    const showTabContent = (idx = 0) => {
        tabContent[idx].style.display = 'block';
        tabs[idx].classList.add(tabActiveSelector);
    };
    tabsParent === null || tabsParent === void 0 ? void 0 : tabsParent.addEventListener('click', (e) => {
        if (e.target instanceof Element) {
            if (e.target && e.target.classList.contains(tabSelector))
                tabs.forEach((tab, idx) => {
                    if (e.target === tab) {
                        hideTabContent();
                        showTabContent(idx);
                    }
                });
        }
    });
    hideTabContent();
    showTabContent();
};
exports["default"] = tabs;


/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const services_1 = __webpack_require__(/*! ../services/services */ "./js/services/services.js");
const timer = (timerSelector, deadline) => {
    const getTimeRemaining = (deadline) => {
        const total = Date.parse(deadline) - Date.parse(String(new Date())), days = Math.floor(total / (1000 * 60 * 60 * 24)), hours = Math.floor((total / (1000 * 60 * 60)) % 24), minutes = Math.floor((total / (1000 * 60)) % 60), seconds = Math.floor((total / 1000) % 60);
        return {
            total,
            days,
            hours,
            minutes,
            seconds,
        };
    };
    const setTime = (selector, deadline) => {
        const timer = document.querySelector(selector), days = timer.querySelector('#days'), hours = timer.querySelector('#hours'), minutes = timer.querySelector('#minutes'), seconds = timer.querySelector('#seconds');
        const updateTime = () => {
            if (days && hours && minutes && seconds) {
                const time = getTimeRemaining(deadline);
                days.textContent = (0, services_1.getZero)(time.days);
                hours.textContent = (0, services_1.getZero)(time.hours);
                minutes.textContent = (0, services_1.getZero)(time.minutes);
                seconds.textContent = (0, services_1.getZero)(time.seconds);
                if (time.total <= 0) {
                    clearInterval(timeId);
                }
            }
        };
        updateTime();
        const timeId = setInterval(updateTime, 1000);
    };
    setTime(timerSelector, deadline);
};
exports["default"] = timer;


/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const calc_1 = __importDefault(__webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js"));
const card_1 = __importDefault(__webpack_require__(/*! ./modules/card */ "./js/modules/card.js"));
const forms_1 = __importDefault(__webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"));
const modal_1 = __importStar(__webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"));
const slider_1 = __importDefault(__webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js"));
const tabs_1 = __importDefault(__webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"));
const timer_1 = __importDefault(__webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"));
window.addEventListener('DOMContentLoaded', () => {
    const modalTImerId = setTimeout(() => {
        (0, modal_1.openModal)('.modal', modalTImerId);
    }, 500000000);
    (0, tabs_1.default)('.tabheader__item', 'tabheader__item_active', '.tabcontent', '.tabheader__items');
    (0, modal_1.default)('.modal', '[data-openModal]', modalTImerId);
    (0, timer_1.default)('.timer', '2023-07-30');
    (0, card_1.default)();
    (0, calc_1.default)();
    (0, forms_1.default)('.modal', modalTImerId);
    (0, slider_1.default)({
        sliderWrapperSelector: '.offer__slider-wrapper',
        currentSlideNumberSelector: '#current',
        nextBtnSelector: '.offer__slider-next',
        prevBtnSelector: '.offer__slider-prev',
        sliderInnerSelector: '.slider__inner',
        slidesCountSelector: '#total',
        slideSelector: '.offer__slide',
    });
});


/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getZero = void 0;
const getZero = (num) => {
    return num < 10 && num >= 0 ? `0${num}` : String(num);
};
exports.getZero = getZero;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./js/script.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map