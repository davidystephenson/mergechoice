import { Flow, Operation, Uid } from '../../src'

export default function getImportInputsOperation (props: {
  flow: Flow
  itemIds: Uid[]
}): Operation | undefined {
  const operations = Object.values(props.flow.operations)
  const operation = operations.find((operation) => {
    const aSingle = operation.a.length === 1
    if (!aSingle) {
      return false
    }
    const bSingle = operation.b.length === 1
    if (!bSingle) {
      return false
    }
    const inA = props.itemIds.includes(operation.a[0])
    if (inA) {
      const others = props.itemIds.filter((id) => id !== operation.a[0])
      const inB = others.includes(operation.b[0])
      return inB
    }
    const inB = props.itemIds.includes(operation.b[0])
    if (inB) {
      const others = props.itemIds.filter((id) => id !== operation.b[0])
      const inA = others.includes(operation.a[0])
      return inA
    }
    return false
  })
  return operation
}
