import { Flow, Item } from '../../src/index'

export default function verifyItemInOperations (props: {
  flow: Flow
  item: Item
}): void {
  const values = Object.values(props.flow.operations)
  const some = values.some((operation) => {
    const inA = operation.aInput.includes(props.item.uid)
    if (inA) {
      return true
    }
    const inB = operation.bInput.includes(props.item.uid)
    if (inB) {
      return true
    }
    const inOutput = operation.output.includes(props.item.uid)
    if (inOutput) {
      return true
    }
    return false
  })
  expect(some).toBe(true)
}
