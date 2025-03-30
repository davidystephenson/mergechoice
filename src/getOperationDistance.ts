import { Operation } from './flowTypes'

export default function getOperationDistance (props: {
  operation: Operation
}): number {
  const { operation } = props

  // Validate inputs for all operations, including output operations
  if (operation.better < 0) {
    throw new Error('Better cannot be less than zero')
  }

  if (operation.worse < -1) {
    throw new Error('Worse cannot be less than negative one')
  }

  if (operation.worse > operation.bInput.length - 1) {
    throw new Error('Worse cannot be greater than bInput length minus one')
  }

  const sum = operation.aInput.length + operation.bInput.length
  const maximumWorse = operation.bInput.length - 1
  const difference = maximumWorse - operation.worse
  const distance = sum - difference - operation.better
  return distance
}
