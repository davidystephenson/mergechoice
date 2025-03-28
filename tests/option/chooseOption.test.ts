import { chooseOption, createFlow, flowSchema, isInputOperation, isOutputOperation } from '../../src'
import getVerifiedChoice from '../choice/getVerifiedChoice'
import createThreeFlow from '../flow/createThreeFlow'
import createTwoFlow from '../flow/createTwoFlow'

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

  // describe('if the operation has only one a and two b', () => {
  //   describe('if the operation is ascending', () => {
  //     describe('if the operation better is one less than the length of b', () => {
  //       it('should move the a and b to the output with the selected option last', () => {
  //         const flow = createFlow({ uid: 'test' })
  //         const items = [
  //           { name: 'The Matrix', uid: '1', seed: 90 },
  //           { name: 'The Matrix Reloaded', uid: 2, seed: 30 },
  //           { name: 'The Matrix Revolutions', uid: '3', seed: 40 },
  //           { name: 'The Matrix Resurrections', uid: '4', seed: 50 }
  //         ]
  //         const importedFlow = importItems({ flow, items })
  //         const choice = getChoice({ flow: importedFlow })
  //         if (choice == null) {
  //           throw new Error('Choice should be defined')
  //         }
  //         const choiceOperation = importedFlow.operations[choice.operationId]
  //         if (choiceOperation == null) {
  //           throw new Error('Choice operation should be defined')
  //         }
  //         expect(choiceOperation.ascend).toBe(true)
  //         expect(choiceOperation.better).toBe(items.length - 1)
  //         const chosenFlow = chooseOption({ flow: importedFlow, option: choice.aItemId })
  //         const operation = chosenFlow.operations[choice.operationId]
  //         expect(operation.output).toEqual([choice.bItemId, choice.aItemId])
  //       })
  //     })
  //     describe('if the operation better is more than one less than the length of b', () => {
  //       it('should increment better by one', () => {
  //         const flow = createFlow({ uid: 'test' })
  //         const items = [
  //           { name: 'The Matrix', uid: '1', seed: 90 },
  //           { name: 'The Matrix Reloaded', uid: 2, seed: 30 },
  //           { name: 'The Matrix Revolutions', uid: '3', seed: 40 },
  //           { name: 'The Matrix Resurrections', uid: '4', seed: 50 },
  //           { name: 'The Animatrix', uid: '5', seed: 60 }
  //         ]
  //         const importedFlow = importItems({ flow, items })
  //         const choice = getChoice({ flow: importedFlow })
  //         if (choice == null) {
  //           throw new Error('Choice should be defined')
  //         }
  //         const choiceOperation = importedFlow.operations[choice.operationId]
  //         if (choiceOperation == null) {
  //           throw new Error('Choice operation should be defined')
  //         }
  //         expect(choiceOperation.ascend).toBe(true)
  //         expect(choiceOperation.better).toBe(0)
  //         const chosenFlow = chooseOption({ flow: importedFlow, option: choice.aItemId })
  //         const chosenOperation = chosenFlow.operations[choice.operationId]
  //         expect(chosenOperation.better).toBe(1)
  //       })
  //     })
  //   })
  // })

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
})
