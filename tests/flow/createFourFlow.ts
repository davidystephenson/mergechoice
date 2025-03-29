import { Flow } from '../../src'
import createImportedFlow from './createImportedFlow'

export default function createFourFlow (): Flow {
  const items = [
    { name: 'The Matrix', uid: 'original', seed: 90 },
    { name: 'The Matrix Reloaded', uid: 'reloaded', seed: 30 },
    { name: 'The Matrix Revolutions', uid: 'revolutions', seed: 40 },
    { name: 'The Matrix Resurrections', uid: 'resurrections', seed: 10 }
  ]
  const importedFlow = createImportedFlow({ uid: 'test', items })
  return importedFlow
}
