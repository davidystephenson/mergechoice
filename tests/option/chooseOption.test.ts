import { chooseOption, combineOperations, createFlow, getChoice, importItems, isFlowComplete } from '../../src'
import verifySingleInputOperationOption from './verifySingleInputOperationOption'

describe('chooseOption', () => {
  it('should take a flow and an option and return a new flow', () => {
    const flow = createFlow({ uid: 'test' })
    const items = [
      { name: 'The Matrix', uid: '1', seed: 90 },
      { name: 'The Matrix Reloaded', uid: 2, seed: 30 },
      { name: 'The Matrix Revolutions', uid: '3', seed: 40 }
    ]
    const importedFlow = importItems({ flow, items })
    const choice = getChoice({ flow: importedFlow })
    if (choice == null) {
      throw new Error('Choice should be defined')
    }
    const chosenFlow = chooseOption({ flow: importedFlow, option: choice.aItemId })
    expect(chosenFlow).toBeDefined()
  })

  it('should throw an error if the flow has no choice', () => {
    const flowWithoutChoice = createFlow({ uid: 'test' })
    expect(() => chooseOption({ flow: flowWithoutChoice, option: '1' }))
      .toThrow('Flow has no choice')
  })

  it('should throw an error if the option is not the a UID or b UID', () => {
    expect(() => {
      const flow = createFlow({ uid: 'test' })
      const items = [
        { name: 'The Matrix', uid: '1', seed: 90 },
        { name: 'The Matrix Reloaded', uid: 2, seed: 30 },
        { name: 'The Matrix Revolutions', uid: '3', seed: 40 }
      ]

      const importedFlow = importItems({ flow, items })
      chooseOption({ flow: importedFlow, option: 'A-DIFFERENT-UID' })
    }).toThrow('Option is not in the choice')
  })

  describe('if the operation has only one a and b', () => {
    it('should move them both to the output with the selected option last', () => {
      const flow = createFlow({ uid: 'test' })
      const items = [
        { name: 'The Matrix', uid: '1', seed: 90 },
        { name: 'The Matrix Reloaded', uid: 2, seed: 30 },
        { name: 'The Matrix Revolutions', uid: '3', seed: 40 }
      ]
      const importedFlow = importItems({ flow, items })
      const choice = getChoice({ flow: importedFlow })
      if (choice == null) {
        throw new Error('Choice should be defined')
      }
      const chosenFlow = chooseOption({ flow: importedFlow, option: choice.aItemId })
      const operation = chosenFlow.operations[choice.operationId]
      expect(operation.output).toEqual([choice.bItemId, choice.aItemId])
    })
  })

  describe('if the operation has only one a and two b', () => {
    describe('if the operation is ascending', () => {
      describe('if the operation better is one less than the length of b', () => {
        it('should move the a and b to the output with the selected option last', () => {
          const flow = createFlow({ uid: 'test' })
          const items = [
            { name: 'The Matrix', uid: '1', seed: 90 },
            { name: 'The Matrix Reloaded', uid: 2, seed: 30 },
            { name: 'The Matrix Revolutions', uid: '3', seed: 40 },
            { name: 'The Matrix Resurrections', uid: '4', seed: 50 }
          ]
          const importedFlow = importItems({ flow, items })
          const choice = getChoice({ flow: importedFlow })
          if (choice == null) {
            throw new Error('Choice should be defined')
          }
          const choiceOperation = importedFlow.operations[choice.operationId]
          if (choiceOperation == null) {
            throw new Error('Choice operation should be defined')
          }
          expect(choiceOperation.ascend).toBe(true)
          expect(choiceOperation.better).toBe(items.length - 1)
          const chosenFlow = chooseOption({ flow: importedFlow, option: choice.aItemId })
          const operation = chosenFlow.operations[choice.operationId]
          expect(operation.output).toEqual([choice.bItemId, choice.aItemId])
        })
      })
      describe('if the operation better is more than one less than the length of b', () => {
        it('should increment better by one', () => {
          const flow = createFlow({ uid: 'test' })
          const items = [
            { name: 'The Matrix', uid: '1', seed: 90 },
            { name: 'The Matrix Reloaded', uid: 2, seed: 30 },
            { name: 'The Matrix Revolutions', uid: '3', seed: 40 },
            { name: 'The Matrix Resurrections', uid: '4', seed: 50 },
            { name: 'The Animatrix', uid: '5', seed: 60 }
          ]
          const importedFlow = importItems({ flow, items })
          const choice = getChoice({ flow: importedFlow })
          if (choice == null) {
            throw new Error('Choice should be defined')
          }
          const choiceOperation = importedFlow.operations[choice.operationId]
          if (choiceOperation == null) {
            throw new Error('Choice operation should be defined')
          }
          expect(choiceOperation.ascend).toBe(true)
          expect(choiceOperation.better).toBe(0)
          const chosenFlow = chooseOption({ flow: importedFlow, option: choice.aItemId })
          const chosenOperation = chosenFlow.operations[choice.operationId]
          expect(chosenOperation.better).toBe(1)
        })
      })
    })
  })

  describe('if two items are imported to an empty flow', () => {
    it('should choose from an operation that had only one a and b', () => {
      const items = [
        { name: 'The Matrix', uid: '1', seed: 90 },
        { name: 'The Matrix Reloaded', uid: 2, seed: 30 }
      ]
      verifySingleInputOperationOption({ items })
    })

    it('should create a complete flow', () => {
      const flow = createFlow({ uid: 'test' })
      const items = [
        { name: 'The Matrix', uid: '1', seed: 90 },
        { name: 'The Matrix Reloaded', uid: 2, seed: 30 }
      ]
      const importedFlow = importItems({ flow, items })
      const choice = getChoice({ flow: importedFlow })
      if (choice == null) {
        throw new Error('Choice should be defined')
      }
      const chosenFlow = chooseOption({ flow: importedFlow, option: choice.aItemId })
      const complete = isFlowComplete(chosenFlow)
      expect(complete).toBe(true)
    })
  })

  describe('if three items are imported to an empty flow', () => {
    it('should choose from an operation that had only one a and b', () => {
      const items = [
        { name: 'The Matrix', uid: '1', seed: 90 },
        { name: 'The Matrix Reloaded', uid: 2, seed: 30 },
        { name: 'The Matrix Revolutions', uid: '3', seed: 40 }
      ]
      verifySingleInputOperationOption({ items })
    })

    it('should create an incomplete flow after combining operations', () => {
      const flow = createFlow({ uid: 'test' })
      const items = [
        { name: 'The Matrix', uid: '1', seed: 90 },
        { name: 'The Matrix Reloaded', uid: 2, seed: 30 },
        { name: 'The Matrix Revolutions', uid: '3', seed: 40 }
      ]
      const importedFlow = importItems({ flow, items })
      const choice = getChoice({ flow: importedFlow })
      if (choice == null) {
        throw new Error('Choice should be defined')
      }
      const chosenFlow = chooseOption({ flow: importedFlow, option: choice.aItemId })
      const combinedFlow = combineOperations({ flow: chosenFlow })
      const complete = isFlowComplete(combinedFlow)
      expect(complete).toBe(false)
    })
  })
})
