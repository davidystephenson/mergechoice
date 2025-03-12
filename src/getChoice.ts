import { Choice, Flow } from './flowTypes'

export default function getChoice (props: {
  flow: Flow
}): Choice | undefined {
  if (Object.keys(props.flow.items).length === 0) {
    return undefined
  }

  const operations = Object.values(props.flow.operations)

  const operationWithInputs = operations.find(operation =>
    operation.a.length > 0 && operation.b.length > 0
  )

  if (operationWithInputs == null) {
    return undefined
  }

  return {
    a: operationWithInputs.a[0],
    b: operationWithInputs.b[0]
  }
}
