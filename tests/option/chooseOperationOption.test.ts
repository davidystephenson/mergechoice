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
        it('should set better to 0', () => {
          const flow = createFlow({ uid: 'test' })
          const insertedFlow = insertOperation({
            aInput: ['hope'],
            bInput: ['empire', 'jedi'],
            flow,
            output: ['phantom']
          })
          const choice = getVerifiedChoice({ flow: insertedFlow })
          const chosenFlow = chooseOperationOption({ flow: insertedFlow, option: choice.aItemUid })
          const chosenOperation = chosenFlow.operations[choice.operationUid]
          expect(chosenOperation.better).toEqual(0)
          expect(chosenOperation.aInput).toEqual(['hope'])
          expect(chosenOperation.bInput).toEqual(['empire', 'jedi'])
          expect(chosenOperation.output).toEqual(['phantom'])
        })
      })

      describe('if better is defined', () => {
        describe('if worse is undefined', () => {
          it('should set better to undefined and move both to the end of the output with b first', () => {
            const flow = createFlow({ uid: 'test' })
            const operation = createOperation({
              aInput: ['hope'],
              bInput: ['empire', 'jedi'],
              flow,
              output: ['phantom']
            })
            operation.better = 0
            const addedFlow = addOperation({
              flow,
              operation
            })
            const chosenFlow = chooseOperationOption({ flow: addedFlow, option: 'A' })
            const chosenOperation = chosenFlow.operations[operation.uid]
            expect(chosenOperation.better).toBeUndefined()
            expect(chosenOperation.aInput).toEqual([])
            expect(chosenOperation.bInput).toEqual([])
            expect(chosenOperation.output).toEqual(['phantom', 'empire', 'jedi', 'hope'])
          })
        })
      })
    })
  })
})
