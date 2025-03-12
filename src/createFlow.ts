import { Flow } from './flowTypes'

export default function createFlow (props: { seed: string }): Flow {
  if (props.seed == null) {
    throw new Error('Seed is required')
  }
  if (typeof props.seed !== 'string') {
    throw new Error('Seed must be a string')
  }
  return {
    history: [],
    itemCount: 0,
    items: {},
    operationCount: 0,
    operations: {},
    seed: props.seed
  }
}
