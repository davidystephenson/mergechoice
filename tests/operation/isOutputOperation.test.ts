import { isOutputOperation, Operation } from '../../src'

describe('isOutputOperation', () => {
  it('should return true for output operations', () => {
    const operation: Operation = {
      uid: '1',
      queue: [],
      catalog: [],
      output: ['a', 'b'],
      better: undefined
    }
    const result = isOutputOperation({ operation })
    expect(result).toBe(true)
  })

  it('should return false for input operations', () => {
    const operation: Operation = {
      uid: '1',
      queue: ['a'],
      catalog: ['b'],
      output: [],
      better: undefined
    }
    const result = isOutputOperation({ operation })
    expect(result).toBe(false)
  })

  it('should return false for mixed operations', () => {
    const operation: Operation = {
      uid: '1',
      queue: ['a'],
      catalog: ['b'],
      output: ['c', 'd'],
      better: undefined
    }
    const result = isOutputOperation({ operation })
    expect(result).toBe(false)
  })
})
