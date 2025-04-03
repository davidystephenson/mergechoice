import createUid from './createUid'
import { Flow, Operation, OperationDef } from './flowTypes'

export default function createOperation (props: {
  flow: Flow
} & OperationDef): Operation {
  if (
    props.aInput == null ||
    props.bInput == null ||
    props.output == null
  ) {
    throw new Error('Operation definition is required')
  }

  const inputsEmpty = props.aInput.length === 0 && props.bInput.length === 0
  const outputEmpty = props.output.length === 0
  const empty = inputsEmpty && outputEmpty
  if (empty) {
    throw new Error('Operation cannot be empty')
  }

  const aPresent = props.aInput.length > 0
  const bPresent = props.bInput.length > 0
  const oneSided = aPresent !== bPresent
  if (oneSided) {
    throw new Error('Cannot have input on only one side')
  }

  if (props.aInput.length > props.bInput.length) {
    throw new Error('A cannot be longer than B')
  }

  const allUids = [...props.aInput, ...props.bInput, ...props.output]
  const uniqueUids = new Set(allUids)
  const duplicate = allUids.length !== uniqueUids.size
  if (duplicate) {
    throw new Error('Duplicate UIDs in operation')
  }

  const uid = createUid({
    uid: props.flow.uid, count: props.flow.count
  })

  const operation: Operation = {
    uid,
    aInput: props.aInput,
    better: undefined,
    bInput: props.bInput,
    output: props.output,
    worse: undefined
  }

  return operation
}
