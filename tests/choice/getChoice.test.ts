import { addOperation, createFlow, createOperation, getChoice, getOperationDistance, importItems, isFlowComplete } from '../../src'
import insertOperation from '../operation/insertOperation'
import getVerifiedChoice from './getVerifiedChoice'

describe('getChoice', () => {
  it('should return undefined if the flow has no items', () => {
    const flow = createFlow({ uid: 'test' })
    const items = Object.values(flow.items)
    expect(items.length).toBe(0)
    const choice = getChoice({ flow })
    expect(choice).toBeUndefined()
  })

  it('should return undefined if the flow is complete', () => {
    const flow = createFlow({ uid: 'test' })
    const insertedFlow = insertOperation({
      aInput: [],
      bInput: [],
      flow,
      output: ['a']
    })
    const completed = isFlowComplete({ flow: insertedFlow })
    expect(completed).toBe(true)
    const choice = getChoice({ flow: insertedFlow })
    expect(choice).toBeUndefined()
  })

  it('should select from the operation with the highest distance', () => {
    const flow = createFlow({ uid: 'test' })
    const operation1 = createOperation({
      aInput: ['a', 'b'],
      bInput: ['c', 'd'],
      flow,
      output: ['e']
    })
    const distance1 = getOperationDistance({ operation: operation1 })
    expect(distance1).toBe(4)
    const addedFlow1 = addOperation({ flow, operation: operation1 })
    const operation2 = createOperation({
      aInput: ['f', 'g'],
      bInput: ['h', 'i', 'j', 'k', 'l', 'm'],
      flow: addedFlow1,
      output: []
    })
    const distance2 = getOperationDistance({ operation: operation2 })
    expect(distance2).toBe(8)
    const addedFlow2 = addOperation({ flow: addedFlow1, operation: operation2 })
    const choice = getVerifiedChoice({ flow: addedFlow2 })
    expect(choice.operationUid).toBe(operation2.uid)
  })

  it('should select the first a and the b at the better index', () => {
    const flow = createFlow({ uid: 'test' })
    const operation1 = createOperation({
      aInput: ['a', 'b'],
      bInput: ['c', 'd'],
      flow,
      output: ['e']
    })
    operation1.uid = 'a'
    const distance1 = getOperationDistance({ operation: operation1 })
    expect(distance1).toBe(4)
    const addedFlow1 = addOperation({ flow, operation: operation1 })
    const operation2 = createOperation({
      aInput: ['f', 'g'],
      bInput: ['h', 'i', 'j', 'k', 'l', 'm'],
      flow: addedFlow1,
      output: []
    })
    operation2.uid = 'c'
    const distance2 = getOperationDistance({ operation: operation2 })
    expect(distance2).toBe(8)
    const addedFlow2 = addOperation({ flow: addedFlow1, operation: operation2 })
    const operation3 = createOperation({
      aInput: ['n', 'o', 'p', 'q', 'r', 's'],
      bInput: ['t', 'u', 'v', 'w', 'x', 'y'],
      flow: addedFlow2,
      output: ['z']
    })
    operation3.uid = 'b'
    operation3.better = 4
    const distance3 = getOperationDistance({ operation: operation3 })
    expect(distance3).toBe(8)
    const addedFlow3 = addOperation({ flow: addedFlow2, operation: operation3 })
    const choice = getVerifiedChoice({ flow: addedFlow3 })
    expect(choice.aItemUid).toBe('n')
    expect(choice.bItemUid).toBe('x')
  })

  describe('if there is one operation with two a and one b and better 0', () => {
    it('should return a choice between the first a and the b', () => {
      const flow = createFlow({ uid: 'test' })
      flow.items = {
        a: { name: 'a', uid: 'a', seed: 0 },
        b: { name: 'b', uid: 'b', seed: 0 },
        c: { name: 'c', uid: 'c', seed: 0 }
      }
      const operation = createOperation({
        aInput: ['a', 'b'],
        bInput: ['c'],
        flow,
        output: []
      })
      expect(operation.better).toBe(0)
      const addedFlow = addOperation({ flow, operation })
      const choice = getVerifiedChoice({ flow: addedFlow })
      expect(choice.aItemUid).toBe('a')
      expect(choice.bItemUid).toBe('c')
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
      it('should return the operation with the single longest distance', () => {
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
          const previousDistance = getOperationDistance({ operation: max })
          const currentDistance = getOperationDistance({ operation })
          if (currentDistance > previousDistance) {
            return operation
          }
          return max
        }, operations[0])
        const longestDistance = getOperationDistance({ operation: longestOperation })
        const longestOperations = operations.filter(operation => {
          const distance = getOperationDistance({ operation })
          return distance === longestDistance
        })
        expect(longestOperations.length).toBe(1)
        expect(choice.operationUid).toBe(longestOperations[0].uid)
      })
    })

    describe('if there are five new items', () => {
      it('should return a choice from the operation with the earliest uid among the tied operations', () => {
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
        const longestOperation = operations.reduce((longestOperation, operation) => {
          const previousDistance = getOperationDistance({ operation: longestOperation })
          const currentDistance = getOperationDistance({ operation })
          if (currentDistance > previousDistance) {
            return operation
          }
          return longestOperation
        }, operations[0])
        const longestDistance = getOperationDistance({ operation: longestOperation })
        const longestOperations = operations.filter(operation => {
          const distance = getOperationDistance({ operation })
          return distance === longestDistance
        })
        expect(longestOperations.length).toBeGreaterThan(1)
        const operationWithEarliestUid = longestOperations.reduce((earliestOperation, operation) => {
          if (operation.uid < earliestOperation.uid) {
            return operation
          }
          return earliestOperation
        }, longestOperations[0])
        expect(operationWithEarliestUid.uid).toBe(choice.operationUid)
      })
    })
  })
})
