import { ChartIndex } from '../Chart'
import checkGameIsOver from './checkGameIsOver'

export type Options = {
  chartValue: ChartIndex[]
  way: string
}
const createRandomChoice = (option: Options, node: ChartIndex) => {
  const data: Options[] = []

  if (
    checkGameIsOver(option.chartValue, 3) ===
    (node === ChartIndex.X ? ChartIndex.O : ChartIndex.X)
  ) {
    return [{ chartValue: [...option.chartValue], way: option.way }]
  }

  option.chartValue.forEach((element, i) => {
    if (element === ChartIndex.EMPTY) {
      const temp = [...option.chartValue]
      temp[i] = node
      data.push({
        chartValue: temp,
        way: option.way + i.toString() + node.toString()
      })
    }
  })

  return data
}
export default createRandomChoice
