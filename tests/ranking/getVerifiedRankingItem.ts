import { RankingItem, Uid } from '../../src'

export default function getVerifiedRankingItem (props: {
  ranking: RankingItem[]
  uid: Uid
}): RankingItem {
  const item = props.ranking.find(item => item.uid === props.uid)
  expect(item).not.toBeUndefined()
  if (item == null) {
    throw new Error('Item not found')
  }
  return item
}
