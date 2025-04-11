import { Operation } from '../../src'

export default function verifyInputOperation (props: {
  operation: Operation
}): void {
  expect(props.operation.output.length).toBe(0)
  expect(props.operation.queue.length).toBeGreaterThan(0)
  expect(props.operation.catalog.length).toBeGreaterThan(0)
}
