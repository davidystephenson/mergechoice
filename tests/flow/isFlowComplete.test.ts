import { createFlow, isFlowComplete, addOperation, createOperation } from '../../src/index'

describe('isFlowComplete', () => {
  it('should consider flows with no items complete ', () => {
    const flow = createFlow({ uid: 'test' })
    const complete = isFlowComplete({ flow })
    expect(complete).toBe(true)
  })

  it('should return false if there are multiple operations', () => {
    const flow = createFlow({ uid: 'test' })

    const operation1 = createOperation({
      aInput: ['item1'],
      bInput: ['item2'],
      flow,
      output: []
    })
    const addedFlow1 = addOperation({
      flow,
      operation: operation1
    })

    const operation2 = createOperation({
      aInput: [],
      bInput: [],
      flow: addedFlow1,
      output: ['item3']
    })
    const addedFlow2 = addOperation({
      flow: addedFlow1,
      operation: operation2
    })

    const complete = isFlowComplete({ flow: addedFlow2 })
    expect(complete).toBe(false)
  })

  it('should return false if there are no output operations', () => {
    const flow = createFlow({ uid: 'test' })

    const operation = createOperation({
      aInput: ['item1'],
      bInput: ['item2'],
      flow,
      output: []
    })
    const addedFlow = addOperation({
      flow,
      operation
    })

    const complete = isFlowComplete({ flow: addedFlow })
    expect(complete).toBe(false)
  })

  it('should return true if there is only one operation and it is an output operation', () => {
    const flow = createFlow({ uid: 'test' })

    const operation = createOperation({
      aInput: [],
      bInput: [],
      flow,
      output: ['item1']
    })
    const addedFlow = addOperation({
      flow,
      operation
    })

    const complete = isFlowComplete({ flow: addedFlow })
    expect(complete).toBe(true)
  })
})
