import { createFlow, importItems, Flow } from '../../src'

export default function createThreeFlow (): Flow {
  const flow = createFlow({ uid: 'test' })
  const items = [
    { name: 'The Matrix', uid: '1', seed: 90 },
    { name: 'The Matrix Reloaded', uid: 2, seed: 30 },
    { name: 'The Matrix Revolutions', uid: '3', seed: 40 }
  ]
  const importedFlow = importItems({ flow, items })
  return importedFlow
}
