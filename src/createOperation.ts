import createUuid from './createUuid'
import { Flow, Operation, Uuid } from './flowTypes'

export default function createOperation (props: {
  flow: Flow
  a?: Uuid[]
  b?: Uuid[]
  output?: Uuid[]
}): Operation {
  const currentCount = props.flow.operationCount ?? 0
  props.flow.operationCount = currentCount + 1

  const uuid = createUuid({ seed: props.flow.seed, count: currentCount })

  const a = props.a ?? []
  const b = props.b ?? []
  const output = props.output ?? []

  const operation: Operation = {
    uuid,
    a,
    b,
    output
  }

  props.flow.operations[uuid] = operation

  return operation
}
