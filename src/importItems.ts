import { Flow, Item, Uuid } from './flowTypes'
import Rand from 'rand-seed'
import shuffleArray from './shuffleArray'

export default function importItems (props: {
  flow: Flow
  items: Item[]
}): Flow {
  // Convert array of items to a record indexed by UUID
  const itemsRecord: Record<Uuid, Item> = {}
  for (const item of props.items) {
    itemsRecord[item.uuid] = item
  }

  // Create operations for each item
  const operations: Record<Uuid, Uuid[]> = {}
  for (const item of props.items) {
    operations[item.uuid] = [item.uuid]
  }

  // Create an import episode for the history
  const importEpisode = {
    type: 'import',
    items: props.items
  }

  // Combine existing history with new episode
  const history = props.flow.history != null
    ? [importEpisode, ...props.flow.history]
    : [importEpisode]

  // Get existing operations or empty object if undefined
  const existingOperations = props.flow.operations ?? {}

  // Combine existing operations with new ones
  const combinedOperations = {
    ...existingOperations,
    ...operations
  }

  const result = {
    ...props.flow,
    items: itemsRecord,
    operations: combinedOperations,
    history
  }

  if (props.items.length >= 3) {
    const seed = props.flow.seed != null
      ? String(props.flow.seed)
      : 'default'
    const rand = new Rand(seed)

    const shuffledItems = shuffleArray({
      items: props.items,
      rand
    })

    result.choice = {
      a: shuffledItems[0].uuid,
      b: shuffledItems[1].uuid
    }
  }

  return result
}
