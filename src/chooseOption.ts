import { Flow, Uid } from './flowTypes'
import getChoice from './getChoice'

export default function chooseOption (props: {
  flow: Flow
  option: Uid
}): Flow {
  const choice = getChoice({ flow: props.flow })
  if (choice == null) {
    throw new Error('Flow has no choice')
  }

  if (props.option !== choice.aItemId && props.option !== choice.bItemId) {
    throw new Error('Option is not in the choice')
  }

  const operation = props.flow.operations[choice.operationId]

  const updatedFlow = {
    ...props.flow,
    operations: {
      ...props.flow.operations
    }
  }

  const updatedOperation = {
    ...operation,
    aInput: [],
    bInput: [],
    output: props.option === choice.aItemId
      ? [choice.aItemId, choice.bItemId]
      : [choice.bItemId, choice.aItemId]
  }

  updatedFlow.operations[choice.operationId] = updatedOperation

  return updatedFlow
}
