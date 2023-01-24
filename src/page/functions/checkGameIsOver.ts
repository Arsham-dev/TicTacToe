import { ChartIndex } from '..'

const checkGameIsOver = (chartValue: ChartIndex[], length: number): boolean => {
  const data: ChartIndex[][] = [[]]
  if (chartValue.length === 0) return false

  for (let i = 0; i < length; i++) {
    data[i] = chartValue.slice(i * length, (i + 1) * length)
  }

  for (let i = 0; i < data.length; i++) {
    const element = data[i]
    if (element.every((item) => item === ChartIndex.X)) return true
    if (element.every((item) => item === ChartIndex.O)) return true
  }

  for (let i = 0; i < data.length; i++) {
    if (data.every((item) => item[i] === ChartIndex.X)) return true
    if (data.every((item) => item[i] === ChartIndex.O)) return true
  }

  for (let i = 0; i < 2; i++) {
    let value = true
    const temp = i === 0 ? ChartIndex.X : ChartIndex.O
    for (let j = 0; j < data.length; j++) {
      if (data[j][j] === temp) continue
      else {
        value = false
        break
      }
    }

    if (value) {
      return true
    }

    value = true

    for (let j = 0; j < data.length; j++) {
      if (data[j][data.length - j - 1] === temp) continue
      else {
        value = false
        break
      }
    }

    if (value) {
      return true
    }
  }

  return false
}
export default checkGameIsOver
