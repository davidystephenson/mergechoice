import { getChoice, getRanking, isFlowComplete, isInputOperation, isOutputOperation } from '../../src'
import createThreeFlow from '../flow/createThreeFlow'

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

  it('should have one input operation and one output operation', () => {
    const flow = createThreeFlow()
    const operations = Object.values(flow.operations)
    const inputOperations = operations.filter(operation => {
      return isInputOperation({ operation })
    })
    expect(inputOperations.length).toBe(1)
    const outputOperations = operations.filter(operation => {
      return isOutputOperation({ operation })
    })
    expect(outputOperations.length).toBe(1)
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

  // describe('if a is chosen', () => {
  //   it('should have one output operation', () => {
  //     const flow = createThreeFlow()
  //     const choice = getVerifiedChoice({ flow })
  //     const chosenFlow = chooseOption({ flow, option: choice.aItemUid })
  //     const operations = Object.values(chosenFlow.operations)
  //     expect(operations.length).toBe(1)
  //     verifyOutputOperation({ operation: operations[0] })
  //   })

  //   it('should be complete', () => {
  //     const flow = createTwoFlow()
  //     const choice = getVerifiedChoice({ flow })
  //     const chosenFlow = chooseOption({ flow, option: choice.aItemUid })
  //     const complete = isFlowComplete({ flow: chosenFlow })
  //     expect(complete).toBe(true)
  //   })

  //   it('should create a ranking with two items', () => {
  //     const flow = createTwoFlow()
  //     const choice = getVerifiedChoice({ flow })
  //     const chosenFlow = chooseOption({ flow, option: choice.aItemUid })
  //     const ranking = getRanking({ flow: chosenFlow })
  //     expect(ranking.length).toBe(2)
  //   })

  //   it('should rank the a item first with 1 point and rank 1', () => {
  //     const flow = createTwoFlow()
  //     const choice = getVerifiedChoice({ flow })
  //     const chosenFlow = chooseOption({ flow, option: choice.aItemUid })
  //     const ranking = getRanking({ flow: chosenFlow })
  //     expect(ranking[0].uid).toBe(choice.aItemUid)
  //     expect(ranking[0].points).toBe(1)
  //     expect(ranking[0].rank).toBe(1)
  //   })

  //   it('should rank the b item second with 0 points and rank 2', () => {
  //     const flow = createTwoFlow()
  //     const choice = getVerifiedChoice({ flow })
  //     const chosenFlow = chooseOption({ flow, option: choice.aItemUid })
  //     const ranking = getRanking({ flow: chosenFlow })
  //     expect(ranking[1].uid).toBe(choice.bItemUid)
  //     expect(ranking[1].points).toBe(0)
  //     expect(ranking[1].rank).toBe(2)
  //   })
  // })

  // describe('if b is chosen', () => {
  //   it('should have one output operation', () => {
  //     const flow = createTwoFlow()
  //     const choice = getVerifiedChoice({ flow })
  //     const chosenFlow = chooseOption({ flow, option: choice.bItemUid })
  //     const operations = Object.values(chosenFlow.operations)
  //     expect(operations.length).toBe(1)
  //     verifyOutputOperation({ operation: operations[0] })
  //   })

  //   it('should be complete', () => {
  //     const flow = createTwoFlow()
  //     const choice = getVerifiedChoice({ flow })
  //     const chosenFlow = chooseOption({ flow, option: choice.bItemUid })
  //     const complete = isFlowComplete({ flow: chosenFlow })
  //     expect(complete).toBe(true)
  //   })

  //   it('should create a ranking with two items', () => {
  //     const flow = createTwoFlow()
  //     const choice = getVerifiedChoice({ flow })
  //     const chosenFlow = chooseOption({ flow, option: choice.bItemUid })
  //     const ranking = getRanking({ flow: chosenFlow })
  //     expect(ranking.length).toBe(2)
  //   })

  //   it('should rank the b item first with 1 point and rank 1', () => {
  //     const flow = createTwoFlow()
  //     const choice = getVerifiedChoice({ flow })
  //     const chosenFlow = chooseOption({ flow, option: choice.bItemUid })
  //     const ranking = getRanking({ flow: chosenFlow })
  //     expect(ranking[0].uid).toBe(choice.bItemUid)
  //     expect(ranking[0].points).toBe(1)
  //     expect(ranking[0].rank).toBe(1)
  //   })

  //   it('should rank the a item second with 0 points and rank 2', () => {
  //     const flow = createTwoFlow()
  //     const choice = getVerifiedChoice({ flow })
  //     const chosenFlow = chooseOption({ flow, option: choice.bItemUid })
  //     const ranking = getRanking({ flow: chosenFlow })
  //     expect(ranking[1].uid).toBe(choice.aItemUid)
  //     expect(ranking[1].points).toBe(0)
  //     expect(ranking[1].rank).toBe(2)
  //   })
  // })
})
