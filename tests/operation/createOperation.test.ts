import { createFlow, createOperation, OperationDef } from '../../src'

describe('createOperation', () => {
  describe('if it is an input operation', () => {
    it('should create an operation with ab true, ascend true, better 0, and worse equal to the length of b minus 1', () => {
      const flow = createFlow({ uid: 'test' })
      const operation = createOperation({
        aInput: ['1'],
        bInput: ['2', '3', '4'],
        flow,
        output: []
      })
      expect(operation.better).toBe(undefined)
      expect(operation.worse).toBe(undefined)
    })
  })

  it('should throw an error if the operation is empty', () => {
    const flow = createFlow({ uid: 'test' })
    expect(() => createOperation({
      flow,
      aInput: [],
      bInput: [],
      output: []
    })).toThrow()
  })

  it('should throw an error if the operation has a duplicate UID', () => {
    const flow = createFlow({ uid: 'test' })
    expect(() => {
      createOperation({
        aInput: ['1'],
        bInput: ['1'],
        flow,
        output: ['1']
      })
    }).toThrow()
  })

  it('should throw an error if the operation has an a input but no b input', () => {
    const flow = createFlow({ uid: 'test' })
    expect(() => {
      createOperation({
        aInput: ['1'],
        bInput: [],
        flow,
        output: []
      })
    }).toThrow()
  })

  it('should throw an error if the operation has a b input but no a input', () => {
    const flow = createFlow({ uid: 'test' })
    expect(() => {
      createOperation({
        aInput: [],
        bInput: ['1'],
        flow,
        output: []
      })
    }).toThrow()
  })

  it('should throw an error if a is longer than b', () => {
    const flow = createFlow({ uid: 'test' })
    expect(() => {
      createOperation({
        aInput: ['1', '2'],
        bInput: ['3'],
        flow,
        output: []
      })
    }).toThrow()
  })

  it('should require an operation def', () => {
    const flow = createFlow({ uid: 'test' })
    // @ts-expect-error
    expect(() => createOperation({ flow })).toThrow()
    // @ts-expect-error
    expect(() => createOperation({ flow, aInput: ['1'], bInput: ['2'], output: null })).toThrow()
    // @ts-expect-error
    expect(() => createOperation({ flow, output: ['3'] })).toThrow()
    expect(() => {
      const operationDef: OperationDef = {
        aInput: ['1'],
        bInput: ['2'],
        output: []
      }
      createOperation({ flow, ...operationDef })
    }).not.toThrow()
  })

  it('should create an operation with better and worse undefined', () => {
    const flow = createFlow({ uid: 'test' })
    const operation = createOperation({
      aInput: ['1', '2'],
      bInput: ['3', '4'],
      flow,
      output: []
    })
    expect(operation.better).toBe(undefined)
    expect(operation.worse).toBe(undefined)
  })

  it('should create an operation with specified inputs', () => {
    const flow = createFlow({ uid: 'test' })
    const operation = createOperation({
      aInput: ['1'],
      bInput: ['2'],
      flow,
      output: []
    })
    expect(operation.uid).toBeDefined()
    expect(operation.aInput).toEqual(['1'])
    expect(operation.bInput).toEqual(['2'])
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
    sameUidDifferentCount.count = 1
    const differentUidDifferentCount = createFlow({ uid: 'different' })
    differentUidDifferentCount.count = 1
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
