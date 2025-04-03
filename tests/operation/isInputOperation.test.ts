import { isInputOperation, Operation } from '../../src'

describe('isInputOperation', () => {
  it('should return true for input operations', () => {
    const operation: Operation = {
      uid: '1',
      aInput: ['a'],
      bInput: ['b'],
      output: [],
      better: undefined,
      worse: undefined
    }
    const result = isInputOperation({ operation })
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
    const result = isInputOperation({ operation })
    expect(result).toBe(false)
  })

  it('should return false for mixed operations', () => {
    const operation: Operation = {
      uid: '1',
      aInput: ['a'],
      bInput: ['b'],
      output: ['c', 'd'],
      better: undefined,
      worse: undefined
    }
    const result = isInputOperation({ operation })
    expect(result).toBe(false)
  })
})
