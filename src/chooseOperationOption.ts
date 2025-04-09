import { Flow } from './flowTypes'
import getChoice from './getChoice'

export default function chooseOperationOption (props: {
  flow: Flow
  option: string
}): Flow {
  const choice = getChoice({ flow: props.flow })
  if (choice == null) {
    throw new Error('Flow has no choice')
  }

  const operation = props.flow.operations[choice.operationUid]
  if (operation == null) {
    throw new Error('Operation not found')
  }

  const validOption = props.option === choice.aItemUid || props.option === choice.bItemUid || props.option === '' || props.option === 'A'
  if (!validOption) {
    throw new Error('Option is not in the choice')
  }

  const updatedOperation = { ...operation }
  const singleBInput = operation.bInput.length === 1
  const aChosen = props.option === choice.aItemUid || props.option === '' || props.option === 'A'

  if (aChosen) {
    if (singleBInput) {
      if (updatedOperation.better != null) {
        throw new Error('Better cannot be defined when B input is single')
      }
      updatedOperation.output = [...operation.output, ...operation.bInput, ...operation.aInput]
      updatedOperation.aInput = []
      updatedOperation.bInput = []
    } else {
      if (updatedOperation.better == null) {
        updatedOperation.better = 0
      } else if (updatedOperation.worse == null) {
        updatedOperation.better = undefined
        updatedOperation.output = [...operation.output, ...operation.bInput, ...operation.aInput]
        updatedOperation.aInput = []
        updatedOperation.bInput = []
      }
    }
  }

  const updatedOperations = {
    ...props.flow.operations,
    [operation.uid]: updatedOperation
  }

  const updatedFlow = {
    ...props.flow,
    operations: updatedOperations
  }

  return updatedFlow
}
