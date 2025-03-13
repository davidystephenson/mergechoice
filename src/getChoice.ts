import { Choice, Flow } from './flowTypes'

export default function getChoice (props: {
  flow: Flow
}): Choice | undefined {
  if (Object.keys(props.flow.items).length === 0) {
    return undefined
  }

  const operations = Object.values(props.flow.operations)

  const operationsWithInputs = operations.filter(operation =>
    operation.a.length > 0 && operation.b.length > 0
  )

  if (operationsWithInputs.length === 0) {
    return undefined
  }

  const longestInputLength = operationsWithInputs.reduce((maxLength, operation) => {
    const inputLength = operation.a.length + operation.b.length
    return inputLength > maxLength ? inputLength : maxLength
  }, 0)

  const operationsWithLongestInput = operationsWithInputs.filter(operation =>
    operation.a.length + operation.b.length === longestInputLength
  )

  const selectedOperation = operationsWithLongestInput.reduce((highest, operation) =>
    operation.uuid > highest.uuid ? operation : highest
  , operationsWithLongestInput[0])

  return {
    a: selectedOperation.a[0],
    b: selectedOperation.b[0]
  }
}
