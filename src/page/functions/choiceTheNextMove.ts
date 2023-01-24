import { ChartIndex } from '../Chart'
import checkGameIsOver from './checkGameIsOver'
import { findEmptyNode } from './countEmptyNode'
import createRandomOptions from './createRandomOptions'

const choiceTheNextMove = (
  chartValue: ChartIndex[],
  level: number,
  turn: ChartIndex,
  length: number = 3
) => {
  const playerRandomOption = createRandomOptions([...chartValue], turn, level)
  const enemyTurn = turn === ChartIndex.X ? ChartIndex.O : ChartIndex.X
  const enemyRandomOption = createRandomOptions(
    [...chartValue],
    enemyTurn,
    level
  )

  const enemyWin = enemyRandomOption
    .filter((item) => checkGameIsOver(item.chartValue, length) === enemyTurn)
    .map((item) => item.way)

  let playerWin = playerRandomOption.filter(
    (item) => checkGameIsOver(item.chartValue, length) === turn
  )

  console.log('playerWin', playerWin)
  console.log('enemyWin', enemyWin)
  console.log('playerRandomOption', playerRandomOption)

  if (playerWin.length === 0 && enemyWin.length > 0) {
    return enemyWin[0][0]
  } else if (playerWin.length > 0 && enemyWin.length > 0) {
    playerWin = playerWin.filter((item) =>
      enemyWin[0].length === 2 || enemyWin[0].length === 4
        ? item.way[0] === enemyWin[0][0]
        : true
    )
    if (playerWin.length === 0) {
      playerWin = playerRandomOption.filter(
        (item) => checkGameIsOver(item.chartValue, length) === turn
      )
    }
  } else if (playerWin.length === 0 && enemyWin.length === 0) {
    playerWin = playerRandomOption
  }

  if (playerRandomOption.length === 0) {
    return findEmptyNode(chartValue).toString()
  }

  if (playerWin.length > 0) {
    return playerWin[Math.floor(playerWin.length * Math.random())].way[0]
  } else return ''
}
export default choiceTheNextMove
