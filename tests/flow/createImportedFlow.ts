import { createFlow, importItems, Flow, Item, Uid } from '../../src'

export default function createImportedFlow (props: {
  uid: Uid
  items: Item[]
}): Flow {
  const flow = createFlow({ uid: props.uid })
  const importedFlow = importItems({ flow, items: props.items })
  return importedFlow
}
