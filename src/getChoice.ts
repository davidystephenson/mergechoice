import { Choice, Flow } from './flowTypes'

export default function getChoice (props: {
  flow: Flow
}): Choice | undefined {
  if (Object.keys(props.flow.items).length === 0) {
    return undefined
  }

  const operations = Object.values(props.flow.operations)

  const operationsWithInputs = operations.filter(operation =>
    operation.aInput.length > 0 && operation.bInput.length > 0
  )

  if (operationsWithInputs.length === 0) {
    return undefined
  }

  const longestInputLength = operationsWithInputs.reduce((maxLength, operation) => {
    const inputLength = operation.aInput.length + operation.bInput.length
    return inputLength > maxLength ? inputLength : maxLength
  }, 0)

  const operationsWithLongestInput = operationsWithInputs.filter(operation =>
    operation.aInput.length + operation.bInput.length === longestInputLength
  )

  const selectedOperation = operationsWithLongestInput.reduce((highest, operation) =>
    operation.uid > highest.uid ? operation : highest
  , operationsWithLongestInput[0])

  return {
    aItemId: selectedOperation.aInput[0],
    bItemId: selectedOperation.bInput[0],
    operationId: selectedOperation.uid
  }
}
