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
    }, 5000);
    var showModalByScroll = function () {
        var _a = document.documentElement, offsetHeight = _a.offsetHeight, clientHeight = _a.clientHeight;
        if (offsetHeight - clientHeight <= window.pageYOffset) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    };
    window.addEventListener('scroll', showModalByScroll);
});
