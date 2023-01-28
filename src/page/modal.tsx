import Modal from 'react-modal'

import React, { useEffect, useState } from 'react'
import Chart, { ChartIndex } from './Chart'
import checkGameIsOver from './functions/checkGameIsOver'
import choiceTheNextMove from './functions/choiceTheNextMove'
import { countEmptyNode } from './functions/countEmptyNode'

interface PageProps {
  length: number
  isOpen: boolean
  onClose?: () => void
  isBotBattle?: boolean
}

const MainModal: React.FC<PageProps> = ({
  length,
  isOpen,
  onClose,
  isBotBattle
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
      console.log('Game is over')
    }
  }, [chartValue])

  const move = (turnMove: ChartIndex) => {
    if (checkGameIsOver(chartValue, length)) {
      return
    }
    const answer = choiceTheNextMove(chartValue, 5, turnMove, length)

    if (answer) {
      chartValue[Number(answer)] = turnMove
      setchartValue([...chartValue])
      setturn(turnMove)
      setTimeout(
        () => move(turnMove === ChartIndex.X ? ChartIndex.O : ChartIndex.X),
        500
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
          width: 400,
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
              const answer = choiceTheNextMove(chartValue, 3, turn)

              if (answer) {
                chartValue[Number(answer)] = turn
                setchartValue([...chartValue])
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
              move(turn)
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
