import { ChartIndex } from '../Chart'
import createRandomChoice, { Options } from './createRandomChoice'

const createRandomOptions = (
  chartValue: ChartIndex[],
  turn: ChartIndex,
  level: number = 2
) => {
  let options: Options[] = [{ chartValue: [...chartValue], way: '' }]

  let nodeType = turn

  for (let i = 0; i < level; i++) {
    let data: Options[] = []

    for (let j = 0; j < options.length; j++) {
      const element = options[j]
      data = [
        ...data,
        ...createRandomChoice(
          { chartValue: [...element.chartValue], way: element.way },
          nodeType
        )
      ]
    }

    nodeType = nodeType === ChartIndex.X ? ChartIndex.O : ChartIndex.X

    options = [
      ...data.map((item) => ({
        chartValue: [...item.chartValue],
        way: item.way
      }))
    ]
  }
  const min = options.map((item) => item.way.length).sort((a, b) => a - b)[0]

  options = options.filter((item) => item.way.length === min)

  return options
}
export default createRandomOptions
