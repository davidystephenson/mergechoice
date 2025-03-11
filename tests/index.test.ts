import { itemSchema, flowSchema, Item, Flow, Uuid } from '../src/index'

describe('index', () => {
  it('should export the item schema', () => {
    expect(itemSchema).toBeDefined()
    const item: Item = { name: 'The Matrix', uuid: '1', seed: 90 }
    const parsed = itemSchema.parse(item)
    expect(parsed).toEqual(item)
  })

  it('should export the flow schema', () => {
    expect(flowSchema).toBeDefined()
    const flow: Flow = { seed: 'abc' }
    const parsed = flowSchema.parse(flow)
    expect(parsed).toEqual(flow)
  })

  it('should export the Item type', () => {
    const item: Item = { name: 'Test Item', uuid: '123', seed: 42 }
    expect(item.name).toBe('Test Item')
    expect(item.uuid).toBe('123')
    expect(item.seed).toBe(42)
  })

  it('should export the Flow type', () => {
    const flow: Flow = { seed: 'test-seed' }
    expect(flow.seed).toBe('test-seed')
  })

  it('should export the Uuid type', () => {
    const stringUuid: Uuid = '123'
    const numberUuid: Uuid = 456
    expect(typeof stringUuid).toBe('string')
    expect(typeof numberUuid).toBe('number')
  })

  it('should export the Operation type', () => {
    const operation: Operation = {
      a: [123, '456'],
      b: ['789', 101],
      result: ['102', 103]
    }
    expect(operation.a).toEqual([123, '456'])
    expect(operation.b).toEqual(['789', 101])
    expect(operation.result).toEqual(['102', 103])
  })

  it('should export the Episode type', () => {
    const episode: Episode = {
      type: 'import',
      items: [
        { name: 'The Matrix', uuid: '1', seed: 90 },
        { name: 'The Matrix Reloaded', uuid: '2', seed: 30 },
        { name: 'The Matrix Revolutions', uuid: '3', seed: 40 }
      ]
    }
    expect(episode.type).toBe('import')
  })
})
