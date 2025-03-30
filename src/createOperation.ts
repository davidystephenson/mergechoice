import createUid from './createUid'
import { Flow, Operation, OperationDef } from './flowTypes'

export default function createOperation (props: {
  flow: Flow
} & OperationDef): Operation {
  if (props.aInput == null || props.bInput == null || props.output == null) {
    throw new Error('Operation definition is required')
  }

  // Check if the operation is empty (no input or output)
  if (props.aInput.length === 0 && props.bInput.length === 0 && props.output.length === 0) {
    throw new Error('Operation cannot be empty')
  }

  // Check for one-sided input (a without b or b without a)
  if ((props.aInput.length > 0 && props.bInput.length === 0) ||
      (props.aInput.length === 0 && props.bInput.length > 0)) {
    throw new Error('Cannot have input on only one side')
  }

  // Check for duplicate UIDs between inputs and outputs
  const allUids = [...props.aInput, ...props.bInput, ...props.output]
  const uniqueUids = new Set(allUids)
  if (allUids.length !== uniqueUids.size) {
    throw new Error('Duplicate UIDs in operation')
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
