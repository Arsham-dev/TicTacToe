import React from 'react'
import './index.css'

export enum ChartIndex {
  EMPTY,
  X,
  O
}
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
  turn: ChartIndex
  setturn: (value: ChartIndex) => void
}

const Chart: React.FC<ChartProps> = ({
  data,
  changeData,
  length,
  turn,
  setturn
}) => {
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
                    changeData(i, j, turn)
                    setturn(turn === ChartIndex.X ? ChartIndex.O : ChartIndex.X)
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
