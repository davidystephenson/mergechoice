import { getChoice, isFlowComplete } from '../../src'
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
})
