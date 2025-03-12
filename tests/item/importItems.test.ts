import { createFlow, importItems } from '../../src/index'
import verifyItemInOperations from './verifyItemInOperations'

describe('importItems', () => {
  const flow = createFlow({ seed: 'test' })
  const item1 = { name: 'The Matrix', uuid: '1', seed: 90 }
  const item2 = { name: 'The Matrix Reloaded', uuid: 2, seed: 30 }
  const item3 = { name: 'The Matrix Revolutions', uuid: '3', seed: 40 }
  const itemIds = [item1.uuid, item2.uuid, item3.uuid]
  const threeItems = [item1, item2, item3]
  const twoItems = threeItems.slice(0, 2)

  const flowWithThreeItems = importItems({ flow, items: threeItems })
  const flowWithTwoItems = importItems({ flow, items: twoItems })

  it('should throw an error if the items are empty', () => {
    expect(() => importItems({ flow, items: [] })).toThrow()
  })

  it('throws an error if the item UUIDs are not unique', () => {
    expect(() => importItems({ flow, items: [item1, item1] })).toThrow()
  })

  describe('should return a flow with the items', () => {
    it('should include the items indexed by uuid', () => {
      expect(flowWithThreeItems.items).toBeDefined()
      if (flowWithThreeItems.items == null) {
        throw new Error('Items should be defined')
      }
      expect(typeof flowWithThreeItems.items).toBe('object')
      expect(flowWithThreeItems.items[item1.uuid]).toEqual(item1)
      expect(flowWithThreeItems.items[item2.uuid]).toEqual(item2)
      expect(flowWithThreeItems.items[item3.uuid]).toEqual(item3)
    })

    it('should include the items in operations', () => {
      expect(flowWithThreeItems.operations).toBeDefined()
      if (flowWithThreeItems.operations == null) {
        throw new Error('operations should be defined')
      }

      verifyItemInOperations({ flow: flowWithThreeItems, item: item1 })
      verifyItemInOperations({ flow: flowWithThreeItems, item: item2 })
      verifyItemInOperations({ flow: flowWithThreeItems, item: item3 })
    })

    it('should add an import episode to the history', () => {
      expect(flowWithThreeItems.history).toBeDefined()
      if (flowWithThreeItems.history == null) {
        throw new Error('History should be defined')
      }
      const latestEpisode = flowWithThreeItems.history[0]
      expect(latestEpisode).toBeDefined()
      expect(latestEpisode.type).toBe('import')
      expect(latestEpisode.items).toBeDefined()
      expect(latestEpisode.items.length).toBe(3)
      expect(latestEpisode.items[0].uuid).toBe(item1.uuid)
      expect(latestEpisode.items[1].uuid).toBe(item2.uuid)
      expect(latestEpisode.items[2].uuid).toBe(item3.uuid)
    })

    describe('if at least two items are imported', () => {
      it('should include an operation with only two of the new items in the inputs', () => {
        expect(flowWithTwoItems.operations).toBeDefined()
        if (flowWithTwoItems.operations == null) {
          throw new Error('Operations should be defined')
        }
        const operations = Object.values(flowWithTwoItems.operations)
        const some = operations.some((operation) => {
          const aSingle = operation.a.length === 1
          if (!aSingle) {
            return false
          }
          const bSingle = operation.b.length === 1
          if (!bSingle) {
            return false
          }
          const inA = itemIds.includes(operation.a[0])
          if (inA) {
            const others = itemIds.filter((id) => id !== operation.a[0])
            const inB = others.includes(operation.b[0])
            return inB
          }
          const inB = itemIds.includes(operation.b[0])
          if (inB) {
            const others = itemIds.filter((id) => id !== operation.b[0])
            const inA = others.includes(operation.a[0])
            return inA
          }
          return false
        })
        expect(some).toBe(true)
      })
    })

    describe('if at least three items are imported', () => {
      it('should include a choice', () => {
        expect(flowWithThreeItems.choice).toBeDefined()
      })

      it('should present two different items in the choice', () => {
        expect(flowWithThreeItems.choice).toBeDefined()
        if (flowWithThreeItems.choice == null) {
          throw new Error('Choice should be defined')
        }
        expect(typeof flowWithThreeItems.choice).toBe('object')
        expect(flowWithThreeItems.choice).toHaveProperty('a')
        expect(flowWithThreeItems.choice).toHaveProperty('b')
        expect(flowWithThreeItems.choice.a).not.toEqual(flowWithThreeItems.choice.b)
      })

      it('should include an operation with only one of the new items in the output', () => {
        expect(flowWithThreeItems.operations).toBeDefined()
        if (flowWithThreeItems.operations == null) {
          throw new Error('Operations should be defined')
        }
        const operations = Object.values(flowWithThreeItems.operations)
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

    describe('if there are less than three items', () => {
      it('should not include a choice', () => {
        expect(flowWithTwoItems.choice).toBeUndefined()
      })

      it('should not include an operation with a new item in the output', () => {
        expect(flowWithTwoItems.operations).toBeDefined()
        if (flowWithTwoItems.operations == null) {
          throw new Error('Operations should be defined')
        }
        const operations = Object.values(flowWithTwoItems.operations)
        const some = operations.some((operation) => {
          const newOutput = itemIds.includes(operation.output[0])
          return newOutput
        })
        expect(some).toBe(false)
      })
    })
  })
})
