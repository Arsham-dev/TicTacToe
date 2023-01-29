import { ChartIndex } from '../Chart'
import checkGameIsOver from '../Functions/checkGameIsOver'
import NodeStatus from './Node'

class Algorithms {
  private depth!: number

  private turn!: ChartIndex

  private enemyTurn!: ChartIndex

  private length!: number

  constructor(depth: number, turn: ChartIndex, length: number) {
    this.depth = depth
    this.turn = turn
    this.enemyTurn = turn === ChartIndex.X ? ChartIndex.O : ChartIndex.X
    this.length = length
  }

  private createNewOptions(node: NodeStatus, sign: ChartIndex): NodeStatus[] {
    const options: NodeStatus[] = []
    for (let i = 0; i < this.length; i++) {
      for (let j = 0; j < this.length; j++) {
        if (node.state![i * this.length + j] === ChartIndex.EMPTY) {
          const newState = node.state!.slice()
          newState[i * this.length + j] = sign
          const newNode = new NodeStatus(node, newState)
          options.push(newNode)
        }
      }
    }
    node.options = options
    return options
  }

  private minValue(
    node: NodeStatus,
    alpha: number,
    beta: number,
    depth: number
  ) {
    if (depth === 0 || checkGameIsOver(node.state, this.length)) {
      return this.evaluationFunction(node.state)
    }

    let num = Infinity
    const children = this.createNewOptions(node, this.enemyTurn)

    for (let i = 0; i < children.length; i++) {
      const element = children[i]

      num = Math.min(num, this.maxValue(element, alpha, beta, depth - 1))
      element.value = num
    }

    node.value = num
    return num
  }

  private maxValue(
    node: NodeStatus,
    alpha: number,
    beta: number,
    depth: number
  ): number {
    if (depth === 0 || checkGameIsOver(node.state, this.length)) {
      return this.evaluationFunction(node.state)
    }
    let num = -Infinity
    const children = this.createNewOptions(node, this.turn)

    for (let i = 0; i < children.length; i++) {
      const element = children[i]

      element.value = this.minValue(element, alpha, beta, depth - 1)

      num = Math.max(num, element.value)
      element.value = num
    }

    node.value = num
    return num
  }

  public minMax(state?: ChartIndex[]): ChartIndex[] | null {
    const node = new NodeStatus(null, state)

    let num = this.maxValue(node, -Infinity, Infinity, this.depth)

    if (node.options && node.options.length > 0) {
      return node.options.find((item) => item.value === num)!.state
    }

    return null
  }

  private minValueAlphaBeta(
    node: NodeStatus,
    alpha: number,
    beta: number,
    depth: number
  ) {
    if (depth === 0 || checkGameIsOver(node.state, this.length)) {
      return this.evaluationFunction(node.state)
    }

    let num = Infinity
    const children = this.createNewOptions(node, this.enemyTurn)

    for (let i = 0; i < children.length; i++) {
      const element = children[i]
      num = Math.min(
        num,
        this.maxValueAlphaBeta(element, alpha, beta, depth - 1)
      )

      element.value = num

      if (num <= alpha) {
        return num
      }

      beta = Math.max(beta, num)
    }

    node.value = num
    return num
  }

  private maxValueAlphaBeta(
    node: NodeStatus,
    alpha: number,
    beta: number,
    depth: number
  ): number {
    if (depth === 0 || checkGameIsOver(node.state, this.length)) {
      return this.evaluationFunction(node.state)
    }

    const children = this.createNewOptions(node, this.turn)
    let num = -Infinity

    for (let i = 0; i < children.length; i++) {
      const element = children[i]

      num = Math.max(
        num,
        this.minValueAlphaBeta(element, alpha, beta, depth - 1)
      )
      element.value = num

      if (num >= beta) {
        return num
      }

      alpha = Math.max(alpha, num)
    }

    node.value = num
    return num
  }

  public alphaBeta(state?: ChartIndex[]): ChartIndex[] | null {
    const node = new NodeStatus(null, state)

    let v = this.maxValueAlphaBeta(node, -Infinity, Infinity, this.depth)

    if (node.options && node.options.length > 0) {
      return node.options.find((item) => item.value === v)!.state
    }

    return null
  }

  private evaluationFunction(state: ChartIndex[]): number {
    let ans = 0

    for (let i = 0; i < this.length; i++) {
      const row = state.slice(i * this.length, i * this.length + this.length)

      if (
        row.every((item) => item === this.turn || item === ChartIndex.EMPTY)
      ) {
        if (row.every((item) => item === this.turn)) {
          return Infinity
        }
        ans += 1
      }

      if (
        row.every(
          (item) => item === this.enemyTurn || item === ChartIndex.EMPTY
        )
      ) {
        if (row.every((item) => item === this.enemyTurn)) {
          return -Infinity
        }
        ans -= 1
      }

      const col = state.filter((item, index) => index % this.length === i)

      if (
        col.every((item) => item === this.turn || item === ChartIndex.EMPTY)
      ) {
        if (col.every((item) => item === this.turn)) {
          return Infinity
        }
        ans += 1
      }

      if (
        col.every(
          (item) => item === this.enemyTurn || item === ChartIndex.EMPTY
        )
      ) {
        if (col.every((item) => item === this.enemyTurn)) {
          return -Infinity
        }
        ans -= 1
      }
    }

    const diagonalOne = []
    for (let i = 0; i < Math.floor(Math.sqrt(state.length)); i++) {
      diagonalOne.push(state[i * this.length + i])
    }
    const diagonalTwo = []
    for (let i = 0; i < Math.floor(Math.sqrt(state.length)); i++) {
      diagonalTwo.push(state[i * this.length + this.length - 1 - i])
    }

    if (
      diagonalOne.every(
        (item) => item === this.turn || item === ChartIndex.EMPTY
      )
    ) {
      if (diagonalOne.every((item) => item === this.turn)) {
        return Infinity
      }
      ans += 1
    }

    if (
      diagonalOne.every(
        (item) => item === this.enemyTurn || item === ChartIndex.EMPTY
      )
    ) {
      if (diagonalOne.every((item) => item === this.enemyTurn)) {
        return -Infinity
      }
      ans -= 1
    }

    if (
      diagonalTwo.every(
        (item) => item === this.turn || item === ChartIndex.EMPTY
      )
    ) {
      if (diagonalTwo.every((item) => item === this.turn)) {
        return Infinity
      }
      ans += 1
    }

    if (
      diagonalTwo.every(
        (item) => item === this.enemyTurn || item === ChartIndex.EMPTY
      )
    ) {
      if (diagonalTwo.every((item) => item === this.enemyTurn)) {
        return -Infinity
      }
      ans -= 1
    }
    return ans
  }
}
export default Algorithms
