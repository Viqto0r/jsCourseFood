"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = card;
