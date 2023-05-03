export const getZero = (num: number) => {
  return num < 10 && num > 0 ? `0${num}` : String(num)
}
