import { createFlow, importItems, Flow } from '../../src'

export default function createTwoFlow (): Flow {
  const flow = createFlow({ uid: 'test' })
  const items = [
    { name: 'The Matrix', uid: '1', seed: 90 }
  ]
  const importedFlow = importItems({ flow, items })
  return importedFlow
}
