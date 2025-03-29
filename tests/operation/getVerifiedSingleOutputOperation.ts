import { Flow, isOutputOperation, Operation } from '../../src'

export default function getVerifiedSingleOutputOperation (props: {
  flow: Flow
}): Operation {
  const operations = Object.values(props.flow.operations)
  const outputOperations = operations.filter(operation => {
    return isOutputOperation({ operation })
  })
  expect(outputOperations.length).toBe(1)
  return outputOperations[0]
}
