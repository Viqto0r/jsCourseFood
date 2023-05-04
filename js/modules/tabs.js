"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tabs = (tabSelector, tabActiveSelector, tabContentSelector, tabsParentSelector) => {
    const tabsParent = document.querySelector(tabsParentSelector);
    const tabs = tabsParent.querySelectorAll(`.${tabSelector}`);
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
            if (e.target && e.target.classList.contains(tabSelector)) {
                console.log('click1');
                tabs.forEach((tab, idx) => {
                    if (e.target === tab) {
                        hideTabContent();
                        showTabContent(idx);
                    }
                });
            }
        }
    });
    hideTabContent();
    showTabContent();
};
exports.default = tabs;
