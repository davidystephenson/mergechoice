import { chooseOption, combineOperations, createFlow } from '../../src'
import chooseOperationOption from '../../src/chooseOperationOption'
import getVerifiedChoice from '../choice/getVerifiedChoice'

describe('chooseOption', () => {
  it('should choose the operation option', () => {
    const flow = createFlow({ uid: 'matrix' })
    flow.items = {
      original: { label: 'original', seed: 0, uid: 'original' },
      reloaded: { label: 'reloaded', seed: 1, uid: 'reloaded' },
      revolutions: { label: 'revolutions', seed: 2, uid: 'revolutions' }
    }
    flow.operations = {
      operation1: {
        uid: 'operation1',
        queue: ['original'],
        better: undefined,
        catalog: ['reloaded', 'revolutions'],
        output: []
      }
    }
    const choice = getVerifiedChoice({ flow })
    const operationChosenFlow = chooseOperationOption({ flow, option: choice.queue })
    const chosenFlow = chooseOption({ flow, option: choice.queue })
    expect(chosenFlow).toEqual(operationChosenFlow)
  })

  it('should combine chosen operations', () => {
    const flow = createFlow({ uid: 'matrix' })
    flow.items = {
      original: { label: 'original', seed: 0, uid: 'original' },
      reloaded: { label: 'reloaded', seed: 1, uid: 'reloaded' },
      revolutions: { label: 'revolutions', seed: 2, uid: 'revolutions' },
      animatrix: { label: 'animatrix', seed: 3, uid: 'animatrix' },
      revisited: { label: 'revisited', seed: 4, uid: 'revisited' }
    }
    flow.operations = {
      operation1: {
        uid: 'operation1',
        queue: ['original'],
        catalog: ['reloaded', 'revolutions'],
        output: []
      },
      operation2: {
        uid: 'operation2',
        queue: [],
        catalog: [],
        output: ['animatrix', 'revisited']
      }
    }
    const choice = getVerifiedChoice({ flow })
    const operationChosenFlow = chooseOperationOption({ flow, option: choice.queue })
    const combinedFlow = combineOperations({ flow: operationChosenFlow })
    const chosenFlow = chooseOption({ flow, option: choice.queue })
    expect(chosenFlow).toEqual(combinedFlow)
  })
})
