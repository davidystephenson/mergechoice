import { Flow, Item, Uuid } from './flowTypes'
import shuffleArray from './shuffleArray'
import createOperation from './createOperation'

export default function importItems (props: {
  flow: Flow
  items: Item[]
}): Flow {
  if (props.items.length === 0) {
    throw new Error('Items cannot be empty')
  }

  const uuids = props.items.map(item => item.uuid)
  const uniqueUuids = new Set(uuids)
  if (uniqueUuids.size !== props.items.length) {
    throw new Error('Item UUIDs must be unique')
  }

  const itemsRecord: Record<Uuid, Item> = { ...props.flow.items }
  for (const item of props.items) {
    itemsRecord[item.uuid] = item
  }

  const importEpisode = {
    type: 'import' as const,
    items: props.items
  }

  const history = [importEpisode, ...props.flow.history]

  const newItemCount = props.flow.itemCount + props.items.length

  const updatedFlow: Flow = {
    ...props.flow,
    items: itemsRecord,
    history,
    itemCount: newItemCount
  }

  if (props.items.length === 1) {
    createOperation({
      flow: updatedFlow,
      output: [props.items[0].uuid]
    })
  } else {
    const shuffledItems = shuffleArray({
      items: props.items,
      seed: props.flow.seed,
      count: updatedFlow.itemCount
    })
    // For multiple items, pair them up into operations
    const pairs: Array<[Item, Item]> = []

    // Create pairs of items
    const pairCount = Math.floor(shuffledItems.length / 2)
    for (let i = 0; i < pairCount; i++) {
      const firstIndex = i * 2
      const secondIndex = i * 2 + 1
      pairs.push([shuffledItems[firstIndex], shuffledItems[secondIndex]])
    }

    // Create operations for each pair
    pairs.forEach(pair => {
      createOperation({
        flow: updatedFlow,
        a: [pair[0].uuid],
        b: [pair[1].uuid]
      })
    })

    // If there's an odd number of items, create an output operation for the last item
    const isOdd = shuffledItems.length % 2 === 1
    if (isOdd) {
      const lastIndex = shuffledItems.length - 1
      const lastItem = shuffledItems[lastIndex]
      createOperation({
        flow: updatedFlow,
        output: [lastItem.uuid]
      })
    }
  }

  return updatedFlow
}
