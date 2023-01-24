import React, { useEffect, useState } from 'react'
import Chart from './Chart'
import checkGameIsOver from './functions/checkGameIsOver'

export enum ChartIndex {
  EMPTY,
  X,
  O
}

interface PageProps {
  length: number
}

const Page: React.FC<PageProps> = ({ length }) => {
  const [chartValue, setchartValue] = useState<ChartIndex[]>([])
  const [isGameOver, setisGameOver] = useState<boolean>(false)

  useEffect(() => {
    setchartValue(Array(length * length).fill(ChartIndex.EMPTY))
  }, [])

  useEffect(() => {
    if (checkGameIsOver(chartValue, length)) {
      setisGameOver(true)
      console.log('Game is over')
    }
  }, [chartValue])

  return (
    <div>
      <Chart
        data={chartValue}
        length={length}
        changeData={(i, j, value) => {
          if (isGameOver) return

          chartValue[i * length + j] = value
          setchartValue([...chartValue])
        }}
      />
    </div>
  )
}
export default Page
