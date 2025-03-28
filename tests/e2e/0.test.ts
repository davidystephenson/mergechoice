import { createFlow, getChoice, getRanking, isFlowComplete } from '../../src'

describe('if zero items are imported', () => {
  it('should have no items', () => {
    const flow = createFlow({ uid: 'test' })
    const items = Object.values(flow.items)
    expect(items.length).toBe(0)
  })

  it('should have no operations', () => {
    const flow = createFlow({ uid: 'test' })
    const operations = Object.values(flow.operations)
    expect(operations.length).toBe(0)
  })

  it('should have no choice', () => {
    const flow = createFlow({ uid: 'test' })
    const choice = getChoice({ flow })
    expect(choice).toBeUndefined()
  })

  it('should be complete', () => {
    const flow = createFlow({ uid: 'test' })
    const complete = isFlowComplete({ flow })
    expect(complete).toBe(true)
  })

  it('should create an empty ranking', () => {
    const flow = createFlow({ uid: 'test' })
    const ranking = getRanking({ flow })
    expect(ranking.length).toBe(0)
  })
})
