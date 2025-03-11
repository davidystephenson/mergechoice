import { createFlow, importItems } from '../src/index'
import { Flow } from '../src/flowTypes'

describe('importItems', () => {
  const flow = createFlow({ seed: 'test' })
  const threeItems = [
    { name: 'The Matrix', uuid: '1', seed: 90 },
    { name: 'The Matrix Reloaded', uuid: 2, seed: 30 },
    { name: 'The Matrix Revolutions', uuid: '3', seed: 40 }
  ]
  const twoItems = threeItems.slice(0, 2)

  const flowWithThreeItems = importItems({ flow, items: threeItems })
  const flowWithTwoItems = importItems({ flow, items: twoItems })

  describe('should return a flow with the items', () => {
    it('should include the provided items', () => {
      expect(flowWithThreeItems.items).toEqual(threeItems)
      expect(flowWithTwoItems.items).toEqual(twoItems)
    })

    describe('should include a choice if there are three or more items', () => {
      it('should have a defined choice property', () => {
        expect(flowWithThreeItems.choice).toBeDefined()
      })

      it('should present two items in the choice', () => {
        expect(typeof flowWithThreeItems.choice).toBe('object')
        expect(flowWithThreeItems.choice).toHaveProperty('a')
        expect(flowWithThreeItems.choice).toHaveProperty('b')
      })

      it('should predictably randomize items based on the flow seed', () => {
        const seed1 = 'seed1'
        const seed2 = 'seed2'

        const flowWithSeed1 = createFlow({ seed: seed1 })
        const flowWithSeed2 = createFlow({ seed: seed2 })

        const result1First = importItems({ flow: flowWithSeed1, items: threeItems })
        const result1Second = importItems({ flow: flowWithSeed1, items: threeItems })
        const result2 = importItems({ flow: flowWithSeed2, items: threeItems })

        expect(result1First.choice).toEqual(result1Second.choice)
        expect(result1First.choice).not.toEqual(result2.choice)
      })

      it('should use a default seed if flow seed is not provided', () => {
        const flowWithoutSeed: Flow = { items: [] }
        const result1 = importItems({ flow: flowWithoutSeed, items: threeItems })
        const result2 = importItems({ flow: flowWithoutSeed, items: threeItems })

        expect(result1.choice).toEqual(result2.choice)
      })
    })

    it('should not include a choice if there are less than three items', () => {
      expect(flowWithTwoItems.choice).toBeUndefined()
    })
  })
})
