import { Operation } from '../../src'

export default function verifyMixedOperation (props: {
  operation: Operation
}): void {
  expect(props.operation.output.length).toBeGreaterThan(0)
  expect(props.operation.aInput.length).toBeGreaterThan(0)
  expect(props.operation.bInput.length).toBeGreaterThan(0)
}
