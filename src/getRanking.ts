import { Flow, RankingItem } from './flowTypes'

export default function getRanking (props: {
  flow: Flow
}): RankingItem[] {
  const operations = Object.values(props.flow.operations)
  const items = Object.values(props.flow.items)
  const operationItemUids = operations.flatMap(operation => {
    return [...operation.aInput, ...operation.bInput, ...operation.output]
  })
  const uniqueOperationItemUids = [...new Set(operationItemUids)]
  const missingOperationItemUids = uniqueOperationItemUids.filter(uid => {
    return !items.some(item => item.uid === uid)
  })
  if (missingOperationItemUids.length > 0) {
    const joined = missingOperationItemUids.join(', ')
    const message = `Missing items: ${joined}`
    throw new Error(message)
  }
  const missingItems = items.filter(item => {
    return !operationItemUids.includes(item.uid)
  })
  if (missingItems.length > 0) {
    const uids = missingItems.map(item => item.uid)
    const joined = uids.join(', ')
    const message = `Missing items: ${joined}`
    throw new Error(message)
  }
  const rankingItems = operations.reduce<RankingItem[]>((rankingItems, operation) => {
    operation.output.forEach((outputUid, index) => {
      const item = props.flow.items[outputUid]
      const rankingItem = {
        ...item,
        points: index,
        rank: 1
      }
      rankingItems.push(rankingItem)
    })
    operation.aInput.forEach((aInputUid, index) => {
      const item = props.flow.items[aInputUid]
      const points = index + operation.output.length
      const rankingItem = {
        ...item,
        points,
        rank: 1
      }
      rankingItems.push(rankingItem)
    })
    operation.bInput.forEach((bInputUid, index) => {
      const item = props.flow.items[bInputUid]
      const points = index + operation.output.length
      const rankingItem = {
        ...item,
        points,
        rank: 1
      }
      rankingItems.push(rankingItem)
    })
    return rankingItems
  }, [])
  return rankingItems
}
