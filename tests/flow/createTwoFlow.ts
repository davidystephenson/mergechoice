import { createFlow, importItems, Flow } from '../../src'

export default function createTwoFlow (): Flow {
  const flow = createFlow({ uid: 'test' })
  const items = [
    { name: 'The Matrix', uid: 'original', seed: 90 },
    { name: 'The Matrix Reloaded', uid: 'reloaded', seed: 30 }
  ]
  const importedFlow = importItems({ flow, items })
  return importedFlow
}
