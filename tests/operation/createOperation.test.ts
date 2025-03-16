import { createFlow, createOperation } from '../../src'

describe('createOperation', () => {
  it('should create an operation with ab true and ascend true', () => {
    const flow = createFlow({ uid: 'test' })
    const operation = createOperation({
      flow,
      a: ['1'],
      b: [2]
    })
    expect(operation.ab).toBe(true)
    expect(operation.ascend).toBe(true)
  })

  it('should require an operation def', () => {
    const flow = createFlow({ uid: 'test' })
    expect(() => createOperation({ flow })).toThrow()
    expect(() => createOperation({ flow, a: ['1'], b: [2] })).toThrow()
    expect(() => createOperation({ flow, output: ['3'] })).toThrow()
    expect(() => createOperation({ flow, a: ['1'], b: [2], output: ['3'] })).not.toThrow()
  })

  it('should create an operation with specified inputs', () => {
    const flow = createFlow({ uid: 'test' })
    const operation = createOperation({
      flow,
      a: ['1'],
      b: [2]
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
      flow,
      a: ['1'],
      b: ['2']
    })
    expect(operation.uid).toBeDefined()
    const sameUidSameCountOperation = createOperation({
      flow: sameUidSameCount,
      a: ['1'],
      b: ['2']
    })
    expect(sameUidSameCountOperation.uid).toEqual(operation.uid)
    const differentUidSameCountOperation = createOperation({
      flow: differentUidSameCount,
      a: ['1'],
      b: ['2']
    })
    expect(differentUidSameCountOperation.uid).not.toEqual(operation.uid)
    const sameUidDifferentCountOperation = createOperation({
      flow: sameUidDifferentCount,
      a: ['1'],
      b: ['2']
    })
    expect(sameUidDifferentCountOperation.uid).not.toEqual(operation.uid)
    const differentUidDifferentCountOperation = createOperation({
      flow: differentUidDifferentCount,
      a: ['1'],
      b: ['2']
    })
    expect(differentUidDifferentCountOperation.uid).not.toEqual(operation.uid)
  })
})
