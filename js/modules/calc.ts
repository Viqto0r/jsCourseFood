const calc = () => {
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
}

export default calc
