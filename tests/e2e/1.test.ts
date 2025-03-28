import { getChoice, getRanking, isFlowComplete } from '../../src'
import createOneFlow from '../flow/createOneFlow'
import verifyOutputOperation from '../operation/verifyOutputOperation'

describe('if one item is imported', () => {
  it('should have one item', () => {
    const flow = createOneFlow()
    const items = Object.values(flow.items)
    expect(items.length).toBe(1)
  })

  it('should have one output operation', () => {
    const flow = createOneFlow()
    const operations = Object.values(flow.operations)
    expect(operations.length).toBe(1)
    verifyOutputOperation({ operation: operations[0] })
  })

  it('should have no choice', () => {
    const flow = createOneFlow()
    const choice = getChoice({ flow })
    expect(choice).toBeUndefined()
  })

  it('should be complete', () => {
    const flow = createOneFlow()
    const complete = isFlowComplete({ flow })
    expect(complete).toBe(true)
  })

  it('should create a ranking with one item that has 0 points and rank 1', () => {
    const flow = createOneFlow()
    const ranking = getRanking({ flow })
    expect(ranking.length).toBe(1)
    const item = ranking[0]
    expect(item.points).toBe(0)
    expect(item.rank).toBe(1)
  })
})
