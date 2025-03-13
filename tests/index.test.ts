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
  Uuid,
  uuidSchema
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
      { name: 'The Matrix', uuid: '1', seed: 90 },
      { name: 'The Matrix Reloaded', uuid: '2', seed: 30 },
      { name: 'The Matrix Revolutions', uuid: '3', seed: 40 }
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

  const flow: Flow = { seed: 'abc', itemCount: 0, items: {}, operations: {}, history: [], operationCount: 0 }
  it('should export the Flow type', () => {
    expect(flow.seed).toBe('abc')
  })

  it('should export the flow schema', () => {
    expect(flowSchema).toBeDefined()
    const parsed = flowSchema.parse(flow)
    expect(parsed).toEqual(flow)
  })

  const item: Item = { name: 'Test Item', uuid: '123', seed: 42 }
  it('should export the Item type', () => {
    expect(item.name).toBe('Test Item')
    expect(item.uuid).toBe('123')
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
    b: ['789', 101],
    output: ['102', 103],
    uuid: '111'
  }
  it('should export the Operation type', () => {
    expect(operation.a).toEqual([123, '456'])
    expect(operation.ab).toBe(true)
    expect(operation.b).toEqual(['789', 101])
    expect(operation.output).toEqual(['102', 103])
  })

  it('should export the operation schema', () => {
    expect(operationSchema).toBeDefined()
    const parsed = operationSchema.parse(operation)
    expect(parsed).toEqual(operation)
  })

  const stringUuid: Uuid = '123'
  const numberUuid: Uuid = 456
  it('should export the Uuid type', () => {
    expect(typeof stringUuid).toBe('string')
    expect(typeof numberUuid).toBe('number')
  })

  it('should export the uuid schema', () => {
    expect(uuidSchema).toBeDefined()
    const parsed = uuidSchema.parse(stringUuid)
    expect(parsed).toEqual(stringUuid)
    const parsedNumber = uuidSchema.parse(numberUuid)
    expect(parsedNumber).toEqual(numberUuid)
  })
})
