import { Flow, Operation } from './flowTypes'

export default function isFlowComplete (flow: Flow): boolean {
  const operations = Object.values(flow.operations)

  // A flow with no operations is considered complete only if it has no items
  if (operations.length === 0) {
    return Object.keys(flow.items).length === 0
  }

  // Check for operations with only one of the inputs
  for (const operation of operations) {
    if ((operation.aInput.length > 0 && operation.bInput.length === 0) ||
        (operation.aInput.length === 0 && operation.bInput.length > 0)) {
      throw new Error('Operation has only one of the inputs')
    }
  }

  // Check for operations with no inputs or outputs
  for (const operation of operations) {
    if (operation.aInput.length === 0 && operation.bInput.length === 0 && operation.output.length === 0) {
      throw new Error('Operation has no inputs or outputs')
    }
  }

  // An output operation has items in the output array but not in aInput or bInput
  const isOutputOperation = (operation: Operation): boolean => {
    return operation.output.length > 0 &&
           operation.aInput.length === 0 &&
           operation.bInput.length === 0
  }

  const outputOperations = operations.filter(isOutputOperation)

  // If there are multiple output operations, throw an error
  if (outputOperations.length > 1) {
    throw new Error('Flow has multiple output operations')
  }

  // If there are multiple operations, the flow is not complete
  if (operations.length > 1) {
    return false
  }

  // If there's only one operation and it's an output operation, the flow is complete
  if (operations.length === 1 && outputOperations.length === 1) {
    return true
  }

  // If there are no output operations, the flow is not complete
  return false
}
