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
  const deadline = '2023-07-30'

  const getZero = (num: number) => {
    return num < 10 && num > 0 ? `0${num}` : String(num)
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

  modal.addEventListener('click', (e) => {
    if (
      e.target === modal ||
      (e.target instanceof HTMLElement &&
        e.target.getAttribute('data-closemodal') === '')
    ) {
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

  const getProducts = async (): Promise<IProduct[]> => {
    const response = await fetch('http://localhost:3000/menu')

    return await response.json()
  }

  //classes
  interface ICreateItemProps {
    tag: string
    className?: string
    text?: string
    src?: string
    alt?: string
  }

  interface IProduct {
    img: string
    altimg: string
    title: string
    descr: string
    price: number
  }

  class Card {
    src: string
    alt: string
    title: string
    description: string
    price: number
    parent: Element
    classes: string[]
    private transfer = 27

    constructor(
      src: string,
      alt: string,
      title: string,
      description: string,
      price: number,
      parent: string,
      ...classes: string[]
    ) {
      this.src = src
      this.alt = alt
      this.title = title
      this.description = description
      this.price = price
      this.parent = document.querySelector(parent)!
      this.convertToRub()
      this.classes = classes
    }

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

      this.classes.forEach((className) => card.classList.add(className))

      total.prepend(span)
      price.append(cost, total)
      card.append(img, title, description, divider, price)

      this.parent.append(card)
    }
  }

  //Forms

  const forms = document.querySelectorAll('form')
  enum ResponseMessage {
    SUCCESS = 'Мы с вами свяжемся',
    LODADING = 'img/form/spinner.svg',
    ERROR = 'Чтото пошло не так...',
  }

  getProducts().then((data) => {
    data.forEach(({ img, altimg, title, descr, price }) => {
      new Card(img, altimg, title, descr, price, '.menu .container').render()
    })

    const postData = async (url: string, body: { [key: string]: any }) => {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      })

      if (response.ok) {
        return await response.json()
      } else {
        throw new Error('Ошибка')
      }
    }

    const bindPostData = (form: HTMLFormElement) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault()

        const formData = new FormData(form)

        const img = document.createElement('img')
        img.src = ResponseMessage.LODADING
        img.style.cssText = `
			display:block;
			margin: 0 auto;`

        form.insertAdjacentElement('afterend', img)

        const obj: { [key: string]: any } = {}

        formData.forEach((value, key) => (obj[key] = value))

        postData('http://localhost:3000/requests', obj)
          .then((data) => {
            img.remove()
            console.log(data)
          })
          .then(() => {
            showThanksModal(ResponseMessage.SUCCESS)
          })
          .catch((err) => {
            console.error(err)
            showThanksModal(ResponseMessage.ERROR)
          })
          .finally(() => {
            form.reset()
          })
      })
    }

    forms.forEach((form) => bindPostData(form))

    const showThanksModal = (message: ResponseMessage) => {
      const prevModal = document.querySelector('.modal__dialog')

      if (prevModal instanceof HTMLElement) {
        prevModal.style.display = 'none'
      }

      openModal()

      const thanksModal = document.createElement('div')

      thanksModal.classList.add('modal__dialog')
      thanksModal.innerHTML = `
			<div class="modal__content">
					<div class="modal__close" data-closemodal>×</div>
					<div class="modal__title">${message}</div>
			</div>
			`

      document.querySelector('.modal')?.append(thanksModal)

      setTimeout(() => {
        closeModal()
        if (prevModal instanceof HTMLElement) {
          prevModal.style.display = 'block'
        }
        thanksModal.remove()
      }, 2000)
    }
  })

  //slider

  let offset = 0
  const sliderWrapper: HTMLElement = document.querySelector(
    '.offer__slider-wrapper'
  )!
  const sliderInner: HTMLElement =
    sliderWrapper.querySelector('.slider__inner')!
  const slides: NodeListOf<HTMLElement> =
    sliderInner.querySelectorAll('.offer__slide')
  const slidesCount: HTMLElement = document.querySelector('#total')!
  const currentSlide: HTMLElement = document.querySelector('#current')!
  const prevSlideBtn: HTMLElement = document.querySelector(
    '.offer__slider-prev'
  )!
  const nextSlideBtn: HTMLElement = document.querySelector(
    '.offer__slider-next'
  )!
  const slideWidth = window.getComputedStyle(sliderWrapper).width

  const fixSlideSize = () => {
    slides.forEach((slide) => (slide.style.width = slideWidth))
  }

  prevSlideBtn.addEventListener('click', () => {
    const slideWidthInt = parseFloat(slideWidth)
    if (offset === 0) {
      offset = -(slideWidthInt * (slides.length - 1))
    } else {
      offset += slideWidthInt
    }

    swapSlide(slideWidthInt)
  })

  nextSlideBtn.addEventListener('click', () => {
    const slideWidthInt = parseFloat(slideWidth)
    if (Math.abs(offset) === slideWidthInt * (slides.length - 1)) {
      offset = 0
    } else {
      offset -= slideWidthInt
    }

    swapSlide(slideWidthInt)
  })

  const swapSlide = (slideWidthInt: number) => {
    sliderInner.style.transform = `translateX(${offset}px)`
    currentSlide.textContent = `${getZero(
      Math.abs(offset) / slideWidthInt + 1
    )}`
    activeDots(Math.abs(offset / slideWidthInt))
  }

  slidesCount.textContent = `${getZero(slides.length)}`
  sliderInner.style.width = parseInt(slideWidth) * 4 + 'px'
  sliderInner.style.display = 'flex'
  sliderInner.style.transition = 'all 0.5s'
  sliderWrapper.style.overflow = 'hidden'
  sliderWrapper.style.position = 'relative'
  currentSlide.textContent = `${getZero(offset + 1)}`
  fixSlideSize()

  const dotsContainer = document.createElement('div')
  dotsContainer.classList.add('carousel-indicators')
  sliderWrapper.append(dotsContainer)

  const createDots = (count: number) => {
    const dots = []
    for (let i = 0; i < count; i++) {
      const dot = document.createElement('div')
      dot.classList.add('dot')
      if (i === 0) {
        dot.classList.add('active')
      }
      dots.push(dot)
    }

    return dots
  }

  dotsContainer.append(...createDots(slides.length))
  dotsContainer.addEventListener('click', (e) => {
    if (e.target instanceof Element) {
      if (e.target.classList.contains('dot')) {
        const idx = Array.from(dots).indexOf(e.target)
        const slideWidthInt = parseFloat(slideWidth)
        offset = slideWidthInt * -idx
        swapSlide(slideWidthInt)
        activeDots(idx)
      }
    }
  })

  const dots = document.querySelectorAll('.dot')

  const activeDots = (n: number) => {
    dots.forEach((dot, idx) => {
      if (idx === n) {
        dot.classList.add('active')
      } else {
        dot.classList.remove('active')
      }
    })
  }

  //calc
  type SexType = 'female' | 'male'
  type ActivityType = 1.2 | 1.375 | 1.55 | 1.725

  let sex: SexType = (localStorage.getItem('sex') as SexType) || 'female',
    activity: ActivityType =
      (+localStorage.getItem('activity')! as ActivityType) || 1.375,
    height: number,
    weight: number,
    age: number

  const calcResult: HTMLSpanElement = document.querySelector(
    '.calculating__result span'
  )!

  const calcInit = () => {
    calcResult.textContent = '____'

    deactivateBtns(
      'div.calculating__choose-item',
      'calculating__choose-item_active'
    )
    activateBtns(`#${sex}`)
    activateBtns(`[data-ratio="${activity}"]`)
  }

  const setStaticInfo = (selector: string, activeClass: string) => {
    const btns: NodeListOf<HTMLDivElement> = document.querySelectorAll(selector)

    btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        deactivateBtns(selector, activeClass)

        btn.classList.add(activeClass)

        if (selector === '#gender div') {
          const { id } = btn
          sex = id as SexType
          localStorage.setItem('sex', id)
        } else {
          const ratio = btn.getAttribute('data-ratio')!
          activity = +ratio as ActivityType
          localStorage.setItem('activity', ratio)
        }

        calcTotal()
      })
    })
  }

  const setDynamicInfo = () => {
    const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll(
      '.calculating__choose input'
    )

    inputs.forEach((input) => {
      input.addEventListener('input', (e: Event) => {
        if (e.target instanceof HTMLInputElement) {
          switch (e.target.id) {
            case 'height':
              height = +e.target.value
              break
            case 'weight':
              weight = +e.target.value
              break
            case 'age':
              age = +e.target.value
              break
          }
          checkErrorField(e.target)
        }
        calcTotal()
      })
    })
  }

  const deactivateBtns = (selector: string, activeClass: string) => {
    const btns: NodeListOf<HTMLElement> = document.querySelectorAll(selector)
    btns.forEach((btn) => {
      btn.classList.remove(activeClass)
    })
  }

  const activateBtns = (selecor: string) => {
    document
      .querySelector(selecor)
      ?.classList.add('calculating__choose-item_active')
  }

  const calcTotal = () => {
    let total
    if (!height || !weight || !age) {
      calcResult.textContent = '____'
      return
    }

    if (sex === 'male') {
      total = Math.round(
        (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * activity
      )
    } else {
      total = Math.round(
        (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * activity
      )
    }

    calcResult.textContent = String(total)
  }

  const validateInput = (str: string) => {
    return str.match(/\D/g)
  }

  const checkErrorField = (field: HTMLInputElement) => {
    if (validateInput(field.value)) {
      field.style.border = '1px solid red'
    } else {
      field.style.border = 'none'
    }
  }

  setDynamicInfo()
  setStaticInfo('#gender div', 'calculating__choose-item_active')
  setStaticInfo(
    '.calculating__choose_big div',
    'calculating__choose-item_active'
  )
  calcInit()
})
