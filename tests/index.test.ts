import {
  Choice,
  choiceSchema,
  Flow,
  flowSchema,
  Item,
  itemSchema,
  Episode,
  episodeSchema,
  Operation,
  operationSchema,
  Uid,
  uidSchema
} from '../src/index'

describe('index', () => {
  const choice: Choice = {
    a: '123',
    b: '456'
  }
  it('should export the Choice type', () => {
    expect(choice.a).toBe('123')
  })

  it('should export the choice schema', () => {
    expect(choiceSchema).toBeDefined()
    const parsed = choiceSchema.parse(choice)
    expect(parsed).toEqual(choice)
  })

  const episode: Episode = {
    type: 'import',
    items: [
      { name: 'The Matrix', uid: '1', seed: 90 },
      { name: 'The Matrix Reloaded', uid: '2', seed: 30 },
      { name: 'The Matrix Revolutions', uid: '3', seed: 40 }
    ]
  }
  it('should export the Episode type', () => {
    expect(episode.type).toBe('import')
  })

  it('should export the episode schema', () => {
    expect(episodeSchema).toBeDefined()
    const parsed = episodeSchema.parse(episode)
    expect(parsed).toEqual(episode)
  })

  const flow1: Flow = { uid: 'abc', itemCount: 0, items: {}, operations: {}, history: [], operationCount: 0 }
  const flow2: Flow = { uid: 134, itemCount: 0, items: {}, operations: {}, history: [], operationCount: 0 }
  it('should export the Flow type', () => {
    expect(flow1.uid).toBe('abc')
    expect(flow2.uid).toBe(134)
  })

  it('should export the flow schema', () => {
    expect(flowSchema).toBeDefined()
    const parsed = flowSchema.parse(flow1)
    expect(parsed).toEqual(flow1)
  })

  const item: Item = { name: 'Test Item', uid: '123', seed: 42 }
  it('should export the Item type', () => {
    expect(item.name).toBe('Test Item')
    expect(item.uid).toBe('123')
    expect(item.seed).toBe(42)
  })

  it('should export the item schema', () => {
    expect(itemSchema).toBeDefined()
    const parsed = itemSchema.parse(item)
    expect(parsed).toEqual(item)
  })

  const operation: Operation = {
    a: [123, '456'],
    ab: true,
    ascend: true,
    b: ['789', 101],
    output: ['102', 103],
    uid: '111'
  }
  const activeOperation: Operation = {
    a: [123, '456'],
    ab: true,
    ascend: true,
    b: ['789', 101],
    better: 987,
    output: ['102', 103],
    uid: '111',
    worse: '789'
  }
  it('should export the Operation type', () => {
    expect(operation.a).toEqual([123, '456'])
    expect(operation.ab).toBe(true)
    expect(operation.ascend).toBe(true)
    expect(operation.b).toEqual(['789', 101])
    expect(operation.output).toEqual(['102', 103])
    expect(activeOperation.better).toBe(987)
    expect(activeOperation.worse).toBe('789')
  })

  it('should export the operation schema', () => {
    expect(operationSchema).toBeDefined()
    const parsed = operationSchema.parse(operation)
    expect(parsed).toEqual(operation)
  })

  const stringUid: Uid = '123'
  const numberUid: Uid = 456
  it('should export the Uid type', () => {
    expect(typeof stringUid).toBe('string')
    expect(typeof numberUid).toBe('number')
  })

  it('should export the uid schema', () => {
    expect(uidSchema).toBeDefined()
    const parsed = uidSchema.parse(stringUid)
    expect(parsed).toEqual(stringUid)
    const parsedNumber = uidSchema.parse(numberUid)
    expect(parsedNumber).toEqual(numberUid)
  })
})
