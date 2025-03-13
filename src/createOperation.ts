import createUid from './createUid'
import { Flow, Operation, Uid } from './flowTypes'

export default function createOperation (props: {
  flow: Flow
  a?: Uid[]
  b?: Uid[]
  output?: Uid[]
}): Operation {
  const currentCount = props.flow.operationCount ?? 0
  props.flow.operationCount = currentCount + 1

  const uid = createUid({ uid: props.flow.uid, count: currentCount })

  const a = props.a ?? []
  const b = props.b ?? []
  const output = props.output ?? []

  const operation: Operation = {
    uid,
    a,
    ab: true,
    ascend: true,
    b,
    output
  }

  props.flow.operations[uid] = operation

  return operation
}
