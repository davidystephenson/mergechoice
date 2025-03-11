import { Flow, Uuid } from './flowTypes'

export default function createFlow (props: { seed: Uuid }): Flow {
  if (props.seed == null) {
    throw new Error('Seed is required')
  }
  return { seed: props.seed }
}
