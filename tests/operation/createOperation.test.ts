import { createFlow, createOperation, Item, Uid } from '../../src'

describe('createOperation', () => {
  const flow = createFlow({ uid: 'test' })
  const items = [
    { name: 'The Matrix', uid: '1', seed: 90 },
    { name: 'The Matrix Reloaded', uid: 2, seed: 30 },
    { name: 'The Matrix Revolutions', uid: '3', seed: 40 },
    { name: 'The Matrix Resurrections', uid: '4', seed: 0 },
    { name: 'The Animatrix', uid: '5', seed: 80 }
  ]
  const newItems = items.reduce<Record<Uid, Item>>((acc, item) => {
    acc[item.uid] = item
    return acc
  }, {})
  flow.items = newItems
  const duplicateFlow = createFlow({ uid: 'test' })
  duplicateFlow.items = newItems
  const differentFlow = createFlow({ uid: 'different' })
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

  it('should have a predictably random UID based on the flow UID and the current operation count', () => {
    flow.operationCount = 0
    const operation = createOperation({
      flow,
      a: ['1'],
      b: ['2']
    })
    expect(operation.uid).toBeDefined()
    duplicateFlow.operationCount = 0
    const sameUid = createOperation({
      flow: duplicateFlow,
      a: ['1'],
      b: ['2']
    })
    expect(sameUid.uid).toBeDefined()
    expect(sameUid.uid).toEqual(operation.uid)
    differentFlow.operationCount = 0
    const differentUid = createOperation({
      flow: differentFlow,
      a: ['1'],
      b: ['2']
    })
    expect(differentUid.uid).toBeDefined()
    expect(differentUid.uid).not.toEqual(operation.uid)
  })

  it('should create an operation with specified inputs', () => {
    const operation = createOperation({
      flow,
      a: ['1'],
      b: [2]
    })
    expect(operation.uid).toBeDefined()
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
    expect(operation.uid).toBeDefined()
    expect(operation.a).toEqual([])
    expect(operation.b).toEqual([])
    expect(operation.output).toEqual(['1'])
  })
})
