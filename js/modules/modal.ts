export const closeModal = (selector: string) => {
  const modal: HTMLElement = document.querySelector(selector)!
  modal.style.display = ''
  document.body.style.overflow = 'auto'
}

export const openModal = (selector: string, modalTImerId: NodeJS.Timeout) => {
  const modal: HTMLElement = document.querySelector(selector)!
  modal.style.display = 'block'
  document.body.style.overflow = 'hidden'
  clearTimeout(modalTImerId)
}

const modal = (
  modalSelector: string,
  openBtnsSelector: string,
  modalTImerId: NodeJS.Timeout
) => {
  const openModalBtns = document.querySelectorAll(openBtnsSelector)
  const modal: HTMLElement = document.querySelector(modalSelector)!

  openModalBtns.forEach((btn) =>
    btn.addEventListener('click', () => openModal(modalSelector, modalTImerId))
  )

  modal.addEventListener('click', (e) => {
    if (
      e.target === modal ||
      (e.target instanceof HTMLElement &&
        e.target.getAttribute('data-closemodal') === '')
    ) {
      closeModal(modalSelector)
    }
  })

  document.addEventListener('keydown', (e: KeyboardEventInit) => {
    if (e.code === 'Escape' && modal.style.display === 'block') {
      closeModal(modalSelector)
    }
  })

  const showModalByScroll = () => {
    const { offsetHeight, clientHeight } = document.documentElement
    if (offsetHeight - clientHeight <= window.pageYOffset) {
      openModal(modalSelector, modalTImerId)
      window.removeEventListener('scroll', showModalByScroll)
    }
  }

  window.addEventListener('scroll', showModalByScroll)
}

export default modal
