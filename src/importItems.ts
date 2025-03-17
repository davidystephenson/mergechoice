import { Flow, Item, Uid } from './flowTypes'
import shuffleArray from './shuffleArray'
import createOperation from './createOperation'
import addOperation from './addOperation'

export default function importItems (props: {
  flow: Flow
  items: Item[]
}): Flow {
  if (props.items.length === 0) {
    throw new Error('Items cannot be empty')
  }

  const uids = props.items.map(item => item.uid)
  const uniqueUids = new Set(uids)
  if (uniqueUids.size !== props.items.length) {
    throw new Error('Item UIDs must be unique')
  }

  for (const item of props.items) {
    if (props.flow.items[item.uid] != null) {
      throw new Error('Item UIDs must be unique across the entire flow')
    }
  }

  const itemsRecord: Record<Uid, Item> = { ...props.flow.items }
  for (const item of props.items) {
    itemsRecord[item.uid] = item
  }

  const importEpisode = {
    type: 'import' as const,
    items: props.items
  }

  const history = [importEpisode, ...props.flow.history]

  const newItemCount = props.flow.itemCount + props.items.length

  const baseFlow: Flow = {
    ...props.flow,
    items: itemsRecord,
    history,
    itemCount: newItemCount
  }

  if (props.items.length === 1) {
    const operation = createOperation({
      aInput: [],
      bInput: [],
      flow: baseFlow,
      output: [props.items[0].uid]
    })

    return addOperation({
      flow: baseFlow,
      operation
    })
  }

  const shuffledItems = shuffleArray({
    items: props.items,
    uid: baseFlow.uid,
    count: baseFlow.itemCount
  })

  const pairCount = Math.floor(shuffledItems.length / 2)
  const pairs = Array.from({ length: pairCount }, (_, i) => {
    const firstIndex = i * 2
    const secondIndex = i * 2 + 1
    const firstItem = shuffledItems[firstIndex]
    const secondItem = shuffledItems[secondIndex]
    return [firstItem, secondItem]
  })

  const flowWithPairs = pairs.reduce((currentFlow, pair) => {
    const operation = createOperation({
      aInput: [pair[0].uid],
      bInput: [pair[1].uid],
      flow: currentFlow,
      output: []
    })

    return addOperation({
      flow: currentFlow,
      operation
    })
  }, baseFlow)

  const hasRemainingItem = shuffledItems.length % 2 === 1

  if (!hasRemainingItem) {
    return flowWithPairs
  }

  const lastIndex = shuffledItems.length - 1
  const remainingItem = shuffledItems[lastIndex]

  const operation = createOperation({
    aInput: [],
    bInput: [],
    flow: flowWithPairs,
    output: [remainingItem.uid]
  })

  return addOperation({
    flow: flowWithPairs,
    operation
  })
}
