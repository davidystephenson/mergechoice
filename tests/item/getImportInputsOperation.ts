import { Flow, Item, Operation } from '../../src'

export default function getImportInputsOperation (props: {
  flow: Flow
  items: Item[]
}): Operation | undefined {
  const itemIds = props.items.map((item) => item.uid)
  const operations = Object.values(props.flow.operations)
  const operation = operations.find((operation) => {
    const aSingle = operation.aInput.length === 1
    if (!aSingle) {
      return false
    }
    const bSingle = operation.bInput.length === 1
    if (!bSingle) {
      return false
    }
    const inA = itemIds.includes(operation.aInput[0])
    if (inA) {
      const others = itemIds.filter((id) => id !== operation.aInput[0])
      const inB = others.includes(operation.bInput[0])
      return inB
    }
    const inB = itemIds.includes(operation.bInput[0])
    if (inB) {
      const others = itemIds.filter((id) => id !== operation.bInput[0])
      const inA = others.includes(operation.aInput[0])
      return inA
    }
    return false
  })
  return operation
}
