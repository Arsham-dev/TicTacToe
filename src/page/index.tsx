import { useEffect, useState } from 'react'
import Chart from './Chart'
import checkGameIsOver from './functions/checkGameIsOver'

export enum ChartIndex {
  EMPTY,
  X,
  O
}

const length = 3

const Page = () => {
  const [chartValue, setchartValue] = useState<ChartIndex[]>([])

  useEffect(() => {
    setchartValue([0, 0, 0, 0, 0, 0, 0, 0, 0])
  }, [])

  useEffect(() => {
    if (checkGameIsOver(chartValue, length)) {
      alert('game over')
    }
  }, [chartValue])

  return (
    <div>
      <Chart
        data={chartValue}
        length={length}
        changeData={(i, j, value) => {
          chartValue[i * length + j] = value
          setchartValue([...chartValue])
        }}
      />
    </div>
  )
}
export default Page
