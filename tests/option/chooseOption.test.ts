import { chooseOption, createFlow, flowSchema, isInputOperation, isOutputOperation } from '../../src'
import getVerifiedChoice from '../choice/getVerifiedChoice'
import createThreeFlow from '../flow/createThreeFlow'
import createTwoFlow from '../flow/createTwoFlow'
import insertOperation from '../operation/insertOperation'

describe('chooseOption', () => {
  it('should take a flow and an option and return a new flow', () => {
    const flow = createThreeFlow()
    const choice = getVerifiedChoice({ flow })
    const chosenFlow = chooseOption({ flow, option: choice.aItem })
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

  it("should throw an error if the choice operation's better is greater than the length of b minus 1", () => {
    const flow = createFlow({ uid: 'test' })
    const insertedFlow = insertOperation({
      aInput: ['original', 'reloaded'],
      bInput: ['revolutions'],
      flow,
      output: []
    })
    const choice = getVerifiedChoice({ flow: insertedFlow })
    const choiceOperation = insertedFlow.operations[choice.operation]
    choiceOperation.better = 1
    expect(() => {
      chooseOption({
        flow: insertedFlow, option: choice.aItem
      })
    })
      .toThrow('Better is greater than the length of b minus 1')
  })

  describe('if a is chosen', () => {
    describe('if there is one b', () => {
      it('should move both to the output with b first', () => {
        const flow = createFlow({ uid: 'test' })
        const insertedFlow = insertOperation({
          aInput: ['original', 'reloaded'],
          bInput: ['revolutions'],
          flow,
          output: []
        })
        const choice = getVerifiedChoice({ flow: insertedFlow })
        const choiceOperation = insertedFlow.operations[choice.operation]
        expect(choiceOperation.bInput.length).toBe(1)
        const chosenFlow = chooseOption({
          flow: insertedFlow, option: choice.aItem
        })
        const chosenOperation = chosenFlow.operations[
          choice.operation
        ]
        expect(chosenOperation.output).toEqual([
          'revolutions', 'original', 'reloaded'
        ])
      })
    })

    describe('if there are multiple b', () => {
      describe('if the operation is ascend', () => {
        describe('if better is 0', () => {
          it('should increase better to the length of b minus 1', () => {
            const flow = createFlow({ uid: 'test' })
            const insertedFlow = insertOperation({
              aInput: ['original'],
              bInput: ['reloaded', 'revolutions', 'resurrections', 'animatrix', 'revisited'],
              flow,
              output: []
            })
            const choice = getVerifiedChoice({ flow: insertedFlow })
            const choiceOperation = insertedFlow.operations[choice.operation]
            expect(choiceOperation.better).toBe(0)
            expect(choiceOperation.aInput.length).toBe(1)
            expect(choiceOperation.bInput.length).toBe(5)
            expect(choiceOperation.output.length).toBe(0)
            const chosenFlow = chooseOption({ flow: insertedFlow, option: choice.aItem })
            const chosenOperation = chosenFlow.operations[choice.operation]
            expect(chosenOperation.better).toBe(4)
            expect(chosenOperation.aInput.length).toBe(1)
            expect(chosenOperation.bInput.length).toBe(5)
            expect(chosenOperation.output.length).toBe(0)
          })
        })

        describe('if better is equal to the length of b minus 1', () => {
          it('should add both to the output with b first', () => {
            const flow = createFlow({ uid: 'test' })
            const insertedFlow = insertOperation({
              aInput: ['original', 'reloaded'],
              bInput: ['revolutions', 'resurrections', 'animatrix', 'revisited'],
              flow,
              output: []
            })
            const choice = getVerifiedChoice({ flow: insertedFlow })
            const choiceOperation = insertedFlow.operations[choice.operation]
            choiceOperation.better = 3
            const chosenFlow = chooseOption({
              flow: insertedFlow, option: choice.aItem
            })
            const chosenOperation = chosenFlow.operations[choice.operation]
            expect(chosenOperation.aInput).toEqual([])
            expect(chosenOperation.bInput).toEqual([])
            expect(chosenOperation.output).toEqual(['revolutions', 'resurrections', 'animatrix', 'revisited', 'original', 'reloaded'])
          })
        })

        describe('if better is less than the length of b minus 1 but greater than 0', () => {
          it('should increase better by half the difference between better and the length of b minus 1 rounded up', () => {
            const flow = createFlow({ uid: 'test' })
            const insertedFlow = insertOperation({
              aInput: ['original', 'reloaded'],
              bInput: ['revolutions', 'resurrections', 'animatrix', 'revisited'],
              flow,
              output: []
            })
            const choice = getVerifiedChoice({ flow: insertedFlow })
            const choiceOperation = insertedFlow.operations[choice.operation]
            choiceOperation.better = 2
            const chosenFlow = chooseOption({
              flow: insertedFlow, option: choice.aItem
            })
            const chosenOperation = chosenFlow.operations[choice.operation]
            const maximum = 3
            const difference = maximum - choiceOperation.better
            const half = difference / 2
            const rounded = Math.ceil(half)
            const increased = choiceOperation.better + rounded
            expect(increased).toBe(3)
            expect(chosenOperation.better).toBe(increased)
          })
        })
      })
    })
  })

  describe('if b is chosen', () => {
    describe('if better is 0', () => {
      it('should add both to the output with a first', () => {
        const flow = createFlow({ uid: 'test' })
        const insertedFlow = insertOperation({
          aInput: ['original', 'reloaded'],
          bInput: ['revolutions', 'resurrections'],
          flow,
          output: []
        })
        const choice = getVerifiedChoice({ flow: insertedFlow })
        const choiceOperation = insertedFlow.operations[
          choice.operation
        ]
        expect(choiceOperation.better).toBe(0)
        const chosenFlow = chooseOption({
          flow: insertedFlow, option: choice.bItem
        })
        const chosenOperation = chosenFlow.operations[
          choice.operation
        ]
        expect(chosenOperation.aInput).toEqual([])
        expect(chosenOperation.bInput).toEqual([])
        expect(chosenOperation.output).toEqual(['original', 'reloaded', 'revolutions', 'resurrections'])
      })
    })

    describe('if better is greater than zero', () => {
      it('should decrease better by half rounded up', () => {
        const flow = createFlow({ uid: 'test' })
        const insertedFlow = insertOperation({
          aInput: ['original', 'reloaded'],
          bInput: ['revolutions', 'resurrections', 'animatrix', 'revisited'],
          flow,
          output: []
        })
        const choice = getVerifiedChoice({ flow: insertedFlow })
        const choiceOperation = insertedFlow.operations[choice.operation]
        choiceOperation.better = 3
        const chosenFlow = chooseOption({
          flow: insertedFlow, option: choice.bItem
        })
        const chosenOperation = chosenFlow.operations[
          choice.operation
        ]
        const half = choiceOperation.better / 2
        const rounded = Math.ceil(half)
        const decreased = choiceOperation.better - rounded
        expect(decreased).toBe(1)
        expect(chosenOperation.better).toBe(decreased)
      })
    })
  })

  it('should take a flow and an option and return a new flow', () => {
    const flow = createThreeFlow()
    const choice = getVerifiedChoice({ flow })
    const chosenFlow = chooseOption({ flow, option: choice.aItem })
    const parsed = flowSchema.parse(chosenFlow)
    expect(parsed).toEqual(chosenFlow)
  })

  describe('if there is only one operation with one a and b', () => {
    it('should move them both to the output with the selected option last', () => {
      const flow = createTwoFlow()
      const operations = Object.values(flow.operations)
      expect(operations.length).toBe(1)
      expect(operations[0].aInput.length).toBe(1)
      expect(operations[0].bInput.length).toBe(1)
      const choice = getVerifiedChoice({ flow })
      const chosenFlow = chooseOption({ flow, option: choice.aItem })
      const chosenOperation = chosenFlow.operations[choice.operation]
      expect(chosenOperation.output).toEqual([
        choice.bItem, choice.aItem
      ])
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
        const chosenFlow = chooseOption({ flow: insertedFlow, option: choice.aItem })
        const chosenOperation = chosenFlow.operations[choice.operation]
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
        const chosenFlow = chooseOption({
          flow: insertedFlow, option: choice.bItem
        })
        const chosenOperation = chosenFlow.operations[choice.operation]
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
      const chosenFlow = chooseOption({ flow, option: choice.aItem })
      const chosenOperations = Object.values(chosenFlow.operations)
      expect(chosenOperations.length).toBe(1)
      const inputted = isInputOperation({ operation: chosenOperations[0] })
      expect(inputted).toBe(true)
      if (inputEarlier) {
        expect(chosenOperations[0].aInput)
          .toEqual([choice.bItem, choice.aItem])
        expect(chosenOperations[0].bInput)
          .toEqual(outputOperations[0].output)
      } else {
        expect(chosenOperations[0].aInput)
          .toEqual(outputOperations[0].output)
        expect(chosenOperations[0].bInput)
          .toEqual([choice.bItem, choice.aItem])
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
        flow: insertedFlow2, option: choice.aItem
      })
      const chosenOperation = chosenFlow.operations[choice.operation]
      expect(chosenOperation.aInput).toEqual([])
      expect(chosenOperation.bInput).toEqual([])
      expect(chosenOperation.output).toEqual([
        choice.bItem, choice.aItem
      ])
    })
  })

  it('should move all inputs to the output with a first if b is chosen when the choice operation has one a', () => {
    const flow = createFlow({ uid: 'test' })
    const insertedFlow = insertOperation({
      aInput: ['original'],
      bInput: ['reloaded', 'revolutions'],
      flow,
      output: []
    })
    const choice = getVerifiedChoice({ flow: insertedFlow })
    const chosenFlow = chooseOption({
      flow: insertedFlow, option: choice.bItem
    })
    const chosenOperation = chosenFlow.operations[choice.operation]
    expect(chosenOperation.aInput).toEqual([])
    expect(chosenOperation.bInput).toEqual([])
    expect(chosenOperation.output).toEqual([
      'original', 'reloaded', 'revolutions'
    ])
  })

  it('should increase better by half the length of b rounded if a is chosen when the choice operation has multiple b and better 0', () => {
    const flow = createFlow({ uid: 'test' })
    const insertedFlow = insertOperation({
      aInput: ['a'],
      bInput: ['b', 'c', 'd'],
      flow,
      output: []
    })
    const choice = getVerifiedChoice({ flow: insertedFlow })
    const initialOperation = insertedFlow.operations[choice.operation]
    expect(initialOperation.better).toBe(0)
    const chosenFlow = chooseOption({
      flow: insertedFlow, option: choice.aItem
    })
    const chosenOperation = chosenFlow.operations[choice.operation]
    expect(chosenOperation.better).toBe(1)
    expect(chosenOperation.aInput).toEqual(['a'])
    expect(chosenOperation.bInput).toEqual(['b', 'c'])
    expect(chosenOperation.output).toEqual([])
  })

  it('should move the first a to the end of the output and swap a and b if b is chosen when the choice operation has multiple a and multiple b', () => {
    const flow = createFlow({ uid: 'test' })
    const insertedFlow = insertOperation({
      aInput: ['original', 'reloaded'],
      bInput: ['revolutions', 'resurrections'],
      flow,
      output: ['animatrix']
    })
    const choice = getVerifiedChoice({ flow: insertedFlow })
    const chosenFlow = chooseOption({
      flow: insertedFlow, option: choice.bItem
    })
    const chosenOperation = chosenFlow.operations[choice.operation]
    expect(chosenOperation.aInput).toEqual(['revolutions', 'resurrections'])
    expect(chosenOperation.bInput).toEqual(['reloaded'])
    expect(chosenOperation.output).toEqual(['animatrix', 'original'])
  })
})
