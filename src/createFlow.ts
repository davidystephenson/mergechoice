import { Flow } from './flowTypes'

export default function createFlow (props: { uid: string }): Flow {
  if (props.uid == null) {
    throw new Error('UID is required')
  }
  if (typeof props.uid !== 'string') {
    throw new Error('UID must be a string')
  }
  return {
    history: [],
    itemCount: 0,
    items: {},
    operationCount: 0,
    operations: {},
    uid: props.uid
  }
}
