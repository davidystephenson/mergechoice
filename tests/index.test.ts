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
  OperationDef,
  operationDefSchema,
  Uid,
  uidSchema,
  RankingItem,
  rankingItemSchema
} from '../src/index'

describe('index', () => {
  it('should export the Choice type and schema', () => {
    const choice: Choice = {
      aItemId: '123',
      bItemId: 456,
      operationId: '111'
    }
    expect(choice.aItemId).toBe('123')
    expect(choice.bItemId).toBe(456)
    expect(choice.operationId).toBe('111')
    const parsed = choiceSchema.parse(choice)
    expect(parsed).toEqual(choice)
  })

  it('should export the Episode type and schema', () => {
    const episode: Episode = {
      type: 'import',
      items: [
        { name: 'The Matrix', uid: '1', seed: 90 },
        { name: 'The Matrix Reloaded', uid: '2', seed: 30 },
        { name: 'The Matrix Revolutions', uid: '3', seed: 40 }
      ]
    }
    expect(episode.type).toBe('import')
    const parsed = episodeSchema.parse(episode)
    expect(parsed).toEqual(episode)
  })

  it('should export the Flow type and schema', () => {
    const flow1: Flow = {
      uid: 'abc', itemCount: 0, items: {}, operations: {}, history: [], operationCount: 0
    }
    const flow2: Flow = {
      uid: 134, itemCount: 0, items: {}, operations: {}, history: [], operationCount: 0
    }
    expect(flow1.uid).toBe('abc')
    expect(flow2.uid).toBe(134)
    const parsed1 = flowSchema.parse(flow1)
    expect(parsed1).toEqual(flow1)
    const parsed2 = flowSchema.parse(flow2)
    expect(parsed2).toEqual(flow2)
  })

  it('should export the Item type and schema', () => {
    const item: Item = { name: 'Test Item', uid: '123', seed: 42 }
    const numberItem: Item = { name: 'Test Item', uid: 666, seed: 42 }
    expect(item.name).toBe('Test Item')
    expect(item.uid).toBe('123')
    expect(item.seed).toBe(42)
    const parsed = itemSchema.parse(item)
    expect(parsed).toEqual(item)
    const numberParsed = itemSchema.parse(numberItem)
    expect(numberParsed).toEqual(numberItem)
  })

  it('should export the RankingItem type and schema', () => {
    const rankingItem: RankingItem = { name: 'Test Item A', uid: '123', seed: 42, points: 0, rank: 2 }
    const numberRankingItem: RankingItem = { name: 'Test Item 1', uid: 666, seed: 42, points: 1, rank: 1 }
    const parsed = rankingItemSchema.parse(rankingItem)
    expect(parsed).toEqual(rankingItem)
    const numberParsed = rankingItemSchema.parse(numberRankingItem)
    expect(numberParsed).toEqual(numberRankingItem)
  })

  it('should export the Operation type and schema', () => {
    const operation: Operation = {
      aInput: [123, '456'],
      ab: true,
      ascend: true,
      better: 0,
      bInput: ['789', 101],
      output: ['102', 103],
      uid: '111',
      worse: 1
    }
    const activeOperation: Operation = {
      aInput: [123, '456'],
      ab: true,
      ascend: true,
      better: 0,
      bInput: ['789', 101],
      output: ['102', 103],
      uid: '111',
      worse: 1
    }
    const parsed = operationSchema.parse(operation)
    expect(parsed).toEqual(operation)
    const parsedActive = operationSchema.parse(activeOperation)
    expect(parsedActive).toEqual(activeOperation)
  })

  it('should export the OperationDef type and schema', () => {
    const operationDef: OperationDef = {
      aInput: ['123', '456'],
      bInput: ['789', 101],
      output: ['102', 103]
    }
    const parsed = operationDefSchema.parse(operationDef)
    expect(parsed).toEqual(operationDef)
  })

  it('should export the Uid type and schema', () => {
    const stringUid: Uid = '123'
    const numberUid: Uid = 456
    expect(typeof stringUid).toBe('string')
    expect(typeof numberUid).toBe('number')
    const parsed = uidSchema.parse(stringUid)
    expect(parsed).toEqual(stringUid)
    const parsedNumber = uidSchema.parse(numberUid)
    expect(parsedNumber).toEqual(numberUid)
  })
})
