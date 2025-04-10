import {
  Choice,
  choiceSchema,
  Flow,
  flowSchema,
  Item,
  itemSchema,
  Operation,
  operationSchema,
  OperationDef,
  operationDefSchema,
  RankingItem,
  rankingItemSchema
} from '../src/index'

describe('index', () => {
  it('should export the Choice type and schema', () => {
    const choice: Choice = {
      aItemUid: '123',
      bItemUid: '456',
      operationUid: '111'
    }
    expect(choice.aItemUid).toBe('123')
    expect(choice.bItemUid).toBe('456')
    expect(choice.operationUid).toBe('111')
    const parsed = choiceSchema.parse(choice)
    expect(parsed).toEqual(choice)
  })

  it('should export the Flow type and schema', () => {
    const flow1: Flow = {
      count: 0, items: {}, operations: {}, uid: 'abc'
    }
    const flow2: Flow = {
      count: 0, items: {}, operations: {}, uid: '134'
    }
    const parsed1 = flowSchema.parse(flow1)
    expect(parsed1).toEqual(flow1)
    const parsed2 = flowSchema.parse(flow2)
    expect(parsed2).toEqual(flow2)
  })

  it('should export the Item type and schema', () => {
    const item: Item = { name: 'The Matrix', uid: '123', seed: 42 }
    const seedlessItem: Item = { name: 'The Matrix Reloaded', uid: '666' }
    const parsed = itemSchema.parse(item)
    expect(parsed).toEqual(item)
    const seedlessParsed = itemSchema.parse(seedlessItem)
    expect(seedlessParsed).toEqual(seedlessItem)
  })

  it('should export the RankingItem type and schema', () => {
    const rankingItem: RankingItem = { name: 'The Matrix', uid: '123', seed: 42, points: 0, rank: 2 }
    const seedlessRankingItem: RankingItem = { name: 'The Matrix Reloaded', uid: '666', points: 1, rank: 1 }
    const parsed = rankingItemSchema.parse(rankingItem)
    expect(parsed).toEqual(rankingItem)
    const seedlessParsed = rankingItemSchema.parse(seedlessRankingItem)
    expect(seedlessParsed).toEqual(seedlessRankingItem)
  })

  it('should export the Operation type and schema', () => {
    const operation1: Operation = {
      aInput: ['123', '456'],
      better: 0,
      bInput: ['789', '101'],
      output: ['102', '103'],
      uid: '111'
    }
    const parsed1 = operationSchema.parse(operation1)
    expect(parsed1).toEqual(operation1)
    const operation2: Operation = {
      aInput: [],
      better: undefined,
      bInput: [],
      output: ['102', '103'],
      uid: '111'
    }
    const parsed2 = operationSchema.parse(operation2)
    expect(parsed2).toEqual(operation2)
  })

  it('should export the OperationDef type and schema', () => {
    const operationDef: OperationDef = {
      aInput: ['123', '456'],
      bInput: ['789', '101'],
      output: ['102', '103']
    }
    const parsed = operationDefSchema.parse(operationDef)
    expect(parsed).toEqual(operationDef)
  })
})
