window.addEventListener('DOMContentLoaded', () => {
  //tabs
  const tabsParent: HTMLElement = document.querySelector('.tabheader__items')!
  const tabs: NodeListOf<HTMLElement> =
    tabsParent.querySelectorAll('.tabheader__item')
  const tabContent: NodeListOf<HTMLElement> =
    document.querySelectorAll('.tabcontent')

  const hideTabContent = () => {
    tabContent.forEach((item) => ((item as HTMLElement).style.display = 'none'))

    tabs.forEach((item) => item.classList.remove('tabheader__item_active'))
  }

  const showTabContent = (idx = 0) => {
    tabContent[idx].style.display = 'block'
    tabs[idx].classList.add('tabheader__item_active')
  }

  tabsParent?.addEventListener('click', (e: Event) => {
    if (e.target instanceof Element) {
      if (e.target && e.target.classList.contains('tabheader__item'))
        tabs.forEach((tab, idx) => {
          if (e.target === tab) {
            hideTabContent()
            showTabContent(idx)
          }
        })
    }
  })

  hideTabContent()
  showTabContent()

  //timer

  interface TimeRemaining {
    total: number
    days: number
    hours: number
    minutes: number
    seconds: number
  }
  const deadline = '2023-04-30'

  const getZero = (num: number) => {
    return num < 9 ? `0${num}` : String(num)
  }

  const getTimeRemaining = (deadline: string): TimeRemaining => {
    const total = Date.parse(deadline) - Date.parse(String(new Date())),
      days = Math.floor(total / (1000 * 60 * 60 * 24)),
      hours = Math.floor((total / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((total / (1000 * 60)) % 60),
      seconds = Math.floor((total / 1000) % 60)

    return {
      total,
      days,
      hours,
      minutes,
      seconds,
    }
  }

  const setTime = (selector: string, deadline: string) => {
    const timer = document.querySelector(selector)!,
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds')

    const updateTime = () => {
      if (days && hours && minutes && seconds) {
        const time = getTimeRemaining(deadline)

        days.textContent = getZero(time.days)
        hours.textContent = getZero(time.hours)
        minutes.textContent = getZero(time.minutes)
        seconds.textContent = getZero(time.seconds)

        if (time.total <= 0) {
          clearInterval(timeId)
        }
      }
    }
    updateTime()

    const timeId = setInterval(updateTime, 1000)
  }

  setTime('.timer', deadline)

  // Modal

  const openModalBtns = document.querySelectorAll('[data-openModal]')
  const modal: HTMLElement = document.querySelector('.modal')!
  const closeModalBtn = modal!.querySelector('[data-closeModal]')

  const closeModal = () => {
    modal.style.display = ''
    document.body.style.overflow = 'auto'
  }

  const openModal = () => {
    modal.style.display = 'block'
    document.body.style.overflow = 'hidden'
    clearTimeout(modalTImerId)
  }

  openModalBtns.forEach((btn) => btn.addEventListener('click', openModal))

  closeModalBtn?.addEventListener('click', closeModal)

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal()
    }
  })

  document.addEventListener('keydown', (e: KeyboardEventInit) => {
    if (e.code === 'Escape' && modal.style.display === 'block') {
      closeModal()
    }
  })

  const modalTImerId = setTimeout(() => {
    openModal()
  }, 500000000)

  const showModalByScroll = () => {
    const { offsetHeight, clientHeight } = document.documentElement
    if (offsetHeight - clientHeight <= window.pageYOffset) {
      openModal()
      window.removeEventListener('scroll', showModalByScroll)
    }
  }

  window.addEventListener('scroll', showModalByScroll)

  //classes
  interface ICreateItemProps {
    tag: string
    className?: string
    text?: string
    src?: string
    alt?: string
  }
  class Card {
    private transfer = 27
    constructor(
      public src: string,
      public alt: string,
      public title: string,
      public description: string,
      public price: number,
      public parent: string
    ) {}

    convertToRub() {
      this.price *= this.transfer
    }

    createCardItem({ tag, className, text, src, alt }: ICreateItemProps) {
      const item = document.createElement(tag)
      if (className) {
        item.classList.add(className)
      }
      if (text) {
        item.textContent = text
      }
      if (src && alt && item instanceof HTMLImageElement) {
        item.src = src
        item.alt = alt
      }

      return item
    }

    render() {
      this.convertToRub()

      const card = this.createCardItem({ tag: 'div', className: 'menu__item' })
      const img = this.createCardItem({
        tag: 'img',
        src: this.src,
        alt: this.alt,
      })
      const title = this.createCardItem({
        tag: 'h3',
        className: 'menu__item-subtitle',
        text: this.title,
      })
      const description = this.createCardItem({
        tag: 'div',
        className: 'menu__item-descr',
        text: this.description,
      })
      const divider = this.createCardItem({
        tag: 'div',
        className: 'menu__item-divider',
      })
      const price = this.createCardItem({
        tag: 'div',
        className: 'menu__item-price',
      })
      const cost = this.createCardItem({
        tag: 'div',
        className: 'menu__item-cost',
        text: 'Цена',
      })
      const total = this.createCardItem({
        tag: 'div',
        className: 'menu__item-total',
        text: ' руб/день',
      })
      const span = this.createCardItem({
        tag: 'span',
        text: String(this.price),
      })

      total.prepend(span)
      price.append(cost, total)
      card.append(img, title, description, divider, price)

      document.querySelector(this.parent)?.append(card)
    }
  }

  new Card(
    'img/tabs/vegy.jpg',
    'vegy',
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    '.menu .container'
  ).render()

  new Card(
    'img/tabs/elite.jpg',
    'elite',
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    20,
    '.menu .container'
  ).render()

  new Card(
    'img/tabs/post.jpg',
    'post',
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    16,
    '.menu .container'
  ).render()
})