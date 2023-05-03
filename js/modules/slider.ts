import { getZero } from '../services/services'

interface ISliderProps {
  sliderWrapperSelector: string
  sliderInnerSelector: string
  nextBtnSelector: string
  prevBtnSelector: string
  slidesCountSelector: string
  currentSlideNumberSelector: string
  slideSelector: string
}

const slider = (props: ISliderProps) => {
  let offset = 0

  const {
    sliderWrapperSelector,
    sliderInnerSelector,
    nextBtnSelector,
    prevBtnSelector,
    slidesCountSelector,
    currentSlideNumberSelector,
    slideSelector,
  } = props

  const sliderWrapper: HTMLElement = document.querySelector(
    sliderWrapperSelector
  )!
  const sliderInner: HTMLElement =
    sliderWrapper.querySelector(sliderInnerSelector)!
  const slides: NodeListOf<HTMLElement> =
    sliderInner.querySelectorAll('.offer__slide')
  const slidesCount: HTMLElement = document.querySelector(slidesCountSelector)!
  const currentSlideNumber: HTMLElement = document.querySelector(
    currentSlideNumberSelector
  )!
  const prevSlideBtn: HTMLElement = document.querySelector(prevBtnSelector)!
  const nextSlideBtn: HTMLElement = document.querySelector(nextBtnSelector)!
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
    currentSlideNumber.textContent = `${getZero(
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
  currentSlideNumber.textContent = `${getZero(offset + 1)}`
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
}

export default slider
