import modal, { closeModal, openModal } from './modal'

const forms = (formSelector: '.modal', modalTImerId: NodeJS.Timeout) => {
  const forms = document.querySelectorAll('form')
  enum ResponseMessage {
    SUCCESS = 'Мы с вами свяжемся',
    LODADING = 'img/form/spinner.svg',
    ERROR = 'Чтото пошло не так...',
  }

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

    openModal(formSelector, modalTImerId)

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
      closeModal(formSelector)
      if (prevModal instanceof HTMLElement) {
        prevModal.style.display = 'block'
      }
      thanksModal.remove()
    }, 2000)
  }
}

export default forms
