import { createFlow, importItems, Flow } from '../../src'

export default function createTwoFlow (): Flow {
  const flow = createFlow({ uid: 'test' })
  const items = [
    { name: 'The Matrix', uid: '1', seed: 90 },
    { name: 'The Matrix Reloaded', uid: 2, seed: 30 }
  ]
  const importedFlow = importItems({ flow, items })
  return importedFlow
}
