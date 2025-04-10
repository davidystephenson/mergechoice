import { createFlow } from '../../src'
import addOperation from '../../src/addOperation'
import createOperation from '../../src/createOperation'
import createThreeFlow from '../flow/createThreeFlow'
import chooseOperationOption from '../../src/chooseOperationOption'
import getVerifiedChoice from '../choice/getVerifiedChoice'
import insertOperation from '../operation/insertOperation'

describe('chooseOperationOption', () => {
  it('should throw an error if the flow has no choice', () => {
    const flowWithoutChoice = createFlow({ uid: 'test' })
    expect(() => chooseOperationOption({ flow: flowWithoutChoice, option: '1' }))
      .toThrow('Flow has no choice')
  })

  it('should throw an error if the option is not the a UID or b UID', () => {
    const flow = createThreeFlow()
    expect(() => {
      chooseOperationOption({ flow, option: 'A-DIFFERENT-UID' })
    }).toThrow('Option is not in the choice')
  })

  describe('if A is chosen', () => {
    describe('if B is 1 long', () => {
      it('should throw an error if better is defined', () => {
        const flow = createFlow({ uid: 'test' })
        const operation = createOperation({
          aInput: ['hope'],
          bInput: ['empire'],
          flow,
          output: ['jedi']
        })
        operation.better = 0
        const addedFlow = addOperation({
          flow,
          operation
        })
        expect(() => chooseOperationOption({ flow: addedFlow, option: 'A' })).toThrow()
      })

      it('should move both to the end of the output with b first', () => {
        const flow = createFlow({ uid: 'test' })
        const operation = createOperation({
          aInput: ['hope'],
          bInput: ['empire'],
          flow,
          output: ['jedi']
        })
        const addedFlow = addOperation({
          flow,
          operation
        })
        const chosenFlow = chooseOperationOption({ flow: addedFlow, option: '' })
        const chosenOperation = chosenFlow.operations[operation.uid]
        expect(chosenOperation.aInput).toEqual([])
        expect(chosenOperation.bInput).toEqual([])
        expect(chosenOperation.output).toEqual(['jedi', 'empire', 'hope'])
      })
    })

    describe('if B is more than 1 long', () => {
      describe('if better is undefined', () => {
        it('should move B elements through the initial option index to the end of the output followed by the first A element', () => {
          const flow = createFlow({ uid: 'matrix' })
          const insertedFlow = insertOperation({
            aInput: ['original', 'reloaded'],
            bInput: ['revolutions', 'resurrections', 'animatrix', 'revisited'],
            flow,
            output: ['comics']
          })
          const choice = getVerifiedChoice({ flow: insertedFlow })
          const chosenFlow = chooseOperationOption({
            flow: insertedFlow,
            option: choice.aItemUid
          })
          const chosenOperation = chosenFlow.operations[choice.operationUid]
          expect(chosenOperation.aInput).toEqual(['reloaded'])
          expect(chosenOperation.bInput).toEqual(['animatrix', 'revisited'])
          expect(chosenOperation.output).toEqual(['comics', 'revolutions', 'resurrections', 'original'])
        })
      })

      describe('if better is defined', () => {
        it('should move B elements before the better index to the end of the output followed by the first A element', () => {
          const flow = createFlow({ uid: 'matrix' })
          const insertedFlow = insertOperation({
            aInput: ['original', 'reloaded'],
            bInput: ['revolutions', 'resurrections', 'animatrix', 'revisited', 'enter', 'online', 'path', 'awakens'],
            flow,
            output: ['comics']
          })
          const choice = getVerifiedChoice({ flow: insertedFlow })
          const operation = insertedFlow.operations[choice.operationUid]
          operation.better = 2
          const chosenFlow = chooseOperationOption({
            flow: insertedFlow,
            option: choice.aItemUid
          })
          const chosenOperation = chosenFlow.operations[choice.operationUid]
          expect(chosenOperation.aInput).toEqual(['reloaded'])
          expect(chosenOperation.bInput).toEqual(['animatrix', 'revisited', 'enter', 'online', 'path', 'awakens'])
          expect(chosenOperation.output).toEqual(['comics', 'revolutions', 'resurrections', 'original'])
        })
      })

      describe('if A is equal or longer than B after the items are moved to the output', () => {
        it('should switch A and B', () => {
          const flow = createFlow({ uid: 'matrix' })
          const insertedFlow = insertOperation({
            aInput: ['original', 'reloaded'],
            bInput: ['revolutions', 'resurrections', 'animatrix'],
            flow,
            output: ['comics']
          })
          const choice = getVerifiedChoice({ flow: insertedFlow })
          expect(choice.aItemUid).toEqual('original')
          expect(choice.bItemUid).toEqual('resurrections')
          const chosenFlow = chooseOperationOption({
            flow: insertedFlow,
            option: choice.aItemUid
          })
          const chosenOperation = chosenFlow.operations[choice.operationUid]
          expect(chosenOperation.aInput).toEqual(['animatrix'])
          expect(chosenOperation.bInput).toEqual(['reloaded'])
          expect(chosenOperation.output).toEqual(['comics', 'revolutions', 'resurrections', 'original'])
        })
      })
    })
  })
})
