import { combineOperations, createFlow } from '../../src'
import insertOperation from './insertOperation'

describe('combineOperations', () => {
  it('should throw an error if the flow has more than two output operations', () => {
    const flow = createFlow({ uid: 'test' })
    const flow1 = insertOperation({
      flow,
      aInput: [],
      bInput: [],
      output: ['item3']
    })
    const flow2 = insertOperation({
      flow: flow1,
      aInput: [],
      bInput: [],
      output: ['item4']
    })
    const flow3 = insertOperation({
      flow: flow2,
      aInput: [],
      bInput: [],
      output: ['item5']
    })
    expect(() => combineOperations({ flow: flow3 })).toThrow()
  })

  it('should combine two output operations into one input operation', () => {
    const flow = createFlow({ uid: 'test' })
    const flow1 = insertOperation({
      flow,
      aInput: [],
      bInput: [],
      output: ['item1']
    })
    const flow2 = insertOperation({
      flow: flow1,
      aInput: [],
      bInput: [],
      output: ['item2']
    })
    const flow2Operations = Object.values(flow2.operations)
    expect(flow2Operations.length).toBe(2)
    const flow3 = combineOperations({ flow: flow2 })
    const flow3Operations = Object.values(flow3.operations)
    expect(flow3Operations.length).toBe(1)
    expect(flow3Operations[0].aInput.length).toBe(1)
    expect(flow3Operations[0].bInput.length).toBe(1)
    expect(flow3Operations[0].output.length).toBe(0)
  })

  it('should do nothing if there is only one output operation', () => {
    const flow = createFlow({ uid: 'test' })
    const flow1 = insertOperation({
      flow,
      aInput: [],
      bInput: [],
      output: ['item1']
    })
    const flow2 = combineOperations({ flow: flow1 })
    expect(flow2).toEqual(flow1)
  })

  it('should do nothing if there are no output operations', () => {
    const flow = createFlow({ uid: 'test' })
    const flow1 = insertOperation({
      flow,
      aInput: ['item1'],
      bInput: ['item2'],
      output: []
    })
    const flow2 = combineOperations({ flow: flow1 })
    expect(flow2).toEqual(flow1)
  })
})
