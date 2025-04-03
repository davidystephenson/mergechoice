import { isMixedOperation, Operation } from '../../src'

describe('isMixedOperation', () => {
  it('should return true for mixed operations', () => {
    const operation: Operation = {
      uid: '1',
      aInput: ['a'],
      bInput: ['b'],
      output: ['c', 'd'],
      better: undefined,
      worse: undefined
    }
    const result = isMixedOperation({ operation })
    expect(result).toBe(true)
  })

  it('should return false for output operations', () => {
    const operation: Operation = {
      uid: '1',
      aInput: [],
      bInput: [],
      output: ['a', 'b'],
      better: undefined,
      worse: undefined
    }
    const result = isMixedOperation({ operation })
    expect(result).toBe(false)
  })

  it('should return false for input operations', () => {
    const operation: Operation = {
      uid: '1',
      aInput: ['a'],
      bInput: ['b'],
      output: [],
      better: undefined,
      worse: undefined
    }
    const result = isMixedOperation({ operation })
    expect(result).toBe(false)
  })
})
