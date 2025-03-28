import { createFlow, importItems, Flow, Item } from '../../src'

export default function createImportedFlow (props: {
  uid: string
  items: Item[]
}): Flow {
  const flow = createFlow({ uid: props.uid })
  const importedFlow = importItems({ flow, items: props.items })
  return importedFlow
}
