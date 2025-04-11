import { Flow, Operation } from './flowTypes'
import isFlowComplete from './isFlowComplete'
import getOptionIndex from './getOptionIndex'

export default function getChoiceOperation (props: { flow: Flow }): Operation {
  const operations = Object.values(props.flow.operations)

  if (operations.length === 0) {
    throw new Error('Flow has no operations')
  }

  if (isFlowComplete({ flow: props.flow })) {
    throw new Error('Flow is complete')
  }

  const choiceOperation = operations.reduce<Operation | null>((bestOperation, currentOperation) => {
    const currentIndex = getOptionIndex({ operation: currentOperation })
    const bestIndex = bestOperation != null
      ? getOptionIndex({ operation: bestOperation })
      : -1

    if (currentIndex > bestIndex) {
      return currentOperation
    }

    if (currentIndex === bestIndex &&
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
