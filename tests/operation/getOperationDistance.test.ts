import { createFlow, createOperation, getOperationDistance } from '../../src'

describe('getOperationDistance', () => {
  it('should throw an error if worse is defined but not better', () => {
    const flow = createFlow({ uid: 'test' })
    const operation = createOperation({
      flow,
      aInput: [],
      bInput: [],
      output: ['a', 'b']
    })
    operation.worse = 0
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
    it('should subtract better plus 1 from the sum', () => {
      const flow = createFlow({ uid: 'test' })
      const operation = createOperation({
        flow,
        aInput: ['a', 'b'],
        bInput: ['c', 'd'],
        output: ['e']
      })
      operation.better = 1
      const betterPlusOne = operation.better + 1
      expect(betterPlusOne).toBe(2)
      expect(operation.worse).toBe(undefined)
      const sum = operation.aInput.length + operation.bInput.length
      expect(sum).toBe(4)
      const distance = getOperationDistance({ operation })
      expect(distance).toBe(2)
    })

    describe('if worse is also defined', () => {
      it('should throw an error if worse is less than better', () => {
        const flow = createFlow({ uid: 'test' })
        const operation = createOperation({
          flow,
          aInput: [],
          bInput: [],
          output: ['a', 'b']
        })
        operation.worse = 1
        operation.better = 2
        expect(() => getOperationDistance({ operation })).toThrow()
      })

      it('should throw an error if worse and better are equal', () => {
        const flow = createFlow({ uid: 'test' })
        const operation = createOperation({
          flow,
          aInput: [],
          bInput: [],
          output: ['a', 'b']
        })
        operation.worse = 0
        operation.better = 0
        expect(() => getOperationDistance({ operation })).toThrow()
      })

      it('should also subtract the difference between worse minus 1 and length of b minus 1', () => {
        const flow = createFlow({ uid: 'test' })
        const operation = createOperation({
          flow,
          aInput: ['a', 'b'],
          bInput: ['c', 'd', 'e', 'f', 'g', 'h'],
          output: ['i']
        })
        operation.worse = 2
        operation.better = 1
        const betterPlusOne = operation.better + 1
        expect(betterPlusOne).toBe(2)
        const worseMinusOne = operation.worse - 1
        expect(worseMinusOne).toBe(1)
        const maximumWorse = operation.bInput.length - 1
        expect(maximumWorse).toBe(5)
        const worseReduction = maximumWorse - worseMinusOne
        expect(worseReduction).toBe(4)
        const sum = operation.aInput.length + operation.bInput.length
        expect(sum).toBe(8)
        const difference = sum - worseReduction - betterPlusOne
        expect(difference).toBe(2)
        const distance = getOperationDistance({ operation })
        expect(distance).toBe(2)
      })
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
    expect(operation.better).toBe(undefined)
    expect(operation.worse).toBe(undefined)
    const distance = getOperationDistance({ operation })
    expect(distance).toBe(0)
  })
})
