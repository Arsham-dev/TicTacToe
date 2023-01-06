import React from 'react'
import { ChartIndex } from '..'
import './index.css'

const valueToText = (value: ChartIndex) => {
  switch (value) {
    case ChartIndex.EMPTY:
      return ''
    case ChartIndex.X:
      return 'X'
    case ChartIndex.O:
      return 'O'
    default:
      return ''
  }
}

interface ChartProps {
  length: number
  data: ChartIndex[]
  changeData: (i: number, j: number, value: ChartIndex) => void
}

const Chart: React.FC<ChartProps> = ({ data, changeData, length }) => {
  return (
    <div>
      {Array(length)
        .fill(null)
        .map((_, i) => (
          <div key={i} className="row">
            {data.slice(i * length, (i + 1) * length).map((cell, j) => (
              <div
                className="cell"
                key={cell.toString() + i + j}
                onClick={() => {
                  if (cell === ChartIndex.EMPTY) {
                    changeData(i, j, 1)
                  }
                }}>
                {valueToText(cell)}
              </div>
            ))}
          </div>
        ))}
    </div>
  )
}
export default Chart
