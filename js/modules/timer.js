"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services/services");
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
exports.default = timer;
