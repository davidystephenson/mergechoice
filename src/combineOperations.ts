import { Flow, Operation } from './flowTypes'
import createOperation from './createOperation'
import addOperation from './addOperation'
import isOutputOperation from './isOutputOperation'

export default function combineOperations (props: {
  flow: Flow
}): Flow {
  const operations = Object.values(props.flow.operations)

  const outputOperations = operations.filter(operation => isOutputOperation({ operation }))

  if (outputOperations.length > 2) {
    throw new Error('Flow has more than two output operations')
  }

  if (outputOperations.length !== 2) {
    return props.flow
  }

  // Sort operations by UID to ensure consistent ordering
  const [earlier, later] = outputOperations.sort((a, b) => a.uid.localeCompare(b.uid))

  // Create a new operation with the outputs of the two operations as inputs
  const newOperation = createOperation({
    flow: props.flow,
    aInput: earlier.output,
    bInput: later.output,
    output: []
  })

  // Remove the two output operations from the flow
  const operationsToKeep = Object.entries(props.flow.operations)
    .filter(([uid]) => uid !== earlier.uid && uid !== later.uid)
    .reduce<Record<string, Operation>>((acc, [uid, operation]) => {
    acc[uid] = operation
    return acc
  }, {})

  const flowWithoutOutputOperations = {
    ...props.flow,
    operations: operationsToKeep,
    operationCount: props.flow.operationCount - 2
  }

  // Add the new operation to the flow
  return addOperation({
    flow: flowWithoutOutputOperations,
    operation: newOperation
  })
}
