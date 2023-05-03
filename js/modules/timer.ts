import { getZero } from '../services/services'

const timer = (timerSelector: string, deadline: string) => {
  interface TimeRemaining {
    total: number
    days: number
    hours: number
    minutes: number
    seconds: number
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

  setTime(timerSelector, deadline)
}

export default timer
