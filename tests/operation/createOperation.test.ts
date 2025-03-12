import { createFlow, createOperation, Item, Uuid } from '../../src'

describe('createOperation', () => {
  const flow = createFlow({ seed: 'test' })
  const items = [
    { name: 'The Matrix', uuid: '1', seed: 90 },
    { name: 'The Matrix Reloaded', uuid: 2, seed: 30 },
    { name: 'The Matrix Revolutions', uuid: '3', seed: 40 },
    { name: 'The Matrix Resurrections', uuid: '4', seed: 0 },
    { name: 'The Animatrix', uuid: '5', seed: 80 }
  ]
  const newItems = items.reduce<Record<Uuid, Item>>((acc, item) => {
    acc[item.uuid] = item
    return acc
  }, {})
  flow.items = newItems
  const duplicateFlow = createFlow({ seed: 'test' })
  duplicateFlow.items = newItems
  const differentFlow = createFlow({ seed: 'different' })
  differentFlow.items = newItems

  it('should increase the operation count by 1', () => {
    flow.operationCount = 0
    createOperation({
      flow,
      a: ['1'],
      b: [2]
    })
    expect(flow.operationCount).toBe(1)
  })

  it('should have a predictably random UUID based on the flow seed and the current operation count', () => {
    flow.operationCount = 0
    const operation = createOperation({
      flow,
      a: ['1'],
      b: ['2']
    })
    expect(operation.uuid).toBeDefined()
    duplicateFlow.operationCount = 0
    const sameUuid = createOperation({
      flow: duplicateFlow,
      a: ['1'],
      b: ['2']
    })
    expect(sameUuid.uuid).toBeDefined()
    expect(sameUuid.uuid).toEqual(operation.uuid)
    differentFlow.operationCount = 0
    const differentUuid = createOperation({
      flow: differentFlow,
      a: ['1'],
      b: ['2']
    })
    expect(differentUuid.uuid).toBeDefined()
    expect(differentUuid.uuid).not.toEqual(operation.uuid)
  })

  it('should create an operation with specified inputs', () => {
    const operation = createOperation({
      flow,
      a: ['1'],
      b: [2]
    })
    expect(operation.uuid).toBeDefined()
    expect(operation.a).toEqual(['1'])
    expect(operation.ab).toBe(true)
    expect(operation.b).toEqual([2])
    expect(operation.output).toEqual([])
  })

  it('should create an operation with specified output', () => {
    const operation = createOperation({
      flow,
      output: ['1']
    })
    expect(operation.uuid).toBeDefined()
    expect(operation.a).toEqual([])
    expect(operation.b).toEqual([])
    expect(operation.output).toEqual(['1'])
  })
})
