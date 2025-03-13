import { createFlow, getChoice, importItems } from '../../src'

describe('getChoice', () => {
  const threeItemFlow = createFlow({ seed: 'test' })
  const fiveItemFlow = createFlow({ seed: 'test' })
  describe('if the flow has no items', () => {
    it('should return undefined', () => {
      const threeItemChoice = getChoice({ flow: threeItemFlow })
      expect(threeItemChoice).toBeUndefined()
      const fiveItemChoice = getChoice({ flow: fiveItemFlow })
      expect(fiveItemChoice).toBeUndefined()
    })
  })

  const item1 = { name: 'item1', uuid: '1', seed: 0 }
  const item2 = { name: 'item2', uuid: 2, seed: 0 }
  const item3 = { name: 'item3', uuid: 3, seed: 0 }
  const item4 = { name: 'item4', uuid: 4, seed: 0 }
  const item5 = { name: 'item5', uuid: 5, seed: 0 }
  const threeItems = [item1, item2, item3]
  const fiveItems = [item1, item2, item3, item4, item5]
  const threeItemImported = importItems({ flow: threeItemFlow, items: threeItems })
  const threeItemOperations = Object.values(threeItemImported.operations)
  const fiveItemImported = importItems({ flow: fiveItemFlow, items: fiveItems })
  const fiveItemOperations = Object.values(fiveItemImported.operations)

  describe('if an empty flow imports at least two new items', () => {
    const threeItemChoice = getChoice({ flow: threeItemImported })
    const fiveItemChoice = getChoice({ flow: fiveItemImported })

    it('should return a choice', () => {
      expect(threeItemChoice).toBeDefined()
      expect(fiveItemChoice).toBeDefined()
    })

    if (threeItemChoice == null) {
      throw new Error('Choice should be defined')
    }
    if (fiveItemChoice == null) {
      throw new Error('Choice should be defined')
    }

    it('should return a choice whose a and b are a new item UUIDs', () => {
      const someA = threeItems.some(item => item.uuid === threeItemChoice.a)
      expect(someA).toBe(true)
      const someB = threeItems.some(item => item.uuid === threeItemChoice.b)
      expect(someB).toBe(true)
    })

    const threeItemOperation = threeItemOperations.find(operation => {
      return operation.a[0] === threeItemChoice.a
    })
    it('should return a choice whose a is is the first element of an a input', () => {
      expect(threeItemOperation).toBeDefined()
    })
    if (threeItemOperation == null) {
      throw new Error('Operation should be defined')
    }

    const fiveItemOperation = fiveItemOperations.find(operation => {
      return operation.b[0] === fiveItemChoice.b
    })
    it('should return a choice whose b is is the first element of an b input', () => {
      expect(fiveItemOperation).toBeDefined()
    })
    if (fiveItemOperation == null) {
      throw new Error('Operation should be defined')
    }

    describe('if there are five new items length operation', () => {
      const longestOperation = threeItemOperations.reduce((max, operation) => {
        return operation.a.length + operation.b.length > max.a.length + max.b.length ? operation : max
      }, threeItemOperations[0])

      const longestOperations = threeItemOperations.filter(operation => {
        return operation.a.length + operation.b.length === longestOperation.a.length + longestOperation.b.length
      })

      it('should have a single longest input', () => {
        expect(longestOperations.length).toBe(1)
      })

      it('should return a choice from with the highest seed', () => {
        expect(longestOperation.uuid).toBe(threeItemOperation.uuid)
      })
    })

    describe('if there is a tie for the longest total input length', () => {
      const longestOperation = fiveItemOperations.reduce((max, operation) => {
        return operation.a.length + operation.b.length > max.a.length + max.b.length ? operation : max
      }, fiveItemOperations[0])

      const longestOperations = fiveItemOperations.filter(operation => {
        return operation.a.length + operation.b.length === longestOperation.a.length + longestOperation.b.length
      })

      it('should have a tie for longest input', () => {
        expect(longestOperations.length).toBeGreaterThan(1)
      })

      it('should return a choice from the operation with the highest uuid among the longest input operations', () => {
        const operationWithHighestUuid = longestOperations.reduce((max, operation) => {
          return operation.uuid > max.uuid ? operation : max
        }, longestOperations[0])

        expect(operationWithHighestUuid.uuid).toBe(fiveItemOperation.uuid)
      })
    })
  })
})
