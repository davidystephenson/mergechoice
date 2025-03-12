import Rand from 'rand-seed'
import createUuid from './createUuid'
import { Flow, Operation, Uuid } from './flowTypes'

export default function createOperation (props: {
  flow: Flow
  a?: Uuid[]
  b?: Uuid[]
  output?: Uuid[]
}): Operation {
  const currentCount = props.flow.operationCount ?? 0
  props.flow.operationCount = currentCount + 1

  const uuid = createUuid({ seed: props.flow.seed, count: currentCount })

  const a = props.a ?? []
  const b = props.b ?? []
  const output = props.output ?? []

  const seedString = `${props.flow.seed}-${props.flow.operationCount}`

  const rand = new Rand(seedString)
  const seed = rand.next()

  const operation: Operation = {
    uuid,
    a,
    ab: true,
    b,
    output,
    seed
  }

  props.flow.operations[uuid] = operation

  return operation
}
