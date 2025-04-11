import { Operation } from './flowTypes'

export default function getOperationDistance (props: {
  operation: Operation
}): number {
  // Validate better if defined
  if (props.operation.better != null && props.operation.better < 0) {
    throw new Error('Better cannot be less than zero')
  }

  // Return 0 for output operations (no inputs)
  if (props.operation.queue.length === 0 && props.operation.catalog.length === 0) {
    return 0
  }

  // Calculate base distance
  const sum = props.operation.queue.length + props.operation.catalog.length

  // Calculate distance with better reduction
  if (props.operation.better != null) {
    const betterPlusOne = props.operation.better + 1
    return sum - betterPlusOne
  }

  return sum
}
