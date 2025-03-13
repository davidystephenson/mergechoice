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

  // Update the operation to move both items to the output array
  // with the selected option first
  if (String(props.option) === choice.aItemId) {
    operation.output = [choice.aItemId, choice.bItemId]
    operation.aInput = []
    operation.bInput = []
  } else {
    operation.output = [choice.bItemId, choice.aItemId]
    operation.aInput = []
    operation.bInput = []
  }

  return props.flow
}
