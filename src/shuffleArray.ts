import Rand from 'rand-seed'

export default function shuffleArray <Element> (props: {
  count: number
  items: Element[]
  seed: string
}): Element[] {
  const seedString = `${props.seed}-${props.count}`

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
