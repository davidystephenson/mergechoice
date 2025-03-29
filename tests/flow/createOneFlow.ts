import { createFlow, importItems, Flow } from '../../src'

export default function createTwoFlow (): Flow {
  const flow = createFlow({ uid: 'test' })
  const items = [
    { name: 'The Matrix', uid: 'original', seed: 90 }
  ]
  const importedFlow = importItems({ flow, items })
  return importedFlow
}
