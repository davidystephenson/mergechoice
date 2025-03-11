import { Item } from './flowTypes'
import Rand from 'rand-seed'

export default function shuffleArray (props: {
  items: Item[]
  rand: Rand
}): Item[] {
  return [...props.items]
    .map(item => {
      return {
        item,
        sort: props.rand.next()
      }
    })
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item)
}
