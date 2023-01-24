import { ChartIndex } from '..'
import createRandomChoice from './createRandomChoice'

const createRandomOptions = (
  chartValue: ChartIndex[],
  turn: ChartIndex,
  level: number = 2
) => {
  let options: ChartIndex[][] = [[...chartValue]]

  let nodeType = turn

  for (let i = 0; i < level; i++) {
    let data: ChartIndex[][] = []

    for (let j = 0; j < options.length; j++) {
      const element = options[j]
      data = [...data, ...createRandomChoice([...element], nodeType)]
    }

    nodeType = nodeType === ChartIndex.X ? ChartIndex.O : ChartIndex.X
    options = [...data.map((item) => [...item])]
  }

  return options
}
export default createRandomOptions
