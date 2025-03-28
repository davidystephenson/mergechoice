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

  outputOperations.sort((a, b) => a.uid.localeCompare(b.uid))
  const earlierOperation = outputOperations[0]
  const laterOperation = outputOperations[1]

  const newOperation = createOperation({
    flow: props.flow,
    aInput: earlierOperation.output,
    bInput: laterOperation.output,
    output: []
  })

  const operationsToKeep = Object.entries(props.flow.operations)
    .filter(([uid]) => uid !== earlierOperation.uid && uid !== laterOperation.uid)
    .reduce<Record<string, Operation>>((acc, [uid, operation]) => {
    acc[uid] = operation
    return acc
  }, {})

  const flowWithoutOutputOperations = {
    ...props.flow,
    operations: operationsToKeep,
    operationCount: props.flow.operationCount - 2
  }

  return addOperation({
    flow: flowWithoutOutputOperations,
    operation: newOperation
  })
}
