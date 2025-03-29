import { Flow, isMixedOperation, Operation } from '../../src'

export default function getVerifiedSingleMixedOperation (props: {
  flow: Flow
}): Operation {
  const operations = Object.values(props.flow.operations)
  const mixedOperations = operations.filter(operation => {
    return isMixedOperation({ operation })
  })
  expect(mixedOperations.length).toBe(1)
  return mixedOperations[0]
}
