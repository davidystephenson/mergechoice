import { Flow } from './flowTypes'
import chooseOperationOption from './chooseOperationOption'
import combineOperations from './combineOperations'

export default function chooseOption (props: {
  flow: Flow
  option: string
}): Flow {
  const chosenFlow = chooseOperationOption({ flow: props.flow, option: props.option })
  const combinedFlow = combineOperations({ flow: chosenFlow })
  return combinedFlow
}
