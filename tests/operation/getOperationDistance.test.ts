import { createFlow, createOperation, getOperationDistance } from '../../src'

describe('getOperationDistance', () => {
  describe('if better is defined', () => {
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
  })

  it('should return zero for output operations', () => {
    const flow = createFlow({ uid: 'test' })
    const operation = createOperation({
      flow,
      aInput: [],
      bInput: [],
      output: ['a', 'b']
    })
    const distance = getOperationDistance({ operation })
    expect(distance).toBe(0)
  })
})
