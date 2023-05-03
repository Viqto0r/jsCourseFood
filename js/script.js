"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const calc_1 = __importDefault(require("./modules/calc"));
const card_1 = __importDefault(require("./modules/card"));
const forms_1 = __importDefault(require("./modules/forms"));
const modal_1 = __importStar(require("./modules/modal"));
const slider_1 = __importDefault(require("./modules/slider"));
const tabs_1 = __importDefault(require("./modules/tabs"));
const timer_1 = __importDefault(require("./modules/timer"));
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
