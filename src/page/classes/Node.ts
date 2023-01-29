import { ChartIndex } from '../Chart'

class NodeStatus {
  parent?: NodeStatus | null

  state: ChartIndex[]

  successors?: NodeStatus[]

  value?: number

  constructor(
    parent?: NodeStatus | null,
    state?: ChartIndex[],
    successors?: NodeStatus[],
    value?: number
  ) {
    this.parent = parent
    this.state = state!
    this.successors = successors
    this.value = value
  }
}
export default NodeStatus
