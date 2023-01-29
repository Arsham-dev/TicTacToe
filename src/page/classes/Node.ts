import { ChartIndex } from '../Chart'

class NodeStatus {
  parent?: NodeStatus | null

  state: ChartIndex[]

  options?: NodeStatus[]

  value?: number

  constructor(
    parent?: NodeStatus | null,
    state?: ChartIndex[],
    options?: NodeStatus[],
    value?: number
  ) {
    this.parent = parent
    this.state = state!
    this.options = options
    this.value = value
  }
}
export default NodeStatus
