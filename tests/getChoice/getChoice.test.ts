import { createFlow, getChoice, importItems } from '../../src'

describe('getChoice', () => {
  const flow = createFlow({ seed: 'test' })
  describe('if the flow has no items', () => {
    it('should return undefined', () => {
      const choice = getChoice({ flow })
      expect(choice).toBeUndefined()
    })
  })

  const item1 = { name: 'item1', uuid: '1', seed: 0 }
  const item2 = { name: 'item2', uuid: 2, seed: 0 }
  const item3 = { name: 'item3', uuid: 3, seed: 0 }
  const items = [item1, item2, item3]
  const importedFlow = importItems({ flow, items })
  const importedOperations = Object.values(importedFlow.operations)

  describe('if an empty flow imports at least two new items', () => {
    it('should return a choice', () => {
      const choice = getChoice({ flow: importedFlow })
      expect(choice).toBeDefined()
    })

    const choice = getChoice({ flow: importedFlow })
    if (choice == null) {
      throw new Error('Choice should be defined')
    }

    it('should return a choice whose a and b are a new item UUIDs', () => {
      const someA = items.some(item => item.uuid === choice.a)
      expect(someA).toBe(true)
      const someB = items.some(item => item.uuid === choice.b)
      expect(someB).toBe(true)
    })
    const operation = importedOperations.find(operation => {
      return operation.a[0] === choice.a
    })
    if (operation == null) {
      throw new Error('Operation should be defined')
    }

    it('should return a choice whose a is the first element of the a input of an operation, and the b is the first element of the b input of that operation', () => {
      expect(operation.b[0]).toBe(choice.b)
    })

    it('should return a choice from the operation with the highest seed', () => {
      const operationWithHighestSeed = importedOperations.reduce((max, operation) => {
        return operation.seed > max.seed ? operation : max
      }, importedOperations[0])
      expect(operationWithHighestSeed.uuid).toBe(operation.uuid)
    })
  })
})
