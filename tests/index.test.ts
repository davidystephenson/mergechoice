import { itemSchema, flowSchema } from '../src/index'
import { Flow, Item } from '../src/flowTypes'

describe('index', () => {
  it('should export the item schema', () => {
    expect(itemSchema).toBeDefined()
    const item: Item = { name: 'The Matrix', uuid: '1', seed: 90 }
    const parsed = itemSchema.parse(item)
    expect(parsed).toEqual(item)
  })

  it('should export the flow schema', () => {
    expect(flowSchema).toBeDefined()
    const flow: Flow = { seed: 'abc' }
    const parsed = flowSchema.parse(flow)
    expect(parsed).toEqual(flow)
  })
})
