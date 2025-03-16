import { addOperation, createOperation, Flow, OperationDef } from '../../src'

export default function insertOperation (props: {
  flow: Flow
} & OperationDef): Flow {
  const operation = createOperation({ ...props })
  const addedFlow = addOperation({ flow: props.flow, operation })
  return addedFlow
}
