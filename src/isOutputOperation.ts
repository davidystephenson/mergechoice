import { Operation } from './flowTypes'

export default function isOutputOperation (props: {
  operation: Operation
}): boolean {
  const outputEmpty = props.operation.output.length <= 0
  if (outputEmpty) {
    return false
  }

  const hasAInputs = props.operation.aInput.length !== 0
  if (hasAInputs) {
    return false
  }

  const hasBInputs = props.operation.bInput.length !== 0
  if (hasBInputs) {
    return false
  }

  return true
}
