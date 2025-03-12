import { Flow, Uuid } from './flowTypes'
import getChoice from './getChoice'

export default function chooseOption (props: {
  flow: Flow
  option: Uuid
}): Flow {
  const choice = getChoice({ flow: props.flow })
  if (choice == null) {
    throw new Error('Flow has no choice')
  }

  if (props.option !== choice.a && props.option !== choice.b) {
    throw new Error('Option is not the a UUID or b UUID')
  }

  return props.flow
}
