import Rand from 'rand-seed'
import { Uid } from './flowTypes'

export default function shuffleArray <Element> (props: {
  count: number
  items: Element[]
  uid: Uid
}): Element[] {
  const seedString = `${props.uid}-${props.count}`

  const rand = new Rand(seedString)

  return [...props.items]
    .map(item => {
      return {
        item,
        sort: rand.next()
      }
    })
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item)
}
