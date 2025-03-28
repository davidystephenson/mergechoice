import { chooseOption, getChoice, getRanking, isFlowComplete, isInputOperation, isOutputOperation } from '../../src'
import getVerifiedChoice from '../choice/getVerifiedChoice'
import createThreeFlow from '../flow/createThreeFlow'
import verifyInputOperation from '../operation/verifyInputOperation'

describe('if three items are imported', () => {
  it('should have three items', () => {
    const flow = createThreeFlow()
    const items = Object.values(flow.items)
    expect(items.length).toBe(3)
  })

  it('should have two operations', () => {
    const flow = createThreeFlow()
    const operations = Object.values(flow.operations)
    expect(operations.length).toBe(2)
  })

  it('should have one input operation with one a and one b', () => {
    const flow = createThreeFlow()
    const operations = Object.values(flow.operations)
    const inputOperations = operations.filter(operation => {
      return isInputOperation({ operation })
    })
    expect(inputOperations.length).toBe(1)
    expect(inputOperations[0].aInput.length).toBe(1)
    expect(inputOperations[0].bInput.length).toBe(1)
  })

  it('should have one output operation with one output', () => {
    const flow = createThreeFlow()
    const operations = Object.values(flow.operations)
    const outputOperations = operations.filter(operation => {
      return isOutputOperation({ operation })
    })
    expect(outputOperations.length).toBe(1)
    expect(outputOperations[0].output.length).toBe(1)
  })

  it('should have a choice', () => {
    const flow = createThreeFlow()
    const choice = getChoice({ flow })
    expect(choice).toBeDefined()
  })

  it('should not be complete', () => {
    const flow = createThreeFlow()
    const complete = isFlowComplete({ flow })
    expect(complete).toBe(false)
  })

  it('should create a ranking with three items that have 0 points and rank 1', () => {
    const flow = createThreeFlow()
    const ranking = getRanking({ flow })
    expect(ranking.length).toBe(3)
    ranking.forEach(item => {
      expect(item.points).toBe(0)
      expect(item.rank).toBe(1)
    })
  })

  describe('if a is chosen', () => {
    it('should have one input operation', () => {
      const flow = createThreeFlow()
      const choice = getVerifiedChoice({ flow })
      const chosenFlow = chooseOption({ flow, option: choice.aItemUid })
      const operations = Object.values(chosenFlow.operations)
      expect(operations.length).toBe(1)
      verifyInputOperation({ operation: operations[0] })
    })

    it('should not be complete', () => {
      const flow = createThreeFlow()
      const choice = getVerifiedChoice({ flow })
      const chosenFlow = chooseOption({ flow, option: choice.aItemUid })
      const complete = isFlowComplete({ flow: chosenFlow })
      expect(complete).toBe(false)
    })

    it('should rank the a item first with 1 point', () => {
      const flow = createThreeFlow()
      const choice = getVerifiedChoice({ flow })
      const chosenFlow = chooseOption({ flow, option: choice.aItemUid })
      const ranking = getRanking({ flow: chosenFlow })
      expect(ranking.length).toBe(3)
      expect(ranking[0].uid).toBe(choice.aItemUid)
      expect(ranking[0].points).toBe(1)
      expect(ranking[0].rank).toBe(1)
    })

    it('should rank the other two items second with 0 points', () => {
      const flow = createThreeFlow()
      const operations = Object.values(flow.operations)
      expect(operations.length).toBe(2)
      const outputOperation = operations.find(operation => isOutputOperation({ operation }))
      if (outputOperation == null) {
        throw new Error('Output operation not found')
      }
      const choice = getVerifiedChoice({ flow })
      const chosenFlow = chooseOption({ flow, option: choice.aItemUid })
      const ranking = getRanking({ flow: chosenFlow })
      const otherRankingItems = [ranking[1], ranking[2]]
      const includesB = otherRankingItems.some(item => item.uid === choice.bItemUid)
      expect(includesB).toBe(true)
      const includesOutput = otherRankingItems.some(item => item.uid === outputOperation.output[0])
      expect(includesOutput).toBe(true)
      otherRankingItems.forEach(item => {
        expect(item.rank).toBe(2)
        expect(item.points).toBe(0)
      })
    })
  })

  describe('if b is chosen', () => {
    it('should have one input operation', () => {
      const flow = createThreeFlow()
      const choice = getVerifiedChoice({ flow })
      const chosenFlow = chooseOption({ flow, option: choice.bItemUid })
      const operations = Object.values(chosenFlow.operations)
      expect(operations.length).toBe(1)
      verifyInputOperation({ operation: operations[0] })
    })

    it('should not be complete', () => {
      const flow = createThreeFlow()
      const choice = getVerifiedChoice({ flow })
      const chosenFlow = chooseOption({ flow, option: choice.bItemUid })
      const complete = isFlowComplete({ flow: chosenFlow })
      expect(complete).toBe(false)
    })

    it('should rank the b item first with 1 point', () => {
      const flow = createThreeFlow()
      const choice = getVerifiedChoice({ flow })
      const chosenFlow = chooseOption({ flow, option: choice.bItemUid })
      const ranking = getRanking({ flow: chosenFlow })
      expect(ranking.length).toBe(3)
      expect(ranking[0].uid).toBe(choice.bItemUid)
      expect(ranking[0].points).toBe(1)
      expect(ranking[0].rank).toBe(1)
    })

    it('should rank the other two items second with 0 points', () => {
      const flow = createThreeFlow()
      const operations = Object.values(flow.operations)
      expect(operations.length).toBe(2)
      const outputOperation = operations.find(operation => isOutputOperation({ operation }))
      if (outputOperation == null) {
        throw new Error('Output operation not found')
      }
      const choice = getVerifiedChoice({ flow })
      const chosenFlow = chooseOption({ flow, option: choice.bItemUid })
      const ranking = getRanking({ flow: chosenFlow })
      const otherRankingItems = [ranking[1], ranking[2]]
      const includesA = otherRankingItems.some(item => item.uid === choice.aItemUid)
      expect(includesA).toBe(true)
      const includesOutput = otherRankingItems.some(item => item.uid === outputOperation.output[0])
      expect(includesOutput).toBe(true)
      otherRankingItems.forEach(item => {
        expect(item.rank).toBe(2)
        expect(item.points).toBe(0)
      })
    })
  })
})
