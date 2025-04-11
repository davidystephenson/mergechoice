import { Flow } from '../../src'
import createImportedFlow from './createImportedFlow'

export default function createFourFlow (): Flow {
  const items = [
    { label: 'The Matrix', uid: 'original', seed: 90 },
    { label: 'The Matrix Reloaded', uid: 'reloaded', seed: 30 },
    { label: 'The Matrix Revolutions', uid: 'revolutions', seed: 40 },
    { label: 'The Matrix Resurrections', uid: 'resurrections', seed: 10 }
  ]
  const importedFlow = createImportedFlow({ uid: 'test', items })
  return importedFlow
}
