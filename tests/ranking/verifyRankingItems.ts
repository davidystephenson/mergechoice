import { RankingItem } from '../../src'
import verifyRankingItem from './verifyRankingItem'

export default function verifyRankingItems (props: {
  ranking: RankingItem[]
  items: Array<Omit<RankingItem, 'name' | 'seed'>>
}): void {
  props.items.forEach((item, index) => {
    verifyRankingItem({
      ranking: props.ranking,
      index,
      ...item
    })
  })
}
