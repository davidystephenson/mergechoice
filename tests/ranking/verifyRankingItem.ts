import { RankingItem } from '../../src'

export default function verifyRankingItem (props: {
  ranking: RankingItem[]
  index: number
  uid: string
  rank: number
  points: number
}): void {
  const label = `should set element ${props.index} as ${props.uid} with rank ${props.rank} and ${props.points} points`
  it(label, () => {
    const rankingItem = props.ranking[props.index]
    expect(rankingItem.uid).toBe(props.uid)
    expect(rankingItem.rank).toBe(props.rank)
    expect(rankingItem.points).toBe(props.points)
  })
}
