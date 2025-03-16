import { createFlow, isFlowComplete, addOperation, createOperation } from '../../src/index'

describe('isFlowComplete', () => {
  it('should consider flows with no items complete ', () => {
    const flow = createFlow({ uid: 'test' })
    const complete = isFlowComplete(flow)
    expect(complete).toBe(true)
  })

  it('should throw an error if any operations have only one of the inputs', () => {
    const flow = createFlow({ uid: 'test' })
    const operation = createOperation({
      flow,
      a: ['item1']
    })
    const addedFlow = addOperation({ flow, operation })
    expect(() => isFlowComplete(addedFlow)).toThrow('Operation has only one of the inputs')
  })

  it('should throw an error if any operation has no inputs or outputs', () => {
    const flow = createFlow({ uid: 'test' })
    const operation = createOperation({ flow })
    const addedFlow = addOperation({ flow, operation })
    expect(() => isFlowComplete(addedFlow)).toThrow('Operation has no inputs or outputs')
  })

  it('should return false if there are multiple operations', () => {
    const flow = createFlow({ uid: 'test' })

    const operation1 = createOperation({
      flow,
      a: ['item1'],
      b: ['item2']
    })
    const addedFlow1 = addOperation({
      flow,
      operation: operation1
    })

    const operation2 = createOperation({
      flow: addedFlow1,
      output: ['item3']
    })
    const addedFlow2 = addOperation({
      flow: addedFlow1,
      operation: operation2
    })

    const complete = isFlowComplete(addedFlow2)
    expect(complete).toBe(false)
  })

  it('should return false if there are no output operations', () => {
    const flow = createFlow({ uid: 'test' })

    const operation = createOperation({
      flow,
      a: ['item1'],
      b: ['item2']
    })
    const addedFlow = addOperation({
      flow,
      operation
    })

    const complete = isFlowComplete(addedFlow)
    expect(complete).toBe(false)
  })

  it('should return true if there is only one operation and it is an output operation', () => {
    const flow = createFlow({ uid: 'test' })

    const operation = createOperation({
      flow,
      output: ['item1']
    })
    const addedFlow = addOperation({
      flow,
      operation
    })

    const complete = isFlowComplete(addedFlow)
    expect(complete).toBe(true)
  })
})
