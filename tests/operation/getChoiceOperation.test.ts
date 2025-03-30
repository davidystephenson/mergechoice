import { addOperation, createFlow, createOperation, getChoiceOperation, getOperationDistance, isFlowComplete } from '../../src'
import insertOperation from '../operation/insertOperation'

describe('getChoiceOperation', () => {
  it('should throw an error if the flow has no operations', () => {
    const flow = createFlow({ uid: 'test' })
    const operations = Object.values(flow.operations)
    expect(operations.length).toBe(0)
    expect(() => getChoiceOperation({ flow })).toThrow()
  })

  it('should throw an error if the flow is complete', () => {
    const flow = createFlow({ uid: 'test' })
    const insertedFlow = insertOperation({
      flow,
      aInput: [],
      bInput: [],
      output: ['a', 'b']
    })
    const completed = isFlowComplete({ flow: insertedFlow })
    expect(completed).toBe(true)
    expect(() => getChoiceOperation({ flow: insertedFlow })).toThrow()
  })

  it('should return an operation from the flow', () => {
    const flow = createFlow({ uid: 'test' })
    const operation = createOperation({
      aInput: ['a', 'b'],
      bInput: ['c', 'd'],
      flow,
      output: ['e']
    })
    const addedFlow = addOperation({ flow, operation })
    const completed = isFlowComplete({ flow: addedFlow })
    expect(completed).toBe(false)
    const choiceOperation = getChoiceOperation({ flow: addedFlow })
    expect(choiceOperation).toBe(operation)
  })

  it('should return the operation with the longest distance', () => {
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
    const operation3 = createOperation({
      aInput: ['n', 'o', 'p', 'q', 'r', 's'],
      bInput: ['t', 'u', 'v', 'w', 'x', 'y'],
      flow: addedFlow2,
      output: ['z']
    })
    operation3.better = 5
    const distance3 = getOperationDistance({ operation: operation3 })
    expect(distance3).toBe(7)
    const addedFlow3 = addOperation({ flow: addedFlow2, operation: operation3 })
    const choiceOperation = getChoiceOperation({ flow: addedFlow3 })
    expect(choiceOperation).toBe(operation2)
  })

  it('should return the tied operation with the earlier UID if there is a tie for longest distance', () => {
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
    const choiceOperation = getChoiceOperation({ flow: addedFlow3 })
    expect(choiceOperation).toBe(operation3)
  })
})
