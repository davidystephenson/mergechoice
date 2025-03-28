import { createFlow, getChoice, importItems } from '../../src'

describe('getChoice', () => {
  describe('if the flow has no items', () => {
    it('should return undefined', () => {
      const flow = createFlow({ uid: 'test' })
      const choice = getChoice({ flow })
      expect(choice).toBeUndefined()
    })
  })

  describe('if an empty flow imports at least two new items', () => {
    it('should return a choice', () => {
      const flow = createFlow({ uid: 'test' })
      const items = [
        { name: 'item1', uid: '1', seed: 0 },
        { name: 'item2', uid: '2', seed: 0 }
      ]
      const importedFlow = importItems({ flow, items })
      const choice = getChoice({ flow: importedFlow })
      expect(choice).toBeDefined()
    })

    it('should return a choice whose a and b are new item UIDs', () => {
      const flow = createFlow({ uid: 'test' })
      const items = [
        { name: 'item1', uid: '1', seed: 0 },
        { name: 'item2', uid: '2', seed: 0 }
      ]
      const importedFlow = importItems({ flow, items })
      const choice = getChoice({ flow: importedFlow })
      if (choice == null) {
        throw new Error('Choice should be defined')
      }
      const itemUids = [choice.aItemUid, choice.bItemUid]
      expect(itemUids).toContain(choice.aItemUid)
      expect(itemUids).toContain(choice.bItemUid)
    })

    it('should return the ID of an operation whose aInput contains the aItem and bInput contains the bItem', () => {
      const flow = createFlow({ uid: 'test' })
      const items = [
        { name: 'item1', uid: '1', seed: 0 },
        { name: 'item2', uid: '2', seed: 0 }
      ]
      const importedFlow = importItems({ flow, items })
      const choice = getChoice({ flow: importedFlow })
      if (choice == null) {
        throw new Error('Choice should be defined')
      }
      const operation = importedFlow.operations[choice.operationUid]
      expect(operation.aInput).toContain(choice.aItemUid)
      expect(operation.bInput).toContain(choice.bItemUid)
    })

    describe('if there are three new items', () => {
      it('should return the operation with the single longest input', () => {
        const flow = createFlow({ uid: 'test' })
        const items = [
          { name: 'item1', uid: '1', seed: 0 },
          { name: 'item2', uid: '2', seed: 0 },
          { name: 'item3', uid: '3', seed: 0 }
        ]
        const importedFlow = importItems({ flow, items })
        const choice = getChoice({ flow: importedFlow })
        if (choice == null) {
          throw new Error('Choice should be defined')
        }
        const operations = Object.values(importedFlow.operations)

        const longestOperation = operations.reduce((max, operation) => {
          return operation.aInput.length + operation.bInput.length > max.aInput.length + max.bInput.length ? operation : max
        }, operations[0])

        const longestOperations = operations.filter(operation => {
          return operation.aInput.length + operation.bInput.length === longestOperation.aInput.length + longestOperation.bInput.length
        })
        expect(longestOperations.length).toBe(1)
        expect(longestOperations[0].uid).toBe(longestOperation.uid)
      })
    })

    describe('if there are five new items', () => {
      it('should return a choice from the operation with the highest uid among the tied longest input operations', () => {
        const flow = createFlow({ uid: 'test' })
        const items = [
          { name: 'item1', uid: '1', seed: 0 },
          { name: 'item2', uid: '2', seed: 0 },
          { name: 'item3', uid: '3', seed: 0 },
          { name: 'item4', uid: '4', seed: 0 },
          { name: 'item5', uid: '5', seed: 0 }
        ]
        const importedFlow = importItems({ flow, items })
        const choice = getChoice({ flow: importedFlow })
        if (choice == null) {
          throw new Error('Choice should be defined')
        }
        const operations = Object.values(importedFlow.operations)
        const longestOperation = operations.reduce((max, operation) => {
          return operation.aInput.length + operation.bInput.length > max.aInput.length + max.bInput.length ? operation : max
        }, operations[0])
        const longestOperations = operations.filter(operation => {
          return operation.aInput.length + operation.bInput.length === longestOperation.aInput.length + longestOperation.bInput.length
        })
        expect(longestOperations.length).toBeGreaterThan(1)
        const operationWithHighestUid = longestOperations.reduce((max, operation) => {
          return operation.uid > max.uid ? operation : max
        }, longestOperations[0])
        expect(operationWithHighestUid.uid).toBe(choice.operationUid)
      })
    })
  })
})
