import { Flow } from './flowTypes'

export default function chooseOperationOption (props: {
  flow: Flow
  option: string
}): Flow {
  return props.flow
}
