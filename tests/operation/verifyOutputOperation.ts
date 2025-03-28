import { Operation } from '../../src'

export default function verifyOutputOperation (props: {
  operation: Operation
}): void {
  expect(props.operation.output.length).toBeGreaterThan(0)
  expect(props.operation.aInput.length).toBe(0)
  expect(props.operation.bInput.length).toBe(0)
}
