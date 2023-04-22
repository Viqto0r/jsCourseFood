window.addEventListener('DOMContentLoaded', () => {
  //tabs

  const tabsParent = document.querySelector('.tabheader__items')
  const tabs = tabsParent?.querySelectorAll('.tabheader__item')
  const tabContent = document.querySelectorAll('.tabcontent')

  const hideTabContent = () => {
    tabContent?.forEach(
      (item) => ((item as HTMLElement).style.display = 'none')
    )

    tabs?.forEach((item) => item.classList.remove('tabheader__item_active'))
  }

  const showTabContent = (idx = 0) => {
    ;(tabContent![idx] as HTMLElement).style.display = 'block'
    tabs![idx].classList.add('tabheader__item_active')
  }

  tabsParent?.addEventListener('click', (ev: Event) => {
    if (
      ev.target &&
      (ev.target as HTMLElement).classList.contains('tabheader__item')
    )
      tabs?.forEach((tab, idx) => {
        if (ev.target === tab) {
          hideTabContent()
          showTabContent(idx)
        }
      })
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
    const timer = document.querySelector(selector),
      days = timer?.querySelector('#days'),
      hours = timer?.querySelector('#hours'),
      minutes = timer?.querySelector('#minutes'),
      seconds = timer?.querySelector('#seconds')

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
})
