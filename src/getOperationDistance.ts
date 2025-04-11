import { Operation } from './flowTypes'

export default function getOperationDistance (props: {
  operation: Operation
}): number {
  if (props.operation.better != null && props.operation.better < 0) {
    throw new Error('Better cannot be less than zero')
  }

  if (props.operation.queue.length === 0 && props.operation.catalog.length === 0) {
    return 0
  }

  const sum = props.operation.queue.length + props.operation.catalog.length

  if (props.operation.better != null) {
    const betterPlusOne = props.operation.better + 1
    return sum - betterPlusOne
  }

  return sum
}
