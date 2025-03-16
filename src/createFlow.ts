import { Flow, Uid } from './flowTypes'

export default function createFlow (props: { uid: Uid }): Flow {
  if (props.uid == null) {
    throw new Error('UID is required')
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
