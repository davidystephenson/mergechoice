import { getRanking, rankingItemSchema } from '../../src'
import createThreeFlow from '../flow/createThreeFlow'

describe('getRanking', () => {
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
})
