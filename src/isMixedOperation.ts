import { Operation } from './flowTypes'

export default function isMixedOperation (props: {
  operation: Operation
}): boolean {
  const hasOutput = props.operation.output.length !== 0
  if (!hasOutput) {
    return false
  }

  const hasAInputs = props.operation.aInput.length !== 0
  const hasBInputs = props.operation.bInput.length !== 0
  const hasInputs = hasAInputs || hasBInputs
  if (!hasInputs) {
    return false
  }

  return true
}
