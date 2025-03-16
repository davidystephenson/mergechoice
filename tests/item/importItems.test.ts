import { createFlow, importItems } from '../../src/index'
import getImportInputsOperation from './getImportInputsOperation'
import verifyItemInOperations from './verifyItemInOperations'

describe('importItems', () => {
  it('should throw an error if the items are empty', () => {
    expect(() => importItems({ flow: createFlow({ uid: 'test' }), items: [] })).toThrow()
  })

  it('throws an error if the new items have duplicate UIDs', () => {
    const item1 = { name: 'The Matrix', uid: '1', seed: 90 }
    expect(() => importItems({ flow: createFlow({ uid: 'test' }), items: [item1, item1] })).toThrow()
  })

  it('should throw an error if the items UIDs are not unique', () => {
    expect(() => {
      const flow = createFlow({ uid: 'test' })
      const item1 = { name: 'The Matrix', uid: '1', seed: 90 }
      const item2 = { name: 'The Matrix Leaked', uid: '1', seed: 90 }
      const importedFlow = importItems({ flow, items: [item1, item2] })
      importItems({ flow: importedFlow, items: [item1] })
    }).toThrow()
  })

  it('increases the item count by the number of items imported', () => {
    const item1 = { name: 'The Matrix', uid: '1', seed: 90 }
    const item2 = { name: 'The Matrix Reloaded', uid: 2, seed: 30 }
    const item3 = { name: 'The Matrix Revolutions', uid: '3', seed: 40 }
    const item4 = { name: 'The Matrix Resurrections', uid: '4', seed: 0 }
    const item5 = { name: 'The Animatrix', uid: '5', seed: 80 }
    const oneItem = [item1]
    const twoItems = [item1, item2]
    const threeItems = [item1, item2, item3]
    const fourItems = [item1, item2, item3, item4]
    const fiveItems = [item1, item2, item3, item4, item5]
    const oneItemFlow = importItems({ flow: createFlow({ uid: 'test' }), items: oneItem })
    const twoItemFlow = importItems({ flow: createFlow({ uid: 'test' }), items: twoItems })
    const threeItemFlow = importItems({ flow: createFlow({ uid: 'test' }), items: threeItems })
    const fourItemFlow = importItems({ flow: createFlow({ uid: 'test' }), items: fourItems })
    const fiveItemFlow = importItems({ flow: createFlow({ uid: 'test' }), items: fiveItems })
    expect(oneItemFlow.itemCount).toBe(1)
    expect(twoItemFlow.itemCount).toBe(2)
    expect(threeItemFlow.itemCount).toBe(3)
    expect(fourItemFlow.itemCount).toBe(4)
    expect(fiveItemFlow.itemCount).toBe(5)
  })

  describe('should return a flow with the items', () => {
    it('should include the items indexed by uid', () => {
      const flow = createFlow({ uid: 'test' })
      const item1 = { name: 'The Matrix', uid: '1', seed: 90 }
      const item2 = { name: 'The Matrix Reloaded', uid: 2, seed: 30 }
      const item3 = { name: 'The Matrix Revolutions', uid: '3', seed: 40 }
      const importedFlow = importItems({ flow, items: [item1, item2, item3] })
      expect(importedFlow.items[item1.uid]).toEqual(item1)
      expect(importedFlow.items[item2.uid]).toEqual(item2)
      expect(importedFlow.items[item3.uid]).toEqual(item3)
    })

    it('should include the items in operations', () => {
      const flow = createFlow({ uid: 'test' })
      const item1 = { name: 'The Matrix', uid: '1', seed: 90 }
      const item2 = { name: 'The Matrix Reloaded', uid: 2, seed: 30 }
      const item3 = { name: 'The Matrix Revolutions', uid: '3', seed: 40 }
      const importedFlow = importItems({ flow, items: [item1, item2, item3] })
      expect(importedFlow.items[item1.uid]).toEqual(item1)
      expect(importedFlow.items[item2.uid]).toEqual(item2)
      expect(importedFlow.items[item3.uid]).toEqual(item3)
      verifyItemInOperations({ flow: importedFlow, item: item1 })
      verifyItemInOperations({ flow: importedFlow, item: item2 })
      verifyItemInOperations({ flow: importedFlow, item: item3 })
    })

    it('should return the same operation UIDs with the same flow UID', () => {
      const flow = createFlow({ uid: 'test' })
      const item1 = { name: 'The Matrix', uid: '1', seed: 90 }
      const item2 = { name: 'The Matrix Reloaded', uid: 2, seed: 30 }
      const item3 = { name: 'The Matrix Revolutions', uid: '3', seed: 40 }
      const item4 = { name: 'The Matrix Resurrections', uid: '4', seed: 0 }
      const item5 = { name: 'The Animatrix', uid: '5', seed: 80 }
      const items = [item1, item2, item3, item4, item5]
      const importedFlow = importItems({ flow, items })
      const operations = Object.values(importedFlow.operations)
      const duplicateFlow = createFlow({ uid: 'test' })
      const duplicateImportedFlow = importItems({ flow: duplicateFlow, items })
      const duplicateOperations = Object.values(duplicateImportedFlow.operations)
      const same = operations.every((operation, index) => {
        const sameOperation = duplicateOperations[index]
        return sameOperation.uid === operation.uid
      })
      expect(same).toBe(true)
    })

    it('should return the same inputs with the same flow UID', () => {
      const flow = createFlow({ uid: 'test' })
      const item1 = { name: 'The Matrix', uid: '1', seed: 90 }
      const item2 = { name: 'The Matrix Reloaded', uid: 2, seed: 30 }
      const item3 = { name: 'The Matrix Revolutions', uid: '3', seed: 40 }
      const item4 = { name: 'The Matrix Resurrections', uid: '4', seed: 0 }
      const item5 = { name: 'The Animatrix', uid: '5', seed: 80 }
      const items = [item1, item2, item3, item4, item5]
      const importedFlow = importItems({ flow, items })
      const operations = Object.values(importedFlow.operations)
      const duplicateFlow = createFlow({ uid: 'test' })
      const duplicateImportedFlow = importItems({ flow: duplicateFlow, items })
      const duplicateOperations = Object.values(duplicateImportedFlow.operations)
      const same = operations.every((operation, index) => {
        const sameOperation = duplicateOperations[index]
        const sameA = sameOperation.aInput[0] === operation.aInput[0]
        if (!sameA) {
          return false
        }
        const sameB = sameOperation.bInput[0] === operation.bInput[0]
        return sameB
      })
      expect(same).toBe(true)
    })

    it('should return the same outputs with the same flow UID', () => {
      const flow = createFlow({ uid: 'test' })
      const item1 = { name: 'The Matrix', uid: '1', seed: 90 }
      const item2 = { name: 'The Matrix Reloaded', uid: 2, seed: 30 }
      const item3 = { name: 'The Matrix Revolutions', uid: '3', seed: 40 }
      const item4 = { name: 'The Matrix Resurrections', uid: '4', seed: 0 }
      const item5 = { name: 'The Animatrix', uid: '5', seed: 80 }
      const items = [item1, item2, item3, item4, item5]
      const importedFlow = importItems({ flow, items })
      const operations = Object.values(importedFlow.operations)
      const duplicateFlow = createFlow({ uid: 'test' })
      const duplicateImportedFlow = importItems({ flow: duplicateFlow, items })
      const duplicateOperations = Object.values(duplicateImportedFlow.operations)
      const same = operations.every((operation, index) => {
        const sameOperation = duplicateOperations[index]
        const sameOutput = sameOperation.output[0] === operation.output[0]
        return sameOutput
      })
      expect(same).toBe(true)
    })

    it('should return the same number of operations with a different flow UID', () => {
      const flow = createFlow({ uid: 'test' })
      const item1 = { name: 'The Matrix', uid: '1', seed: 90 }
      const item2 = { name: 'The Matrix Reloaded', uid: 2, seed: 30 }
      const item3 = { name: 'The Matrix Revolutions', uid: '3', seed: 40 }
      const item4 = { name: 'The Matrix Resurrections', uid: '4', seed: 0 }
      const item5 = { name: 'The Animatrix', uid: '5', seed: 80 }
      const items = [item1, item2, item3, item4, item5]
      const importedFlow = importItems({ flow, items })
      const operations = Object.values(importedFlow.operations)
      const differentFlow = createFlow({ uid: 'different' })
      const differentImportedFlow = importItems({ flow: differentFlow, items })
      const differentOperations = Object.values(differentImportedFlow.operations)
      expect(operations.length).toBe(differentOperations.length)
    })

    it('should return different operation UIDs with a different flow UID', () => {
      const flow = createFlow({ uid: 'test' })
      const item1 = { name: 'The Matrix', uid: '1', seed: 90 }
      const item2 = { name: 'The Matrix Reloaded', uid: 2, seed: 30 }
      const item3 = { name: 'The Matrix Revolutions', uid: '3', seed: 40 }
      const item4 = { name: 'The Matrix Resurrections', uid: '4', seed: 0 }
      const item5 = { name: 'The Animatrix', uid: '5', seed: 80 }
      const items = [item1, item2, item3, item4, item5]
      const importedFlow = importItems({ flow, items })
      const operations = Object.values(importedFlow.operations)
      const differentFlow = createFlow({ uid: 'different' })
      const differentImportedFlow = importItems({ flow: differentFlow, items })
      const differentOperations = Object.values(differentImportedFlow.operations)
      const differentIds = operations.every((operation) => {
        const differentIds = differentOperations.every((duplicate) => {
          return operation.uid !== duplicate.uid
        })
        return differentIds
      })
      expect(differentIds).toBe(true)
    })

    it('should have different inputs with a different flow UID', () => {
      const flow = createFlow({ uid: 'test' })
      const item1 = { name: 'The Matrix', uid: '1', seed: 90 }
      const item2 = { name: 'The Matrix Reloaded', uid: 2, seed: 30 }
      const item3 = { name: 'The Matrix Revolutions', uid: '3', seed: 40 }
      const item4 = { name: 'The Matrix Resurrections', uid: '4', seed: 0 }
      const item5 = { name: 'The Animatrix', uid: '5', seed: 80 }
      const items = [item1, item2, item3, item4, item5]
      const importedFlow = importItems({ flow, items })
      const operations = Object.values(importedFlow.operations)
      const differentFlow = createFlow({ uid: 'different' })
      const differentImportedFlow = importItems({ flow: differentFlow, items })
      const differentOperations = Object.values(differentImportedFlow.operations)
      const different = operations.some((operation, index) => {
        const differentOperation = differentOperations[index]
        const differentA = differentOperation.aInput[0] !== operation.aInput[0]
        if (!differentA) {
          return false
        }
        const differentB = differentOperation.bInput[0] !== operation.bInput[0]
        return differentB
      })
      expect(different).toBe(true)
    })

    it('should different outputs with a different flow UID', () => {
      const flow = createFlow({ uid: 'test' })
      const item1 = { name: 'The Matrix', uid: '1', seed: 90 }
      const item2 = { name: 'The Matrix Reloaded', uid: 2, seed: 30 }
      const item3 = { name: 'The Matrix Revolutions', uid: '3', seed: 40 }
      const item4 = { name: 'The Matrix Resurrections', uid: '4', seed: 0 }
      const item5 = { name: 'The Animatrix', uid: '5', seed: 80 }
      const items = [item1, item2, item3, item4, item5]
      const importedFlow = importItems({ flow, items })
      const operations = Object.values(importedFlow.operations)
      const differentFlow = createFlow({ uid: 'different' })
      const differentImportedFlow = importItems({ flow: differentFlow, items })
      const differentOperations = Object.values(differentImportedFlow.operations)
      const different = operations.some((operation, index) => {
        const differentOperation = differentOperations[index]
        const differentOutput = differentOperation.output[0] !== operation.output[0]
        return differentOutput
      })
      expect(different).toBe(true)
    })

    it('should index operations by uid', () => {
      const flow = createFlow({ uid: 'test' })
      const item1 = { name: 'The Matrix', uid: '1', seed: 90 }
      const item2 = { name: 'The Matrix Reloaded', uid: 2, seed: 30 }
      const item3 = { name: 'The Matrix Revolutions', uid: '3', seed: 40 }
      const items = [item1, item2, item3]
      const importedFlow = importItems({ flow, items })
      const operations = Object.values(importedFlow.operations)
      const every = operations.every((operation) => {
        return importedFlow.operations[operation.uid] === operation
      })
      expect(every).toBe(true)
    })

    it('should give operations unique UIDs distinct from item UIDs', () => {
      const flow = createFlow({ uid: 'test' })
      const item1 = { name: 'The Matrix', uid: '1', seed: 90 }
      const item2 = { name: 'The Matrix Reloaded', uid: 2, seed: 30 }
      const item3 = { name: 'The Matrix Revolutions', uid: '3', seed: 40 }
      const item4 = { name: 'The Matrix Resurrections', uid: '4', seed: 0 }
      const items = [item1, item2, item3, item4]
      const importedFlow = importItems({ flow, items })
      const operations = Object.values(importedFlow.operations)
      const operationIds = operations.map((operation) => operation.uid)
      const itemIds = items.map((item) => item.uid)
      const everyOperationIdIsNotItemId = operationIds.every((id) => !itemIds.includes(id))
      expect(everyOperationIdIsNotItemId).toBe(true)
      const uniqueOperationIds = new Set(operationIds)
      expect(uniqueOperationIds.size).toBe(operationIds.length)
    })

    it('should include each item only once in the operations', () => {
      const flow = createFlow({ uid: 'test' })
      const item1 = { name: 'The Matrix', uid: '1', seed: 90 }
      const item2 = { name: 'The Matrix Reloaded', uid: 2, seed: 30 }
      const item3 = { name: 'The Matrix Revolutions', uid: '3', seed: 40 }
      const items = [item1, item2, item3]
      const importedFlow = importItems({ flow, items })
      const operations = Object.values(importedFlow.operations)
      const everyItemIsOnlyInOneOperation = items.every((item) => {
        const itemOperations = operations.filter((operation) => {
          if (operation.aInput.includes(item.uid)) {
            return true
          }
          if (operation.bInput.includes(item.uid)) {
            return true
          }
          if (operation.output.includes(item.uid)) {
            return true
          }
          return false
        })
        return itemOperations.length === 1
      })
      expect(everyItemIsOnlyInOneOperation).toBe(true)
    })

    it('should create as many input operations as possible, with at most one output operation', () => {
      const flow = createFlow({ uid: 'test' })
      const item1 = { name: 'The Matrix', uid: '1', seed: 90 }
      const item2 = { name: 'The Matrix Reloaded', uid: 2, seed: 30 }
      const item3 = { name: 'The Matrix Revolutions', uid: '3', seed: 40 }
      const item4 = { name: 'The Matrix Resurrections', uid: '4', seed: 0 }
      const item5 = { name: 'The Animatrix', uid: '5', seed: 80 }
      const items = [item1, item2, item3, item4, item5]
      const importedFlow = importItems({ flow, items })
      const operations = Object.values(importedFlow.operations)
      expect(operations.length).toBe(3)
      const inputOperations = operations.filter((operation) => {
        if (operation.output.length > 0) {
          return false
        }
        return operation.aInput.length > 0 || operation.bInput.length > 0
      })
      const outputOperations = operations.filter((operation) => {
        if (operation.aInput.length > 0 || operation.bInput.length > 0) {
          return false
        }
        return operation.output.length > 0
      })
      expect(inputOperations.length).toBe(2)
      expect(outputOperations.length).toBe(1)
    })

    it('should add an import episode to the history', () => {
      const flow = createFlow({ uid: 'test' })
      const item1 = { name: 'The Matrix', uid: '1', seed: 90 }
      const item2 = { name: 'The Matrix Reloaded', uid: 2, seed: 30 }
      const item3 = { name: 'The Matrix Revolutions', uid: '3', seed: 40 }
      const items = [item1, item2, item3]
      const importedFlow = importItems({ flow, items })
      const latestEpisode = importedFlow.history[0]
      expect(latestEpisode).toBeDefined()
      expect(latestEpisode.type).toBe('import')
      expect(latestEpisode.items).toBeDefined()
      expect(latestEpisode.items.length).toBe(3)
      expect(latestEpisode.items[0].uid).toBe(item1.uid)
      expect(latestEpisode.items[1].uid).toBe(item2.uid)
      expect(latestEpisode.items[2].uid).toBe(item3.uid)
    })

    describe('if only one item is imported', () => {
      it('should not include an operation with two new items in the inputs', () => {
        const flow = createFlow({ uid: 'test' })
        const items = [{ name: 'The Matrix', uid: '1', seed: 90 }]
        const importedFlow = importItems({ flow, items })
        const operation = getImportInputsOperation({ flow: importedFlow, items })
        expect(operation).toBeUndefined()
      })

      it('should create an output operation with the new item', () => {
        const flow = createFlow({ uid: 'test' })
        const items = [{ name: 'The Matrix', uid: '1', seed: 90 }]
        const importedFlow = importItems({ flow, items })
        const operations = Object.values(importedFlow.operations)
        const operation = operations.find((operation) => {
          if (operation.output.length !== 1) {
            return false
          }
          return operation.output[0] === items[0].uid
        })
        expect(operation).toBeDefined()
      })
    })

    describe('if at least two items are imported', () => {
      it('should include an operation with only two of the new items in the inputs', () => {
        const flow = createFlow({ uid: 'test' })
        const item1 = { name: 'The Matrix', uid: '1', seed: 90 }
        const item2 = { name: 'The Matrix Reloaded', uid: 2, seed: 30 }
        const importedFlow = importItems({ flow, items: [item1, item2] })
        const operation = getImportInputsOperation({ flow: importedFlow, items: [item1, item2] })
        expect(operation).toBeDefined()
      })
    })

    describe('if only two items are imported', () => {
      it('should create only one operation', () => {
        const flow = createFlow({ uid: 'test' })
        const items = [
          { name: 'The Matrix', uid: '1', seed: 90 },
          { name: 'The Matrix Reloaded', uid: 2, seed: 30 }
        ]
        const importedFlow = importItems({ flow, items })
        const operations = Object.values(importedFlow.operations)
        expect(operations.length).toBe(1)
      })

      it('should create an input operation with the two new items', () => {
        const flow = createFlow({ uid: 'test' })
        const items = [
          { name: 'The Matrix', uid: '1', seed: 90 },
          { name: 'The Matrix Reloaded', uid: 2, seed: 30 }
        ]
        const importedFlow = importItems({ flow, items })
        const operation = getImportInputsOperation({ flow: importedFlow, items })
        expect(operation).toBeDefined()
      })
    })

    describe('if an even number of items are imported', () => {
      it('should not include an operation no inputs and a new item in the output', () => {
        const flow = createFlow({ uid: 'test' })
        const item1 = { name: 'The Matrix', uid: '1', seed: 90 }
        const item2 = { name: 'The Matrix Reloaded', uid: 2, seed: 30 }
        const itemIds = [item1.uid, item2.uid]
        const importedFlow = importItems({ flow, items: [item1, item2] })
        const operations = Object.values(importedFlow.operations)
        const some = operations.some((operation) => {
          const newOutput = itemIds.includes(operation.output[0])
          return newOutput
        })
        expect(some).toBe(false)
      })

      it('should create half as many operations as there are items', () => {
        const flow = createFlow({ uid: 'test' })
        const item1 = { name: 'The Matrix', uid: '1', seed: 90 }
        const item2 = { name: 'The Matrix Reloaded', uid: 2, seed: 30 }
        const item3 = { name: 'The Matrix Revolutions', uid: '3', seed: 40 }
        const item4 = { name: 'The Matrix Resurrections', uid: '4', seed: 0 }
        const importedFlow = importItems({ flow, items: [item1, item2, item3, item4] })
        const operations = Object.values(importedFlow.operations)
        expect(operations.length).toBe(2)
      })
    })

    describe('if an odd number of items are imported', () => {
      it('should include an operation no inputs and only one of the new items in the output', () => {
        const flow = createFlow({ uid: 'test' })
        const item1 = { name: 'The Matrix', uid: '1', seed: 90 }
        const item2 = { name: 'The Matrix Reloaded', uid: 2, seed: 30 }
        const item3 = { name: 'The Matrix Revolutions', uid: '3', seed: 40 }
        const item4 = { name: 'The Matrix Resurrections', uid: '4', seed: 0 }
        const item5 = { name: 'The Animatrix', uid: '5', seed: 80 }
        const items = [item1, item2, item3, item4, item5]
        const itemIds = items.map((item) => item.uid)
        const importedFlow = importItems({ flow, items })
        const operations = Object.values(importedFlow.operations)
        const some = operations.some((operation) => {
          const single = operation.output.length === 1
          if (!single) {
            return false
          }
          const newOutput = itemIds.includes(operation.output[0])
          return newOutput
        })
        expect(some).toBe(true)
      })
    })
  })
})
