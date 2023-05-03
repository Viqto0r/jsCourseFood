import calc from './modules/calc'
import card from './modules/card'
import forms from './modules/forms'
import modal, { openModal } from './modules/modal'
import slider from './modules/slider'
import tabs from './modules/tabs'
import timer from './modules/timer'

window.addEventListener('DOMContentLoaded', () => {
  const modalTImerId = setTimeout(() => {
    openModal('.modal', modalTImerId)
  }, 500000000)

  tabs(
    '.tabheader__item',
    'tabheader__item_active',
    '.tabcontent',
    '.tabheader__items'
  )
  modal('.modal', '[data-openModal]', modalTImerId)
  timer('.timer', '2023-07-30')
  card()
  calc()
  forms('.modal', modalTImerId)
  slider({
    sliderWrapperSelector: '.offer__slider-wrapper',
    currentSlideNumberSelector: '#current',
    nextBtnSelector: '.offer__slider-next',
    prevBtnSelector: '.offer__slider-prev',
    sliderInnerSelector: '.slider__inner',
    slidesCountSelector: '#total',
    slideSelector: '.offer__slide',
  })
})
