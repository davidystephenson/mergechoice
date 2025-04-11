import { Operation } from '../../src'

export default function verifyMixedOperation (props: {
  operation: Operation
}): void {
  expect(props.operation.output.length).toBeGreaterThan(0)
  expect(props.operation.queue.length).toBeGreaterThan(0)
  expect(props.operation.catalog.length).toBeGreaterThan(0)
}
