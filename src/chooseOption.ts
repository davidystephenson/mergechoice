import { Flow, Uuid } from './flowTypes'

export default function chooseOption (props: {
  flow: Flow
  option: Uuid
}): Flow {
  if (props.flow.choice == null) {
    throw new Error('Flow has no choice')
  }

  const { a, b } = props.flow.choice

  if (props.option !== a && props.option !== b) {
    throw new Error('Option is not the a UUID or b UUID')
  }

  // Create a new flow with the selected option
  return {
    ...props.flow,
    choice: undefined
  }
}
