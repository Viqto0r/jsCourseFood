"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getZero = void 0;
const getZero = (num) => {
    return num < 10 && num >= 0 ? `0${num}` : String(num);
};
exports.getZero = getZero;
