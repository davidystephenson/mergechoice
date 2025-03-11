import { Flow } from './flowTypes'

export default function chooseOption (props: {
  flow: Flow
  option: 'a' | 'b'
}): Flow {
  if (props.flow.choice == null) {
    throw new Error('Flow has no choice to select from')
  }

  // Create a new flow with the selected option
  return {
    ...props.flow,
    selectedOption: props.option,
    selectedUuid: props.flow.choice[props.option]
  }
}
