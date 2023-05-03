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
const modal_1 = require("./modal");
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
exports.default = forms;
