import { createFlow, createOperation, OperationDef } from '../../src'

describe('createOperation', () => {
  it('should create an operation with ab true, ascend true, better 0, and worse equal to the length of b minus 1', () => {
    const flow = createFlow({ uid: 'test' })
    const operation = createOperation({
      aInput: ['1'],
      bInput: [2, 3, '4'],
      flow,
      output: []
    })
    expect(operation.ab).toBe(true)
    expect(operation.ascend).toBe(true)
    expect(operation.better).toBe(0)
    expect(operation.worse).toBe(2)
  })

  it('should require an operation def', () => {
    const flow = createFlow({ uid: 'test' })
    // @ts-expect-error
    expect(() => createOperation({ flow })).toThrow()
    // @ts-expect-error
    expect(() => createOperation({ flow, aInput: ['1'], bInput: [2], output: null })).toThrow()
    // @ts-expect-error
    expect(() => createOperation({ flow, output: ['3'] })).toThrow()
    expect(() => {
      const operationDef: OperationDef = {
        aInput: ['1'],
        bInput: [2],
        output: []
      }
      createOperation({ flow, ...operationDef })
    }).not.toThrow()
  })

  it('should create an operation with specified inputs', () => {
    const flow = createFlow({ uid: 'test' })
    const operation = createOperation({
      aInput: ['1'],
      bInput: [2],
      flow,
      output: []
    })
    expect(operation.uid).toBeDefined()
    expect(operation.aInput).toEqual(['1'])
    expect(operation.ab).toBe(true)
    expect(operation.bInput).toEqual([2])
    expect(operation.output).toEqual([])
  })

  it('should create an operation with specified output', () => {
    const flow = createFlow({ uid: 'test' })
    const operation = createOperation({
      aInput: [],
      bInput: [],
      flow,
      output: ['1']
    })
    expect(operation.uid).toBeDefined()
    expect(operation.aInput).toEqual([])
    expect(operation.bInput).toEqual([])
    expect(operation.output).toEqual(['1'])
  })

  it('should have a predictably random UID based on the flow UID and the current operation count', () => {
    const flow = createFlow({ uid: 'test' })
    const sameUidSameCount = createFlow({ uid: 'test' })
    const differentUidSameCount = createFlow({ uid: 'different' })
    const sameUidDifferentCount = createFlow({ uid: 'test' })
    sameUidDifferentCount.operationCount = 1
    const differentUidDifferentCount = createFlow({ uid: 'different' })
    differentUidDifferentCount.operationCount = 1
    const operation = createOperation({
      aInput: ['1'],
      bInput: ['2'],
      flow,
      output: []
    })
    expect(operation.uid).toBeDefined()
    const sameUidSameCountOperation = createOperation({
      aInput: ['1'],
      bInput: ['2'],
      flow: sameUidSameCount,
      output: []
    })
    expect(sameUidSameCountOperation.uid).toEqual(operation.uid)
    const differentUidSameCountOperation = createOperation({
      aInput: ['1'],
      bInput: ['2'],
      flow: differentUidSameCount,
      output: []
    })
    expect(differentUidSameCountOperation.uid).not.toEqual(operation.uid)
    const sameUidDifferentCountOperation = createOperation({
      aInput: ['1'],
      bInput: ['2'],
      flow: sameUidDifferentCount,
      output: []
    })
    expect(sameUidDifferentCountOperation.uid).not.toEqual(operation.uid)
    const differentUidDifferentCountOperation = createOperation({
      aInput: ['1'],
      bInput: ['2'],
      flow: differentUidDifferentCount,
      output: []
    })
    expect(differentUidDifferentCountOperation.uid).not.toEqual(operation.uid)
  })
})
