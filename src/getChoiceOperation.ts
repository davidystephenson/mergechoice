import { Flow, Operation } from './flowTypes'
import isFlowComplete from './isFlowComplete'
import getOperationDistance from './getOperationDistance'

export default function getChoiceOperation (props: { flow: Flow }): Operation {
  const operations = Object.values(props.flow.operations)

  if (operations.length === 0) {
    throw new Error('Flow has no operations')
  }

  if (isFlowComplete({ flow: props.flow })) {
    throw new Error('Flow is complete')
  }

  const choiceOperation = operations.reduce<Operation | null>((bestOperation, currentOperation) => {
    const currentDistance = getOperationDistance({ operation: currentOperation })
    const bestDistance = bestOperation != null
      ? getOperationDistance({ operation: bestOperation })
      : -1

    if (currentDistance > bestDistance) {
      return currentOperation
    }

    if (currentDistance === bestDistance &&
        bestOperation != null &&
        currentOperation.uid < bestOperation.uid) {
      return currentOperation
    }

    return bestOperation
  }, null)

  if (choiceOperation == null) {
    throw new Error('No operation found')
  }

  return choiceOperation
}
