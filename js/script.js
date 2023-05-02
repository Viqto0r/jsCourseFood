var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
window.addEventListener('DOMContentLoaded', function () {
    //tabs
    var tabsParent = document.querySelector('.tabheader__items');
    var tabs = tabsParent.querySelectorAll('.tabheader__item');
    var tabContent = document.querySelectorAll('.tabcontent');
    var hideTabContent = function () {
        tabContent.forEach(function (item) { return (item.style.display = 'none'); });
        tabs.forEach(function (item) { return item.classList.remove('tabheader__item_active'); });
    };
    var showTabContent = function (idx) {
        if (idx === void 0) { idx = 0; }
        tabContent[idx].style.display = 'block';
        tabs[idx].classList.add('tabheader__item_active');
    };
    tabsParent === null || tabsParent === void 0 ? void 0 : tabsParent.addEventListener('click', function (e) {
        if (e.target instanceof Element) {
            if (e.target && e.target.classList.contains('tabheader__item'))
                tabs.forEach(function (tab, idx) {
                    if (e.target === tab) {
                        hideTabContent();
                        showTabContent(idx);
                    }
                });
        }
    });
    hideTabContent();
    showTabContent();
    var deadline = '2023-07-30';
    var getZero = function (num) {
        return num < 10 && num > 0 ? "0".concat(num) : String(num);
    };
    var getTimeRemaining = function (deadline) {
        var total = Date.parse(deadline) - Date.parse(String(new Date())), days = Math.floor(total / (1000 * 60 * 60 * 24)), hours = Math.floor((total / (1000 * 60 * 60)) % 24), minutes = Math.floor((total / (1000 * 60)) % 60), seconds = Math.floor((total / 1000) % 60);
        return {
            total: total,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };
    };
    var setTime = function (selector, deadline) {
        var timer = document.querySelector(selector), days = timer.querySelector('#days'), hours = timer.querySelector('#hours'), minutes = timer.querySelector('#minutes'), seconds = timer.querySelector('#seconds');
        var updateTime = function () {
            if (days && hours && minutes && seconds) {
                var time = getTimeRemaining(deadline);
                days.textContent = getZero(time.days);
                hours.textContent = getZero(time.hours);
                minutes.textContent = getZero(time.minutes);
                seconds.textContent = getZero(time.seconds);
                if (time.total <= 0) {
                    clearInterval(timeId);
                }
            }
        };
        updateTime();
        var timeId = setInterval(updateTime, 1000);
    };
    setTime('.timer', deadline);
    // Modal
    var openModalBtns = document.querySelectorAll('[data-openModal]');
    var modal = document.querySelector('.modal');
    var closeModal = function () {
        modal.style.display = '';
        document.body.style.overflow = 'auto';
    };
    var openModal = function () {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        clearTimeout(modalTImerId);
    };
    openModalBtns.forEach(function (btn) { return btn.addEventListener('click', openModal); });
    modal.addEventListener('click', function (e) {
        if (e.target === modal ||
            (e.target instanceof HTMLElement &&
                e.target.getAttribute('data-closemodal') === '')) {
            closeModal();
        }
    });
    document.addEventListener('keydown', function (e) {
        if (e.code === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    var modalTImerId = setTimeout(function () {
        openModal();
    }, 500000000);
    var showModalByScroll = function () {
        var _a = document.documentElement, offsetHeight = _a.offsetHeight, clientHeight = _a.clientHeight;
        if (offsetHeight - clientHeight <= window.pageYOffset) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    };
    window.addEventListener('scroll', showModalByScroll);
    var getProducts = function () { return __awaiter(_this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('http://localhost:3000/menu')];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var Card = /** @class */ (function () {
        function Card(src, alt, title, description, price, parent) {
            var classes = [];
            for (var _i = 6; _i < arguments.length; _i++) {
                classes[_i - 6] = arguments[_i];
            }
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
        Card.prototype.convertToRub = function () {
            this.price *= this.transfer;
        };
        Card.prototype.createCardItem = function (_a) {
            var tag = _a.tag, className = _a.className, text = _a.text, src = _a.src, alt = _a.alt;
            var item = document.createElement(tag);
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
        };
        Card.prototype.render = function () {
            var card = this.createCardItem({ tag: 'div', className: 'menu__item' });
            var img = this.createCardItem({
                tag: 'img',
                src: this.src,
                alt: this.alt
            });
            var title = this.createCardItem({
                tag: 'h3',
                className: 'menu__item-subtitle',
                text: this.title
            });
            var description = this.createCardItem({
                tag: 'div',
                className: 'menu__item-descr',
                text: this.description
            });
            var divider = this.createCardItem({
                tag: 'div',
                className: 'menu__item-divider'
            });
            var price = this.createCardItem({
                tag: 'div',
                className: 'menu__item-price'
            });
            var cost = this.createCardItem({
                tag: 'div',
                className: 'menu__item-cost',
                text: 'Цена'
            });
            var total = this.createCardItem({
                tag: 'div',
                className: 'menu__item-total',
                text: ' руб/день'
            });
            var span = this.createCardItem({
                tag: 'span',
                text: String(this.price)
            });
            this.classes.forEach(function (className) { return card.classList.add(className); });
            total.prepend(span);
            price.append(cost, total);
            card.append(img, title, description, divider, price);
            this.parent.append(card);
        };
        return Card;
    }());
    //Forms
    var forms = document.querySelectorAll('form');
    var ResponseMessage;
    (function (ResponseMessage) {
        ResponseMessage["SUCCESS"] = "\u041C\u044B \u0441 \u0432\u0430\u043C\u0438 \u0441\u0432\u044F\u0436\u0435\u043C\u0441\u044F";
        ResponseMessage["LODADING"] = "img/form/spinner.svg";
        ResponseMessage["ERROR"] = "\u0427\u0442\u043E\u0442\u043E \u043F\u043E\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A...";
    })(ResponseMessage || (ResponseMessage = {}));
    getProducts().then(function (data) {
        data.forEach(function (_a) {
            var img = _a.img, altimg = _a.altimg, title = _a.title, descr = _a.descr, price = _a.price;
            new Card(img, altimg, title, descr, price, '.menu .container').render();
        });
        var postData = function (url, body) { return __awaiter(_this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(url, {
                            method: 'POST',
                            body: JSON.stringify(body),
                            headers: { 'Content-Type': 'application/json' }
                        })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: throw new Error('Ошибка');
                }
            });
        }); };
        var bindPostData = function (form) {
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                var formData = new FormData(form);
                var img = document.createElement('img');
                img.src = ResponseMessage.LODADING;
                img.style.cssText = "\n\t\t\tdisplay:block;\n\t\t\tmargin: 0 auto;";
                form.insertAdjacentElement('afterend', img);
                var obj = {};
                formData.forEach(function (value, key) { return (obj[key] = value); });
                postData('http://localhost:3000/requests', obj)
                    .then(function (data) {
                    img.remove();
                    console.log(data);
                })
                    .then(function () {
                    showThanksModal(ResponseMessage.SUCCESS);
                })["catch"](function (err) {
                    console.error(err);
                    showThanksModal(ResponseMessage.ERROR);
                })["finally"](function () {
                    form.reset();
                });
            });
        };
        forms.forEach(function (form) { return bindPostData(form); });
        var showThanksModal = function (message) {
            var _a;
            var prevModal = document.querySelector('.modal__dialog');
            if (prevModal instanceof HTMLElement) {
                prevModal.style.display = 'none';
            }
            openModal();
            var thanksModal = document.createElement('div');
            thanksModal.classList.add('modal__dialog');
            thanksModal.innerHTML = "\n\t\t\t<div class=\"modal__content\">\n\t\t\t\t\t<div class=\"modal__close\" data-closemodal>\u00D7</div>\n\t\t\t\t\t<div class=\"modal__title\">".concat(message, "</div>\n\t\t\t</div>\n\t\t\t");
            (_a = document.querySelector('.modal')) === null || _a === void 0 ? void 0 : _a.append(thanksModal);
            setTimeout(function () {
                closeModal();
                if (prevModal instanceof HTMLElement) {
                    prevModal.style.display = 'block';
                }
                thanksModal.remove();
            }, 2000);
        };
    });
    //slider
    var offset = 0;
    var sliderWrapper = document.querySelector('.offer__slider-wrapper');
    var sliderInner = sliderWrapper.querySelector('.slider__inner');
    var slides = sliderInner.querySelectorAll('.offer__slide');
    var slidesCount = document.querySelector('#total');
    var currentSlide = document.querySelector('#current');
    var prevSlideBtn = document.querySelector('.offer__slider-prev');
    var nextSlideBtn = document.querySelector('.offer__slider-next');
    var slideWidth = window.getComputedStyle(sliderWrapper).width;
    var fixSlideSize = function () {
        slides.forEach(function (slide) { return (slide.style.width = slideWidth); });
    };
    prevSlideBtn.addEventListener('click', function () {
        var slideWidthInt = parseFloat(slideWidth);
        if (offset === 0) {
            offset = -(slideWidthInt * (slides.length - 1));
        }
        else {
            offset += slideWidthInt;
        }
        swapSlide(slideWidthInt);
    });
    nextSlideBtn.addEventListener('click', function () {
        var slideWidthInt = parseFloat(slideWidth);
        if (Math.abs(offset) === slideWidthInt * (slides.length - 1)) {
            offset = 0;
        }
        else {
            offset -= slideWidthInt;
        }
        swapSlide(slideWidthInt);
    });
    var swapSlide = function (slideWidthInt) {
        sliderInner.style.transform = "translateX(".concat(offset, "px)");
        currentSlide.textContent = "".concat(getZero(Math.abs(offset) / slideWidthInt + 1));
        activeDots(Math.abs(offset / slideWidthInt));
    };
    slidesCount.textContent = "".concat(getZero(slides.length));
    sliderInner.style.width = parseInt(slideWidth) * 4 + 'px';
    sliderInner.style.display = 'flex';
    sliderInner.style.transition = 'all 0.5s';
    sliderWrapper.style.overflow = 'hidden';
    sliderWrapper.style.position = 'relative';
    currentSlide.textContent = "".concat(getZero(offset + 1));
    fixSlideSize();
    var dotsContainer = document.createElement('div');
    dotsContainer.classList.add('carousel-indicators');
    sliderWrapper.append(dotsContainer);
    var createDots = function (count) {
        var dots = [];
        for (var i = 0; i < count; i++) {
            var dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) {
                dot.classList.add('active');
            }
            dots.push(dot);
        }
        return dots;
    };
    dotsContainer.append.apply(dotsContainer, createDots(slides.length));
    dotsContainer.addEventListener('click', function (e) {
        if (e.target instanceof Element) {
            if (e.target.classList.contains('dot')) {
                var idx = Array.from(dots).indexOf(e.target);
                var slideWidthInt = parseFloat(slideWidth);
                offset = slideWidthInt * -idx;
                swapSlide(slideWidthInt);
                activeDots(idx);
            }
        }
    });
    var dots = document.querySelectorAll('.dot');
    var activeDots = function (n) {
        dots.forEach(function (dot, idx) {
            if (idx === n) {
                dot.classList.add('active');
            }
            else {
                dot.classList.remove('active');
            }
        });
    };
    var sex = localStorage.getItem('sex') || 'female', activity = +localStorage.getItem('activity') || 1.375, height, weight, age;
    var calcResult = document.querySelector('.calculating__result span');
    var calcInit = function () {
        calcResult.textContent = '____';
        deactivateBtns('div.calculating__choose-item', 'calculating__choose-item_active');
        activateBtns("#".concat(sex));
        activateBtns("[data-ratio=\"".concat(activity, "\"]"));
    };
    var setStaticInfo = function (selector, activeClass) {
        var btns = document.querySelectorAll(selector);
        btns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                deactivateBtns(selector, activeClass);
                btn.classList.add(activeClass);
                if (selector === '#gender div') {
                    var id = btn.id;
                    sex = id;
                    localStorage.setItem('sex', id);
                }
                else {
                    var ratio = btn.getAttribute('data-ratio');
                    activity = +ratio;
                    localStorage.setItem('activity', ratio);
                }
                calcTotal();
            });
        });
    };
    var setDynamicInfo = function () {
        var inputs = document.querySelectorAll('.calculating__choose input');
        inputs.forEach(function (input) {
            input.addEventListener('input', function (e) {
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
    var deactivateBtns = function (selector, activeClass) {
        var btns = document.querySelectorAll(selector);
        btns.forEach(function (btn) {
            btn.classList.remove(activeClass);
        });
    };
    var activateBtns = function (selecor) {
        var _a;
        (_a = document
            .querySelector(selecor)) === null || _a === void 0 ? void 0 : _a.classList.add('calculating__choose-item_active');
    };
    var calcTotal = function () {
        var total;
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
    var validateInput = function (str) {
        return str.match(/\D/g);
    };
    var checkErrorField = function (field) {
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
});
