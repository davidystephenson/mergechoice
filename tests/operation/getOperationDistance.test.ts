import { createFlow, createOperation, getOperationDistance, isOutputOperation } from '../../src'
import getInitialOptionIndex from '../../src/getInitialOptionIndex'

describe('getOperationDistance', () => {
  describe('if better is defined', () => {
    it('should throw an error if it is an output operation', () => {
      const flow = createFlow({ uid: 'test' })
      const operation = createOperation({
        flow,
        queue: [],
        catalog: [],
        output: ['a', 'b']
      })
      const output = isOutputOperation({ operation })
      expect(output).toBe(true)
      expect(() => getOperationDistance({ operation })).toThrow()
    })

    it('should throw an error if better is not a number', () => {
      const flow = createFlow({ uid: 'matrix' })
      const operation = createOperation({
        flow,
        queue: ['original'],
        catalog: ['reloaded', 'revolutions'],
        output: []
      })
      // @ts-expect-error
      operation.better = 'not a number'
      expect(() => getOperationDistance({ operation })).toThrow()
    })
    it('should throw an error if better is less than 1', () => {
      const flow = createFlow({ uid: 'test' })
      const operation = createOperation({
        flow,
        queue: ['original'],
        catalog: ['reloaded', 'revolutions'],
        output: []
      })
      operation.better = 0
      expect(() => getOperationDistance({ operation })).toThrow()
    })
    it('should throw an error if better is greater than the initial option index', () => {
      const flow = createFlow({ uid: 'matrix' })
      const operation = createOperation({
        flow,
        queue: ['original'],
        catalog: ['reloaded', 'revolutions'],
        output: []
      })
      const initial = getInitialOptionIndex({
        length: operation.catalog.length
      })
      expect(initial).toBe(0)
      operation.better = 1
      expect(() => getOperationDistance({ operation })).toThrow()
    })
  })

  it('should return zero for output operations', () => {
    const flow = createFlow({ uid: 'test' })
    const operation = createOperation({
      flow,
      queue: [],
      catalog: [],
      output: ['a', 'b']
    })
    const distance = getOperationDistance({ operation })
    expect(distance).toBe(0)
  })
})
