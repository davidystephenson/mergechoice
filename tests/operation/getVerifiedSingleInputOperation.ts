import { Flow, isInputOperation, Operation } from '../../src'

export default function getVerifiedSingleInputOperation (props: {
  flow: Flow
}): Operation {
  const operations = Object.values(props.flow.operations)
  const inputOperations = operations.filter(operation => {
    return isInputOperation({ operation })
  })
  expect(inputOperations.length).toBe(1)
  return inputOperations[0]
}
