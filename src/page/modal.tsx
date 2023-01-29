import Modal from 'react-modal'

import React, { useEffect, useState } from 'react'
import Chart, { ChartIndex } from './Chart'
import checkGameIsOver from './Functions/checkGameIsOver'
import Algorithms from './Classes/Algorithms'
import { countEmptyNode } from './Functions/countEmptyNode'

interface PageProps {
  length: number
  isOpen: boolean
  onClose?: () => void
  isBotBattle?: boolean
  gameLevel: number
}

const MainModal: React.FC<PageProps> = ({
  length,
  isOpen,
  onClose,
  isBotBattle,
  gameLevel
}) => {
  const [chartValue, setchartValue] = useState<ChartIndex[]>([])
  const [isGameOver, setisGameOver] = useState<boolean>(false)
  const [turn, setturn] = useState<ChartIndex>(ChartIndex.X)

  useEffect(() => {
    setchartValue(Array(length * length).fill(ChartIndex.EMPTY))
  }, [])

  useEffect(() => {
    if (
      checkGameIsOver(chartValue, length) ||
      countEmptyNode(chartValue) === 0
    ) {
      setisGameOver(true)
    }
  }, [chartValue])

  const move = (turnMove: ChartIndex, chart: ChartIndex[]) => {
    if (checkGameIsOver(chartValue, length)) {
      return
    }

    const algoritm = new Algorithms(
      gameLevel - Math.floor((length - 3) * 1.5),
      turnMove,
      length
    )

    const AlphaBetaStartTime = performance.now()
    const answer = algoritm.alphaBeta(chart)
    const AlphaBetaEndTime = performance.now()

    if (length === 3) {
      const maxMinStartTime = performance.now()
      algoritm.minMax(chart)
      const maxMinEndTime = performance.now()
      console.log(`MinMax time: ${maxMinEndTime - maxMinStartTime} ms`)
    }

    console.log(`AlphaBeta time: ${AlphaBetaEndTime - AlphaBetaStartTime} ms`)

    if (answer) {
      setchartValue([...answer])
      setturn(turnMove)
      setTimeout(
        () =>
          move(turnMove === ChartIndex.X ? ChartIndex.O : ChartIndex.X, [
            ...answer
          ]),
        100
      )
    }
  }

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          minWidth: 400,
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 30
        }
      }}>
      <div>
        <h1>Turn: {turn === ChartIndex.X ? 'X' : 'O'}</h1>
      </div>
      {isGameOver && <h2>Game is over</h2>}
      <Chart
        data={chartValue}
        length={length}
        changeData={(i, j, value) => {
          if (isGameOver) return

          chartValue[i * length + j] = value
          setchartValue([...chartValue])
        }}
        turn={turn}
        setturn={setturn}
      />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {!isBotBattle && (
          <button
            style={{ marginTop: 20, backgroundColor: 'tan' }}
            onClick={() => {
              if (isGameOver) return
              const algoritm = new Algorithms(
                gameLevel - Math.floor((length - 3) * 1.5),
                turn,
                length
              )
              const AlphaBetaStartTime = performance.now()
              const answer = algoritm.alphaBeta(chartValue)
              const AlphaBetaEndTime = performance.now()

              if (length === 3) {
                const maxMinStartTime = performance.now()
                algoritm.minMax(chartValue)
                const maxMinEndTime = performance.now()
                console.log(
                  `MinMax time: ${maxMinEndTime - maxMinStartTime} ms`
                )
              }

              console.log(
                `AlphaBeta time: ${AlphaBetaEndTime - AlphaBetaStartTime} ms`
              )

              if (answer) {
                setchartValue([...answer])
                setturn(turn === ChartIndex.X ? ChartIndex.O : ChartIndex.X)
              }
            }}>
            Move
          </button>
        )}
        {isBotBattle && (
          <button
            style={{ marginTop: 20, backgroundColor: 'tan' }}
            onClick={() => {
              move(turn, chartValue)
            }}>
            Start
          </button>
        )}

        <button
          style={{ marginTop: 20, backgroundColor: 'ButtonFace' }}
          onClick={onClose}>
          Close
        </button>
      </div>
    </Modal>
  )
}
export default MainModal
