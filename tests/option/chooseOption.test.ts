import { chooseOption, combineOperations, createFlow } from '../../src'
import chooseOperationOption from '../../src/chooseOperationOption'
import getVerifiedChoice from '../choice/getVerifiedChoice'

describe('chooseOption', () => {
  it('should choose the operation option', () => {
    const flow = createFlow({ uid: 'matrix' })
    flow.items = {
      original: { name: 'original', seed: 0, uid: 'original' },
      reloaded: { name: 'reloaded', seed: 1, uid: 'reloaded' },
      revolutions: { name: 'revolutions', seed: 2, uid: 'revolutions' }
    }
    flow.operations = {
      operation1: {
        uid: 'operation1',
        aInput: ['original'],
        better: undefined,
        bInput: ['reloaded', 'revolutions'],
        output: []
      }
    }
    const choice = getVerifiedChoice({ flow })
    const operationChosenFlow = chooseOperationOption({ flow, option: choice.aItemUid })
    const chosenFlow = chooseOption({ flow, option: choice.aItemUid })
    expect(chosenFlow).toEqual(operationChosenFlow)
  })

  it('should combine chosen operations', () => {
    const flow = createFlow({ uid: 'matrix' })
    flow.items = {
      original: { name: 'original', seed: 0, uid: 'original' },
      reloaded: { name: 'reloaded', seed: 1, uid: 'reloaded' },
      revolutions: { name: 'revolutions', seed: 2, uid: 'revolutions' },
      animatrix: { name: 'animatrix', seed: 3, uid: 'animatrix' },
      revisited: { name: 'revisited', seed: 4, uid: 'revisited' }
    }
    flow.operations = {
      operation1: {
        uid: 'operation1',
        aInput: ['original'],
        bInput: ['reloaded', 'revolutions'],
        output: []
      },
      operation2: {
        uid: 'operation2',
        aInput: [],
        bInput: [],
        output: ['animatrix', 'revisited']
      }
    }
    const choice = getVerifiedChoice({ flow })
    const operationChosenFlow = chooseOperationOption({ flow, option: choice.aItemUid })
    const combinedFlow = combineOperations({ flow: operationChosenFlow })
    const chosenFlow = chooseOption({ flow, option: choice.aItemUid })
    expect(chosenFlow).toEqual(combinedFlow)
  })
})
