import { createFlow, createOperation, getOperationDistance } from '../../src'

describe('getOperationDistance', () => {
  it('should throw an error if better is less than zero', () => {
    const flow = createFlow({ uid: 'test' })
    const operation = createOperation({
      flow,
      aInput: [],
      bInput: [],
      output: ['a', 'b']
    })
    operation.better = -1
    expect(() => getOperationDistance({ operation })).toThrow()
  })

  it('should throw an error if worse is less than negative one', () => {
    const flow = createFlow({ uid: 'test' })
    const operation = createOperation({
      flow,
      aInput: [],
      bInput: [],
      output: ['a', 'b']
    })
    operation.worse = -2
    expect(() => getOperationDistance({ operation })).toThrow()
  })

  it('should throw an error if worse is greater than the length of bInput minus one', () => {
    const flow = createFlow({ uid: 'test' })
    const operation = createOperation({
      flow,
      aInput: ['d', 'e'],
      bInput: ['a', 'b'],
      output: ['c']
    })
    operation.worse = 2
    expect(() => getOperationDistance({ operation })).toThrow()
  })

  it('should subtract better from the sum', () => {
    const flow = createFlow({ uid: 'test' })
    const operation = createOperation({
      flow,
      aInput: ['a', 'b'],
      bInput: ['c', 'd'],
      output: ['e']
    })
    operation.better = 1
    expect(operation.better).toBe(1)
    expect(operation.worse).toBe(1)
    const sum = operation.aInput.length + operation.bInput.length
    expect(sum).toBe(4)
    const distance = getOperationDistance({ operation })
    expect(distance).toBe(3)
  })

  it('should subtract the difference between worse and length of b minus one', () => {
    const flow = createFlow({ uid: 'test' })
    const operation = createOperation({
      flow,
      aInput: ['a', 'b'],
      bInput: ['c', 'd', 'e', 'f', 'g', 'h'],
      output: ['i']
    })
    operation.worse = 2
    expect(operation.better).toBe(0)
    expect(operation.worse).toBe(2)
    const maximumWorse = operation.bInput.length - 1
    expect(maximumWorse).toBe(5)
    const difference = maximumWorse - operation.worse
    expect(difference).toBe(3)
    const sum = operation.aInput.length + operation.bInput.length
    expect(sum).toBe(8)
    const distance = getOperationDistance({ operation })
    expect(distance).toBe(5)
  })

  it('should subtract both', () => {
    const flow = createFlow({ uid: 'test' })
    const operation = createOperation({
      flow,
      aInput: ['a', 'b'],
      bInput: ['c', 'd', 'e', 'f', 'g', 'h'],
      output: ['i']
    })
    operation.worse = 2
    operation.better = 1
    const distance = getOperationDistance({ operation })
    expect(distance).toBe(4)
  })

  it('should return zero for output operations', () => {
    const flow = createFlow({ uid: 'test' })
    const operation = createOperation({
      flow,
      aInput: [],
      bInput: [],
      output: ['a', 'b']
    })
    console.log('operation', operation)
    expect(operation.better).toBe(0)
    expect(operation.worse).toBe(-1)
    const distance = getOperationDistance({ operation })
    expect(distance).toBe(0)
  })
})
