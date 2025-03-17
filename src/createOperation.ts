import createUid from './createUid'
import { Flow, Operation, OperationDef } from './flowTypes'

export default function createOperation (props: {
  flow: Flow
} & OperationDef): Operation {
  if (props.aInput == null || props.bInput == null || props.output == null) {
    throw new Error('Operation definition is required')
  }

  const uid = createUid({ uid: props.flow.uid, count: props.flow.operationCount })

  const operation: Operation = {
    uid,
    aInput: props.aInput,
    ab: true,
    ascend: true,
    better: 0,
    bInput: props.bInput,
    output: props.output,
    worse: props.bInput.length - 1
  }

  return operation
}
