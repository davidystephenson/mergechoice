import { chooseOption, getChoice, isFlowComplete } from '../../src'
import getVerifiedChoice from '../choice/getVerifiedChoice'
import createTwoFlow from '../flow/createTwoFlow'
import verifyInputOperation from '../operation/verifyInputOperation'
import verifyOutputOperation from '../operation/verifyOutputOperation'

describe('if two items are imported', () => {
  it('should have two items', () => {
    const flow = createTwoFlow()
    const items = Object.values(flow.items)
    expect(items.length).toBe(2)
  })

  it('should have one input operation', () => {
    const flow = createTwoFlow()
    const operations = Object.values(flow.operations)
    expect(operations.length).toBe(1)
    verifyInputOperation({ operation: operations[0] })
  })

  it('should have a choice', () => {
    const flow = createTwoFlow()
    const choice = getChoice({ flow })
    expect(choice).toBeDefined()
  })

  it('should not be complete', () => {
    const flow = createTwoFlow()
    const complete = isFlowComplete({ flow })
    expect(complete).toBe(false)
  })

  describe('if a is chosen', () => {
    it('should have one output operation', () => {
      const flow = createTwoFlow()
      const choice = getVerifiedChoice({ flow })
      const chosenFlow = chooseOption({ flow, option: choice.aItemId })
      const operations = Object.values(chosenFlow.operations)
      expect(operations.length).toBe(1)
      verifyOutputOperation({ operation: operations[0] })
    })

    it('should be complete', () => {
      const flow = createTwoFlow()
      const choice = getVerifiedChoice({ flow })
      const chosenFlow = chooseOption({ flow, option: choice.aItemId })
      const complete = isFlowComplete({ flow: chosenFlow })
      expect(complete).toBe(true)
    })
  })
})
