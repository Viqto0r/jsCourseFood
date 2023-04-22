window.addEventListener('DOMContentLoaded', function () {
    //tabs
    var tabsParent = document.querySelector('.tabheader__items');
    var tabs = tabsParent === null || tabsParent === void 0 ? void 0 : tabsParent.querySelectorAll('.tabheader__item');
    var tabContent = document.querySelectorAll('.tabcontent');
    var hideTabContent = function () {
        tabContent === null || tabContent === void 0 ? void 0 : tabContent.forEach(function (item) { return (item.style.display = 'none'); });
        tabs === null || tabs === void 0 ? void 0 : tabs.forEach(function (item) { return item.classList.remove('tabheader__item_active'); });
    };
    var showTabContent = function (idx) {
        if (idx === void 0) { idx = 0; }
        ;
        tabContent[idx].style.display = 'block';
        tabs[idx].classList.add('tabheader__item_active');
    };
    tabsParent === null || tabsParent === void 0 ? void 0 : tabsParent.addEventListener('click', function (ev) {
        if (ev.target &&
            ev.target.classList.contains('tabheader__item'))
            tabs === null || tabs === void 0 ? void 0 : tabs.forEach(function (tab, idx) {
                if (ev.target === tab) {
                    hideTabContent();
                    showTabContent(idx);
                }
            });
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
        var timer = document.querySelector(selector), days = timer === null || timer === void 0 ? void 0 : timer.querySelector('#days'), hours = timer === null || timer === void 0 ? void 0 : timer.querySelector('#hours'), minutes = timer === null || timer === void 0 ? void 0 : timer.querySelector('#minutes'), seconds = timer === null || timer === void 0 ? void 0 : timer.querySelector('#seconds');
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
});
