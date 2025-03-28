import { addOperation, combineOperations, createFlow, createOperation } from '../../src'
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

  describe('if there are two output operations', () => {
    it('should combine them into one input operation', () => {
      const flow = createFlow({ uid: 'test' })
      const flow1 = insertOperation({
        flow,
        aInput: [],
        bInput: [],
        output: ['item1', 'item2']
      })
      const flow2 = insertOperation({
        flow: flow1,
        aInput: [],
        bInput: [],
        output: ['item3']
      })
      const flow3 = combineOperations({ flow: flow2 })
      const flow3Operations = Object.values(flow3.operations)
      expect(flow3Operations.length).toBe(1)
    })

    it('should put the operation with the earlier UID in the aInput and the other in the bInput', () => {
      const flow = createFlow({ uid: 'test' })
      const operation1 = createOperation({
        aInput: [],
        bInput: [],
        flow,
        output: ['item1', 'item2']
      })
      const addedFlow1 = addOperation({ flow, operation: operation1 })
      const operation2 = createOperation({
        aInput: [],
        bInput: [],
        flow: addedFlow1,
        output: ['item3']
      })
      const addedFlow2 = addOperation({ flow: addedFlow1, operation: operation2 })
      const oneEarlier = operation1.uid < operation2.uid
      const flow3 = combineOperations({ flow: addedFlow2 })
      const flow3Operations = Object.values(flow3.operations)
      expect(flow3Operations.length).toBe(1)
      if (oneEarlier) {
        expect(flow3Operations[0].aInput).toEqual(['item1', 'item2'])
        expect(flow3Operations[0].bInput).toEqual(['item3'])
      } else {
        expect(flow3Operations[0].aInput).toEqual(['item3'])
        expect(flow3Operations[0].bInput).toEqual(['item1', 'item2'])
      }
    })
  })
})
