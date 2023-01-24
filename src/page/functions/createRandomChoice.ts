import { ChartIndex } from '..'

const createRandomChoice = (chartValue: ChartIndex[], node: ChartIndex) => {
  const data: ChartIndex[][] = []

  chartValue.forEach((element, i) => {
    if (element === ChartIndex.EMPTY) {
      const temp = [...chartValue]
      temp[i] = node
      data.push(temp)
    }
  })

  return data
}
export default createRandomChoice
