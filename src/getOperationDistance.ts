import { Operation } from './flowTypes'

export default function getOperationDistance (props: {
  operation: Operation
}): number {
  // Validate better if defined
  if (props.operation.better != null && props.operation.better < 0) {
    throw new Error('Better cannot be less than zero')
  }

  // Validate worse requires better
  if (props.operation.worse != null && props.operation.better == null) {
    throw new Error('Worse cannot be defined without better')
  }

  // Validate worse vs better
  if (props.operation.worse != null && props.operation.better != null) {
    if (props.operation.worse <= props.operation.better) {
      throw new Error('Worse must be greater than better')
    }
  }

  // Validate worse vs bInput length
  const maxIndex = props.operation.bInput.length - 1
  if (props.operation.worse != null && props.operation.worse > maxIndex) {
    throw new Error('Worse cannot be greater than bInput length minus one')
  }

  // Return 0 for output operations (no inputs)
  if (props.operation.aInput.length === 0 && props.operation.bInput.length === 0) {
    return 0
  }

  // Calculate base distance
  const sum = props.operation.aInput.length + props.operation.bInput.length

  // Calculate distance with worse reduction
  if (props.operation.worse != null && props.operation.better != null) {
    const betterPlusOne = props.operation.better + 1
    const worseMinusOne = props.operation.worse - 1
    const maximumWorse = props.operation.bInput.length - 1
    const worseReduction = maximumWorse - worseMinusOne
    const totalReduction = betterPlusOne + worseReduction
    return sum - totalReduction
  }

  // Calculate distance with better reduction
  if (props.operation.better != null) {
    const betterPlusOne = props.operation.better + 1
    return sum - betterPlusOne
  }

  return sum
}
