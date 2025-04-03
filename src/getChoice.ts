import { Choice, Flow } from './flowTypes'
import isFlowComplete from './isFlowComplete'
import getChoiceOperation from './getChoiceOperation'
import getOptionIndex from './getOptionIndex'

export default function getChoice (props: {
  flow: Flow
}): Choice | undefined {
  if (isFlowComplete({ flow: props.flow })) {
    return undefined
  }

  const operations = Object.values(props.flow.operations)
  const operationsWithInputs = operations.filter(operation =>
    operation.aInput.length > 0 && operation.bInput.length > 0
  )

  if (operationsWithInputs.length === 0) {
    return undefined
  }

  const selectedOperation = getChoiceOperation({ flow: props.flow })

  const aItem = selectedOperation.aInput[0]
  const optionIndex = getOptionIndex({ operation: selectedOperation })
  const bItem = selectedOperation.bInput[optionIndex]

  return {
    aItem,
    bItem,
    operation: selectedOperation.uid
  }
}
