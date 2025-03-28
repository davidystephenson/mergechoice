import { Operation } from '../../src'

export default function verifyInputOperation (props: {
  operation: Operation
}): void {
  expect(props.operation.output.length).toBe(0)
  expect(props.operation.aInput.length).toBeGreaterThan(0)
  expect(props.operation.bInput.length).toBeGreaterThan(0)
}
