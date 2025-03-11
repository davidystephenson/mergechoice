import { Flow, Item } from './flowTypes'
import Rand from 'rand-seed'
import shuffleArray from './shuffleArray'

export default function importItems (props: {
  flow: Flow
  items: Item[]
}): Flow {
  const result = {
    ...props.flow,
    items: props.items
  }

  if (props.items.length >= 3) {
    const seed = props.flow.seed !== undefined ? String(props.flow.seed) : 'default'
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
