import { Operation } from './flowTypes'

export default function getOptionIndex (props: {
  operation: Operation
}): number {
  const maxIndex = props.operation.bInput.length - 1

  if (props.operation.better != null) {
    if (props.operation.better < 0 || props.operation.better > maxIndex) {
      throw new Error('Better index out of bounds')
    }
  }

  if (props.operation.worse != null) {
    if (props.operation.worse < 0 || props.operation.worse > maxIndex) {
      throw new Error('Worse index out of bounds')
    }
  }

  if (props.operation.better == null && props.operation.worse == null) {
    return 0
  }

  if (props.operation.better === 0 && props.operation.worse == null) {
    return maxIndex
  }

  if (props.operation.better != null && props.operation.worse != null) {
    const sum = props.operation.better + props.operation.worse
    return Math.floor(sum / 2)
  }

  return 0
}
