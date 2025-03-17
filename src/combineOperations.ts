import { Flow, Operation, Uid } from './flowTypes'
import createOperation from './createOperation'
import addOperation from './addOperation'
import isOutputOperation from './isOutputOperation'

export default function combineOperations (props: {
  flow: Flow
}): Flow {
  const operations = Object.values(props.flow.operations)

  const outputOperations = operations.filter(operation => isOutputOperation({ operation }))

  // If there are more than two output operations, throw an error
  if (outputOperations.length > 2) {
    throw new Error('Flow has more than two output operations')
  }

  // If there are not exactly two output operations, do nothing
  if (outputOperations.length !== 2) {
    return props.flow
  }

  // Create a new operation with the outputs of the two output operations as inputs
  const newOperation = createOperation({
    flow: props.flow,
    aInput: [outputOperations[0].output[0]],
    bInput: [outputOperations[1].output[0]],
    output: []
  })

  // Create a new flow with the new operation and without the two output operations
  const operationsToKeep = Object.entries(props.flow.operations)
    .filter(([uid]) => uid !== outputOperations[0].uid && uid !== outputOperations[1].uid)
    .reduce<Record<Uid, Operation>>((acc, [uid, operation]) => {
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
