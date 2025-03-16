import { createFlow, isFlowComplete } from '../../src/index'

describe('isFlowComplete', () => {
  it('should consider flows with no items complete ', () => {
    const flow = createFlow({ uid: 'test' })
    const complete = isFlowComplete(flow)
    expect(complete).toBe(true)
  })

  it('should throw an error if the flow has multiple output operations', () => {})

  it('should return false if there are multiple operations', () => {})

  it('should return false if there are no output operations', () => {})

  it('should return true if there is only one operation and it is an output operation', () => {})
})
