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
    var deadline = '2023-04-30';
    var getZero = function (num) {
        return num < 9 ? "0".concat(num) : String(num);
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
    var closeModalBtn = modal.querySelector('[data-closeModal]');
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
    closeModalBtn === null || closeModalBtn === void 0 ? void 0 : closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
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
    var Card = /** @class */ (function () {
        function Card(src, alt, title, description, price, parent) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.price = price;
            this.parent = parent;
            this.transfer = 27;
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
            var _a;
            this.convertToRub();
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
            total.prepend(span);
            price.append(cost, total);
            card.append(img, title, description, divider, price);
            (_a = document.querySelector(this.parent)) === null || _a === void 0 ? void 0 : _a.append(card);
        };
        return Card;
    }());
    new Card('img/tabs/vegy.jpg', 'vegy', 'Меню "Фитнес"', 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 9, '.menu .container').render();
    new Card('img/tabs/elite.jpg', 'elite', 'Меню “Премиум”', 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 20, '.menu .container').render();
    new Card('img/tabs/post.jpg', 'post', 'Меню "Постное"', 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 16, '.menu .container').render();
});
