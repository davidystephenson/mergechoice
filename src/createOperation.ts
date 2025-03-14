import createUid from './createUid'
import { Flow, Operation, Uid } from './flowTypes'

export default function createOperation (props: {
  flow: Flow
  a?: Uid[]
  b?: Uid[]
  output?: Uid[]
}): Operation {
  const uid = createUid({ uid: props.flow.uid, count: props.flow.operationCount })

  const a = props.a ?? []
  const b = props.b ?? []
  const output = props.output ?? []

  const operation: Operation = {
    uid,
    aInput: a,
    ab: true,
    ascend: true,
    bInput: b,
    output
  }

  return operation
}
