import { Flow, Item } from '../../src/flowTypes'

export default function verifyItemInResult (props: {
  flow: Flow
  item: Item
}): void {
  const included = props.flow.result.some((item) => {
    return item.uuid === props.item.uuid
  })
  expect(included).toBe(true)
}
