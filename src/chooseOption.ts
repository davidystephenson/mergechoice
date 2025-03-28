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

  if (props.option !== choice.aItemUid && props.option !== choice.bItemUid) {
    throw new Error('Option is not in the choice')
  }

  const operation = props.flow.operations[choice.operationUid]

  const updatedFlow = {
    ...props.flow,
    operations: {
      ...props.flow.operations
    }
  }

  const isOptionA = props.option === choice.aItemUid
  const output = isOptionA
    ? [choice.bItemUid, choice.aItemUid]
    : [choice.aItemUid, choice.bItemUid]

  const updatedOperation = {
    ...operation,
    aInput: [],
    bInput: [],
    output
  }

  updatedFlow.operations[choice.operationUid] = updatedOperation

  return updatedFlow
}
