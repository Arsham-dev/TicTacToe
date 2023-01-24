import { ChartIndex } from '../Chart'

export const countEmptyNode = (chartValue: ChartIndex[]): number => {
  if (chartValue.length === 0) return 1

  let number = 0
  chartValue.forEach((item) => {
    if (item === ChartIndex.EMPTY) {
      number++
    }
  })
  return number
}

export const findEmptyNode = (chartValue: ChartIndex[]): number => {
  let number = 0
  chartValue.forEach((item, i) => {
    if (ChartIndex.EMPTY === item) {
      number = i
    }
  })
  return number
}
