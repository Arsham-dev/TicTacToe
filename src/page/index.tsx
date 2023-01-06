import { useEffect, useState } from 'react'
import Chart from './Chart'

export enum ChartIndex {
  EMPTY,
  X,
  O
}
const length = 3
const Page = () => {
  const [chartValue, setchartValue] = useState<ChartIndex[]>([])
  useEffect(() => {
    setchartValue([1, 0, 2, 0, 1, 2, 2, 0, 1])
  }, [])

  return (
    <div>
      <Chart
        data={chartValue}
        length={length}
        changeData={(i, j, value) => {
          chartValue[i * length + j] = value
          setchartValue([...chartValue])
          console.log(chartValue)
        }}
      />
    </div>
  )
}
export default Page
