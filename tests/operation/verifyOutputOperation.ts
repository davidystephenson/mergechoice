import { Operation } from '../../src'

export default function verifyOutputOperation (props: {
  operation: Operation
}): void {
  expect(props.operation.output.length).toBeGreaterThan(0)
  expect(props.operation.queue.length).toBe(0)
  expect(props.operation.catalog.length).toBe(0)
}
