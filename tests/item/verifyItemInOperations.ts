import { Flow, Item } from '../../src/flowTypes'

export default function verifyItemInOperations (props: {
  flow: Flow
  item: Item
}): void {
  const values = Object.values(props.flow.operations)
  const some = values.some((operation) => {
    const inA = operation.a.includes(props.item.uuid)
    if (inA) {
      return true
    }
    const inB = operation.b.includes(props.item.uuid)
    if (inB) {
      return true
    }
    const inResult = operation.result.includes(props.item.uuid)
    if (inResult) {
      return true
    }
    return false
  })
  expect(some).toBe(true)
}
