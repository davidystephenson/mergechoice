import { chooseOption, createFlow, flowSchema, getRanking, isInputOperation, isOutputOperation } from '../../src'
import getVerifiedChoice from '../choice/getVerifiedChoice'
import createThreeFlow from '../flow/createThreeFlow'
import createTwoFlow from '../flow/createTwoFlow'
import insertOperation from '../operation/insertOperation'

describe('chooseOption', () => {
  it('should take a flow and an option and return a new flow', () => {
    const flow = createThreeFlow()
    const choice = getVerifiedChoice({ flow })
    const chosenFlow = chooseOption({ flow, option: choice.aItemUid })
    const parsed = flowSchema.parse(chosenFlow)
    expect(parsed).toEqual(chosenFlow)
  })

  it('should throw an error if the flow has no choice', () => {
    const flowWithoutChoice = createFlow({ uid: 'test' })
    expect(() => chooseOption({ flow: flowWithoutChoice, option: '1' }))
      .toThrow('Flow has no choice')
  })

  it('should throw an error if the option is not the a UID or b UID', () => {
    const flow = createThreeFlow()
    expect(() => {
      chooseOption({ flow, option: 'A-DIFFERENT-UID' })
    }).toThrow('Option is not in the choice')
  })

  describe('if there is only one operation with one a and b', () => {
    it('should move them both to the output with the selected option last', () => {
      const flow = createTwoFlow()
      const operations = Object.values(flow.operations)
      expect(operations.length).toBe(1)
      expect(operations[0].aInput.length).toBe(1)
      expect(operations[0].bInput.length).toBe(1)
      const choice = getVerifiedChoice({ flow })
      const chosenFlow = chooseOption({ flow, option: choice.aItemUid })
      const chosenOperation = chosenFlow.operations[choice.operationUid]
      expect(chosenOperation.output).toEqual([choice.bItemUid, choice.aItemUid])
    })
  })

  describe('if there is only one operation with two a and one b', () => {
    describe('if a is chosen', () => {
      it('should move all the inputs to the end of they output with the b first', () => {
        const flow = createFlow({ uid: 'test' })
        flow.items = {
          a: { name: 'a', uid: 'a', seed: 0 },
          b: { name: 'b', uid: 'b', seed: 0 },
          c: { name: 'c', uid: 'c', seed: 0 },
          d: { name: 'd', uid: 'd', seed: 0 }
        }
        const insertedFlow = insertOperation({
          aInput: ['a', 'b'],
          bInput: ['c'],
          flow,
          output: ['d']
        })

        const choice = getVerifiedChoice({ flow: insertedFlow })
        const chosenFlow = chooseOption({ flow: insertedFlow, option: choice.aItemUid })
        const chosenOperation = chosenFlow.operations[choice.operationUid]
        expect(chosenOperation.aInput).toEqual([])
        expect(chosenOperation.bInput).toEqual([])
        expect(chosenOperation.output).toEqual(['d', 'c', 'a', 'b'])
      })
    })
    describe('if b is chosen', () => {
      it('should move the first a to the end of the output', () => {
        const flow = createFlow({ uid: 'test' })
        flow.items = {
          a: { name: 'a', uid: 'a', seed: 0 },
          b: { name: 'b', uid: 'b', seed: 0 },
          c: { name: 'c', uid: 'c', seed: 0 },
          d: { name: 'd', uid: 'd', seed: 0 }
        }
        const insertedFlow = insertOperation({
          aInput: ['a', 'b'],
          bInput: ['c'],
          flow,
          output: ['d']
        })
        const choice = getVerifiedChoice({ flow: insertedFlow })
        const chosenFlow = chooseOption({ flow: insertedFlow, option: choice.bItemUid })
        const chosenOperation = chosenFlow.operations[choice.operationUid]
        expect(chosenOperation.aInput).toEqual(['b'])
        expect(chosenOperation.bInput).toEqual(['c'])
        expect(chosenOperation.output).toEqual(['d', 'a'])
      })
    })
  })

  describe('if there is one input operation with one a and one b and one output operation', () => {
    it('should combine the chosen operation with the output operation', () => {
      const flow = createThreeFlow()
      const operations = Object.values(flow.operations)
      const inputOperations = operations.filter(operation => {
        return isInputOperation({ operation })
      })
      expect(inputOperations.length).toBe(1)
      expect(inputOperations[0].aInput.length).toBe(1)
      expect(inputOperations[0].bInput.length).toBe(1)
      const outputOperations = operations.filter(operation => {
        return isOutputOperation({ operation })
      })
      expect(outputOperations.length).toBe(1)
      const inputEarlier = inputOperations[0].uid < outputOperations[0].uid
      const choice = getVerifiedChoice({ flow })
      const chosenFlow = chooseOption({ flow, option: choice.aItemUid })
      const chosenOperations = Object.values(chosenFlow.operations)
      expect(chosenOperations.length).toBe(1)
      const inputted = isInputOperation({ operation: chosenOperations[0] })
      expect(inputted).toBe(true)
      if (inputEarlier) {
        expect(chosenOperations[0].aInput).toEqual([choice.bItemUid, choice.aItemUid])
        expect(chosenOperations[0].bInput).toEqual(outputOperations[0].output)
      } else {
        expect(chosenOperations[0].aInput).toEqual(outputOperations[0].output)
        expect(chosenOperations[0].bInput).toEqual([choice.bItemUid, choice.aItemUid])
      }
    })
  })

  describe('there are two input operations with one a and one b', () => {
    it('should move both options to the output with the chosen option last', () => {
      const flow = createFlow({ uid: 'test' })
      flow.items = {
        a: { name: 'a', uid: 'a', seed: 0 },
        b: { name: 'b', uid: 'b', seed: 0 },
        c: { name: 'c', uid: 'c', seed: 0 },
        d: { name: 'd', uid: 'd', seed: 0 }
      }
      const insertedFlow1 = insertOperation({
        aInput: ['a'],
        bInput: ['b'],
        flow,
        output: []
      })
      const insertedFlow2 = insertOperation({
        aInput: ['c'],
        bInput: ['d'],
        flow: insertedFlow1,
        output: []
      })
      const choice = getVerifiedChoice({ flow: insertedFlow2 })
      const chosenFlow = chooseOption({
        flow: insertedFlow2, option: choice.aItemUid
      })
      const chosenOperation = chosenFlow.operations[choice.operationUid]
      expect(chosenOperation.aInput).toEqual([])
      expect(chosenOperation.bInput).toEqual([])
      expect(chosenOperation.output).toEqual([choice.bItemUid, choice.aItemUid])
      const ranking = getRanking({ flow: chosenFlow })
      console.log('ranking', ranking)
    })
  })
})
