import { addOperation, createFlow, createOperation, getChoiceOperation, getOptionIndex, isFlowComplete } from '../../src'
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
      queue: [],
      catalog: [],
      output: ['a', 'b']
    })
    const completed = isFlowComplete({ flow: insertedFlow })
    expect(completed).toBe(true)
    expect(() => getChoiceOperation({ flow: insertedFlow })).toThrow()
  })

  it('should return an operation from the flow', () => {
    const flow = createFlow({ uid: 'test' })
    const operation = createOperation({
      queue: ['a', 'b'],
      catalog: ['c', 'd'],
      flow,
      output: ['e']
    })
    const addedFlow = addOperation({ flow, operation })
    const completed = isFlowComplete({ flow: addedFlow })
    expect(completed).toBe(false)
    const choiceOperation = getChoiceOperation({ flow: addedFlow })
    expect(choiceOperation).toBe(operation)
  })

  it('should return the operation with the highest option index', () => {
    const flow = createFlow({ uid: 'test' })
    const operation1 = createOperation({
      queue: ['a', 'b'],
      catalog: ['c', 'd'],
      flow,
      output: ['e']
    })
    const optionIndex1 = getOptionIndex({ operation: operation1 })
    expect(optionIndex1).toBe(0)
    const addedFlow1 = addOperation({ flow, operation: operation1 })
    const operation2 = createOperation({
      queue: ['f', 'g'],
      catalog: ['h', 'i', 'j', 'k', 'l'],
      flow: addedFlow1,
      output: []
    })
    const optionIndex2 = getOptionIndex({ operation: operation2 })
    expect(optionIndex2).toBe(2)
    const addedFlow2 = addOperation({ flow: addedFlow1, operation: operation2 })
    const operation3 = createOperation({
      queue: ['n', 'o', 'p', 'q', 'r', 's'],
      catalog: ['t', 'u', 'v', 'w', 'x', 'y'],
      flow: addedFlow2,
      output: ['z']
    })
    operation3.better = 2
    const optionIndex3 = getOptionIndex({ operation: operation3 })
    expect(optionIndex3).toBe(1)
    const addedFlow3 = addOperation({ flow: addedFlow2, operation: operation3 })
    const choiceOperation = getChoiceOperation({ flow: addedFlow3 })
    expect(choiceOperation).toBe(operation2)
  })

  it('should return the tied operation with the earlier UID if there is a tie for longest distance', () => {
    const flow = createFlow({ uid: 'test' })
    const operation1 = createOperation({
      queue: ['a', 'b'],
      catalog: ['c', 'd'],
      flow,
      output: ['e']
    })
    operation1.uid = 'a'
    const optionIndex1 = getOptionIndex({ operation: operation1 })
    expect(optionIndex1).toBe(0)
    const addedFlow1 = addOperation({ flow, operation: operation1 })
    const operation2 = createOperation({
      queue: ['f', 'g'],
      catalog: ['h', 'i', 'j', 'k', 'l', 'm'],
      flow: addedFlow1,
      output: []
    })
    operation2.uid = 'b'
    const optionIndex2 = getOptionIndex({ operation: operation2 })
    expect(optionIndex2).toBe(2)
    const addedFlow2 = addOperation({ flow: addedFlow1, operation: operation2 })
    const operation3 = createOperation({
      queue: ['n', 'o', 'p', 'q', 'r', 's'],
      catalog: ['t', 'u', 'v', 'w', 'x', 'y'],
      flow: addedFlow2,
      output: ['z']
    })
    operation3.uid = 'c'
    const optionIndex3 = getOptionIndex({ operation: operation3 })
    expect(optionIndex3).toBe(2)
    const addedFlow3 = addOperation({ flow: addedFlow2, operation: operation3 })
    const choiceOperation = getChoiceOperation({ flow: addedFlow3 })
    expect(choiceOperation).toBe(operation2)
  })
})
