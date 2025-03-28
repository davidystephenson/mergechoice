import { addOperation, createFlow, createOperation, getRanking, rankingItemSchema } from '../../src'
import createThreeFlow from '../flow/createThreeFlow'
import getVerifiedRankingItem from './getVerifiedRankingItem'

describe('getRanking', () => {
  it('should throw an error if an operation item UID is missing from the items', () => {
    const flow = createFlow({ uid: 'test' })
    flow.items = {
      a: { name: 'a', seed: 0, uid: 'a' },
      b: { name: 'b', seed: 0, uid: 'b' }
    }
    const operation = createOperation({
      aInput: ['a'],
      bInput: ['b'],
      flow,
      output: ['c']
    })
    const addedFlow = addOperation({ flow, operation })
    expect(() => getRanking({ flow: addedFlow })).toThrow()
  })

  it('should throw an error if an item UID is missing from the operations', () => {
    const flow = createFlow({ uid: 'test' })
    flow.items = {
      a: { name: 'a', seed: 0, uid: 'a' },
      b: { name: 'b', seed: 0, uid: 'b' },
      c: { name: 'c', seed: 0, uid: 'c' }
    }
    const operation = createOperation({
      aInput: ['a'],
      bInput: ['b'],
      flow,
      output: []
    })
    const addedFlow = addOperation({ flow, operation })
    expect(() => getRanking({ flow: addedFlow })).toThrow()
  })

  it('should throw an error if a UID is duplicated in the operations', () => {
    const flow = createFlow({ uid: 'test' })
    flow.items = {
      a: { name: 'a', seed: 0, uid: 'a' },
      b: { name: 'b', seed: 0, uid: 'b' },
      c: { name: 'c', seed: 0, uid: 'c' },
      d: { name: 'd', seed: 0, uid: 'd' },
      e: { name: 'e', seed: 0, uid: 'e' },
      f: { name: 'f', seed: 0, uid: 'f' },
      g: { name: 'g', seed: 0, uid: 'g' }
    }
    const operation1 = createOperation({
      aInput: ['a'],
      bInput: ['b'],
      flow,
      output: ['c', 'd']
    })
    const addedFlow1 = addOperation({ flow, operation: operation1 })
    const operation2 = createOperation({
      aInput: ['e', 'b'],
      bInput: ['g', 'f'],
      flow: addedFlow1,
      output: ['d', 'c']
    })
    const addedFlow2 = addOperation({ flow: addedFlow1, operation: operation2 })

    try {
      getRanking({ flow: addedFlow2 })
      fail('Expected getRanking to throw an error')
    } catch (error) {
      const errorMessage = String(error)
      expect(errorMessage).toContain('Duplicate item UIDs')
      expect(errorMessage).toContain('b')
      expect(errorMessage).toContain('c')
    }
  })

  it('should return an empty array if the flow is empty', () => {
    const flow = createFlow({ uid: 'test' })
    const ranking = getRanking({ flow })
    expect(ranking).toEqual([])
  })

  it('should return an array of ranking items', () => {
    const flow = createThreeFlow()
    const ranking = getRanking({ flow })
    const arrayed = Array.isArray(ranking)
    expect(arrayed).toBe(true)
    ranking.forEach(item => {
      const parsed = rankingItemSchema.parse(item)
      expect(parsed).toEqual(item)
    })
  })

  it('should give every item 0 points and rank 1 when no choices have been made', () => {
    const flow = createThreeFlow()
    const ranking = getRanking({ flow })
    ranking.forEach(item => {
      expect(item.points).toBe(0)
      expect(item.rank).toBe(1)
    })
  })

  it('should give output items points equal to the number of preceding output items', () => {
    const flow = createFlow({ uid: 'test' })
    flow.items = {
      a: { name: 'a', seed: 0, uid: 'a' },
      b: { name: 'b', seed: 0, uid: 'b' }
    }
    const operation = createOperation({
      aInput: [],
      bInput: [],
      flow,
      output: ['a', 'b']
    })
    const addedFlow = addOperation({ flow, operation })
    const ranking = getRanking({ flow: addedFlow })
    const rankingItemA = getVerifiedRankingItem({ ranking, uid: 'a' })
    expect(rankingItemA.points).toBe(0)
    const rankingItemB = getVerifiedRankingItem({ ranking, uid: 'b' })
    expect(rankingItemB.points).toBe(1)
  })

  it('should give input items points equal to the number of preceding items in their input plus the number of output items', () => {
    const flow = createFlow({ uid: 'test' })
    flow.items = {
      a: { name: 'a', seed: 0, uid: 'a' },
      b: { name: 'b', seed: 0, uid: 'b' },
      c: { name: 'c', seed: 0, uid: 'c' },
      d: { name: 'd', seed: 0, uid: 'd' },
      e: { name: 'e', seed: 0, uid: 'e' },
      f: { name: 'f', seed: 0, uid: 'f' },
      g: { name: 'g', seed: 0, uid: 'g' }
    }
    const operation = createOperation({
      aInput: ['a', 'b'],
      bInput: ['c', 'd'],
      flow,
      output: ['e', 'f', 'g']
    })
    const addedFlow = addOperation({ flow, operation })
    const ranking = getRanking({ flow: addedFlow })
    const rankingItemA = getVerifiedRankingItem({ ranking, uid: 'a' })
    expect(rankingItemA.points).toBe(3)
    const rankingItemB = getVerifiedRankingItem({ ranking, uid: 'b' })
    expect(rankingItemB.points).toBe(4)
    const rankingItemC = getVerifiedRankingItem({ ranking, uid: 'c' })
    expect(rankingItemC.points).toBe(3)
    const rankingItemD = getVerifiedRankingItem({ ranking, uid: 'd' })
    expect(rankingItemD.points).toBe(4)
    const rankingItemE = getVerifiedRankingItem({ ranking, uid: 'e' })
    expect(rankingItemE.points).toBe(0)
    const rankingItemF = getVerifiedRankingItem({ ranking, uid: 'f' })
    expect(rankingItemF.points).toBe(1)
    const rankingItemG = getVerifiedRankingItem({ ranking, uid: 'g' })
    expect(rankingItemG.points).toBe(2)
  })

  it('should give every item a rank equal to the number of unique point values that are greater than it', () => {
    const flow = createFlow({ uid: 'test' })
    flow.items = {
      a: { name: 'a', seed: 0, uid: 'a' },
      b: { name: 'b', seed: 0, uid: 'b' },
      c: { name: 'c', seed: 0, uid: 'c' },
      d: { name: 'd', seed: 0, uid: 'd' },
      e: { name: 'e', seed: 0, uid: 'e' },
      f: { name: 'f', seed: 0, uid: 'f' },
      g: { name: 'g', seed: 0, uid: 'g' }
    }
    const operation = createOperation({
      aInput: ['a', 'b'],
      bInput: ['c', 'd'],
      flow,
      output: ['e', 'f', 'g']
    })
    const addedFlow = addOperation({ flow, operation })
    const ranking = getRanking({ flow: addedFlow })
    const rankingItemA = getVerifiedRankingItem({ ranking, uid: 'a' })
    expect(rankingItemA.rank).toBe(2)
    const rankingItemB = getVerifiedRankingItem({ ranking, uid: 'b' })
    expect(rankingItemB.rank).toBe(1)
    const rankingItemC = getVerifiedRankingItem({ ranking, uid: 'c' })
    expect(rankingItemC.rank).toBe(2)
    const rankingItemD = getVerifiedRankingItem({ ranking, uid: 'd' })
    expect(rankingItemD.rank).toBe(1)
    const rankingItemE = getVerifiedRankingItem({ ranking, uid: 'e' })
    expect(rankingItemE.rank).toBe(5)
    const rankingItemF = getVerifiedRankingItem({ ranking, uid: 'f' })
    expect(rankingItemF.rank).toBe(4)
    const rankingItemG = getVerifiedRankingItem({ ranking, uid: 'g' })
    expect(rankingItemG.rank).toBe(3)
  })

  it('should sort the ranking items by rank first, then name', () => {
    const flow = createFlow({ uid: 'test' })
    flow.items = {
      a: { name: 'a', seed: 0, uid: 'a' },
      b: { name: 'b', seed: 0, uid: 'b' },
      c: { name: 'c', seed: 0, uid: 'c' },
      d: { name: 'd', seed: 0, uid: 'd' },
      e: { name: 'e', seed: 0, uid: 'e' },
      f: { name: 'f', seed: 0, uid: 'f' },
      g: { name: 'g', seed: 0, uid: 'g' }
    }
    const operation = createOperation({
      aInput: ['a', 'b'],
      bInput: ['c', 'd'],
      flow,
      output: ['e', 'f', 'g']
    })
    const addedFlow = addOperation({ flow, operation })
    const ranking = getRanking({ flow: addedFlow })
    expect(ranking[0].name).toBe('b')
    expect(ranking[1].name).toBe('d')
    expect(ranking[2].name).toBe('a')
    expect(ranking[3].name).toBe('c')
    expect(ranking[4].name).toBe('g')
    expect(ranking[5].name).toBe('f')
    expect(ranking[6].name).toBe('e')
  })
})
