import { addOperation, combineOperations, createFlow, createOperation } from '../../src'
import insertOperation from './insertOperation'

describe('combineOperations', () => {
  it('should throw an error if the flow has more than two output operations', () => {
    const flow = createFlow({ uid: 'test' })
    const flow1 = insertOperation({
      flow,
      queue: [],
      catalog: [],
      output: ['item3']
    })
    const flow2 = insertOperation({
      flow: flow1,
      queue: [],
      catalog: [],
      output: ['item4']
    })
    const flow3 = insertOperation({
      flow: flow2,
      queue: [],
      catalog: [],
      output: ['item5']
    })
    expect(() => combineOperations({ flow: flow3 })).toThrow()
  })

  it('should do nothing if there is only one output operation', () => {
    const flow = createFlow({ uid: 'test' })
    const flow1 = insertOperation({
      flow,
      queue: [],
      catalog: [],
      output: ['item1']
    })
    const flow2 = combineOperations({ flow: flow1 })
    expect(flow2).toEqual(flow1)
  })

  it('should do nothing if there are no output operations', () => {
    const flow = createFlow({ uid: 'test' })
    const flow1 = insertOperation({
      flow,
      queue: ['item1'],
      catalog: ['item2'],
      output: []
    })
    const flow2 = combineOperations({ flow: flow1 })
    expect(flow2).toEqual(flow1)
  })

  describe('if there are two output operations', () => {
    it('should combine them into one input operation', () => {
      const flow = createFlow({ uid: 'test' })
      const flow1 = insertOperation({
        flow,
        queue: [],
        catalog: [],
        output: ['item1', 'item2']
      })
      const flow2 = insertOperation({
        flow: flow1,
        queue: [],
        catalog: [],
        output: ['item3']
      })
      const flow3 = combineOperations({ flow: flow2 })
      const flow3Operations = Object.values(flow3.operations)
      expect(flow3Operations.length).toBe(1)
    })

    it('should put the operation with the earlier UID in the aInput and the other in the bInput', () => {
      const flow = createFlow({ uid: 'test' })
      const operation1 = createOperation({
        queue: [],
        catalog: [],
        flow,
        output: ['item1', 'item2']
      })
      const addedFlow1 = addOperation({ flow, operation: operation1 })
      const operation2 = createOperation({
        queue: [],
        catalog: [],
        flow: addedFlow1,
        output: ['item3']
      })
      const addedFlow2 = addOperation({ flow: addedFlow1, operation: operation2 })
      const oneEarlier = operation1.uid < operation2.uid
      const flow3 = combineOperations({ flow: addedFlow2 })
      const flow3Operations = Object.values(flow3.operations)
      expect(flow3Operations.length).toBe(1)
      if (oneEarlier) {
        expect(flow3Operations[0].queue).toEqual(['item1', 'item2'])
        expect(flow3Operations[0].catalog).toEqual(['item3'])
      } else {
        expect(flow3Operations[0].queue).toEqual(['item3'])
        expect(flow3Operations[0].catalog).toEqual(['item1', 'item2'])
      }
    })

    it('should not change the count', () => {
      const flow = createFlow({ uid: 'test' })
      const flow1 = insertOperation({
        queue: [],
        catalog: [],
        flow,
        output: ['item1', 'item2']
      })
      const flow2 = insertOperation({
        queue: [],
        catalog: [],
        flow: flow1,
        output: ['item3']
      })
      const flow3 = combineOperations({ flow: flow2 })
      expect(flow3.count).toBe(flow2.count)
    })
  })
})
