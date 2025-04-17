import { createFlow, getOptionIndex, Operation } from '../../src'
import addOperation from '../../src/addOperation'
import createOperation from '../../src/createOperation'
import createThreeFlow from '../flow/createThreeFlow'
import operate from '../../src/operate'
import getVerifiedChoice from '../choice/getVerifiedChoice'
import insertOperation from './insertOperation'
import getInitialOptionIndex from '../../src/getInitialOptionIndex'
import getFloorHalf from '../../src/getFloorHalf'

it('should throw an error if the flow has no choice', () => {
  const flowWithoutChoice = createFlow({ uid: 'test' })
  expect(() => operate({ flow: flowWithoutChoice, option: '1' }))
    .toThrow('Flow has no choice')
})

it('should throw an error if the option is not the a UID or b UID', () => {
  const flow = createThreeFlow()
  expect(() => {
    operate({ flow, option: 'A-DIFFERENT-UID' })
  }).toThrow('Option is not in the choice')
})

// if better is defined

it('should throw an error if better is not a number', () => {
  const flow = createFlow({ uid: 'matrix' })
  const operation = createOperation({
    catalog: ['revolutions', 'resurrections', 'animatrix', 'revisited', 'enter', 'online', 'path', 'awakens'],
    flow,
    queue: ['original', 'reloaded'],
    output: ['comics']
  })
  // @ts-expect-error
  operation.better = 'not a number'
  const addedFlow = addOperation({
    flow,
    operation
  })
  expect(() => operate({ flow: addedFlow, option: 'original' })).toThrow()
})
it('should throw an error if better is less than 1', () => {
  const flow = createFlow({ uid: 'matrix' })
  const operation = createOperation({
    catalog: ['revolutions', 'resurrections', 'animatrix', 'revisited', 'enter', 'online', 'path', 'awakens'],
    flow,
    queue: ['original', 'reloaded'],
    output: ['comics']
  })
  operation.better = 0
  const addedFlow = addOperation({
    flow,
    operation
  })
  expect(() => operate({ flow: addedFlow, option: 'original' })).toThrow()
})
it('should throw an error if better is greater than the initial option index', () => {
  const flow = createFlow({ uid: 'matrix' })
  const operation = createOperation({
    catalog: ['revolutions', 'resurrections', 'animatrix', 'revisited', 'enter', 'online', 'path', 'awakens'],
    flow,
    queue: ['original', 'reloaded'],
    output: ['comics']
  })
  const initial = getInitialOptionIndex({ operation })
  expect(initial).toEqual(3)
  operation.better = 4
  const addedFlow = addOperation({
    flow,
    operation
  })
  expect(() => operate({ flow: addedFlow, option: 'original' })).toThrow()
})

it('should throw an error if queue is longer than catalog', () => {
  const flow = createFlow({ uid: 'test' })
  const operation: Operation = {
    catalog: ['empire'],
    queue: ['hope', 'jedi'],
    output: ['phantom'],
    uid: 'operation1'
  }
  const addedFlow = addOperation({
    flow,
    operation
  })
  expect(() => {
    return operate({ flow: addedFlow, option: 'hope' })
  }).toThrow()
})

describe('if catalog is two or less long', () => {
  it('should throw an error if better is defined', () => {
    const flow = createFlow({ uid: 'test' })
    const operation = createOperation({
      queue: ['hope'],
      catalog: ['empire'],
      flow,
      output: ['jedi']
    })
    operation.better = 0
    const addedFlow = addOperation({
      flow,
      operation
    })
    expect(() => {
      return operate({
        flow: addedFlow, option: 'hope'
      })
    }).toThrow()
  })
})

describe('if catalog is chosen', () => {
  it('should not switch queue and catalog', () => {
    const flow = createFlow({ uid: 'matrix' })
    const insertedFlow = insertOperation({
      catalog: ['original', 'reloaded', 'revolutions'],
      flow,
      output: ['resurrections'],
      queue: ['revisited', 'animatrix', 'comics']
    })
    const choice = getVerifiedChoice({ flow: insertedFlow })
    const operation = insertedFlow.operations[choice.operation]
    const initial = getInitialOptionIndex({ operation })
    expect(initial).toEqual(1)
    const optionIndex = getOptionIndex({ operation })
    expect(optionIndex).toEqual(initial)
    const item = operation.catalog[initial]
    expect(item).toEqual('reloaded')
    expect(item).toEqual(choice.catalog)
    const chosenFlow = operate({
      flow: insertedFlow,
      option: choice.catalog
    })
    const chosenOperation = chosenFlow.operations[choice.operation]
    expect(chosenOperation.better).toEqual(initial)
    expect(chosenOperation.catalog).toEqual(['original', 'reloaded', 'revolutions'])
    expect(chosenOperation.output).toEqual(['resurrections'])
    expect(chosenOperation.queue).toEqual(['revisited', 'animatrix', 'comics'])
  })
  describe('if the option index is 0', () => {
    it('should reset the better value to undefined', () => {
      const flow = createFlow({ uid: 'matrix' })
      const operation = createOperation({
        catalog: ['original', 'reloaded'],
        flow,
        output: ['animatrix'],
        queue: ['resurrections']
      })
      const addedFlow = addOperation({
        flow,
        operation
      })
      const choice = getVerifiedChoice({ flow: addedFlow })
      const choiceOperation = addedFlow.operations[choice.operation]
      const index = getOptionIndex({ operation: choiceOperation })
      expect(index).toEqual(0)
      const chosenFlow = operate({
        flow: addedFlow,
        option: choice.catalog
      })
      const chosenOperation = chosenFlow.operations[choice.operation]
      expect(chosenOperation.better).toEqual(undefined)
    })
    describe('if the queue is 1 long', () => {
      it('should move the queue item to the end of the output followed by the full catalog', () => {
        const flow = createFlow({ uid: 'matrix' })
        const operation = createOperation({
          catalog: ['original', 'reloaded'],
          flow,
          output: ['animatrix'],
          queue: ['resurrections']
        })
        const addedFlow = addOperation({
          flow,
          operation
        })
        const choice = getVerifiedChoice({ flow: addedFlow })
        const choiceOperation = addedFlow.operations[choice.operation]
        const index = getOptionIndex({ operation: choiceOperation })
        expect(index).toEqual(0)
        const chosenFlow = operate({
          flow: addedFlow,
          option: choice.catalog
        })
        const chosenOperation = chosenFlow.operations[choice.operation]
        expect(chosenOperation.catalog).toEqual([])
        expect(chosenOperation.output).toEqual(['animatrix', 'resurrections', 'original', 'reloaded'])
        expect(chosenOperation.queue).toEqual([])
      })
    })
    describe('if the queue is more than 1 long', () => {
      it('should move the first queue item to the end of the output', () => {
        const flow = createFlow({ uid: 'matrix' })
        const operation = createOperation({
          catalog: ['original', 'reloaded', 'revolutions'],
          flow,
          output: ['animatrix'],
          queue: ['comics', 'revisited']
        })
        operation.better = 1
        const addedFlow = addOperation({ flow, operation })
        const choice = getVerifiedChoice({ flow: addedFlow })
        const choiceOperation = addedFlow.operations[choice.operation]
        const index = getOptionIndex({ operation: choiceOperation })
        expect(index).toEqual(0)
        const chosenFlow = operate({
          flow: addedFlow,
          option: choice.catalog
        })
        const chosenOperation = chosenFlow.operations[choice.operation]
        expect(chosenOperation.catalog).toEqual(['original', 'reloaded', 'revolutions'])
        expect(chosenOperation.output).toEqual(['animatrix', 'comics'])
        expect(chosenOperation.queue).toEqual(['revisited'])
      })
    })
  })
  describe('if the option index is greater than 0', () => {
    describe('if better is undefined', () => {
      it('should set better to the option index', () => {
        const flow = createFlow({ uid: 'matrix' })
        const insertedFlow = insertOperation({
          catalog: ['revolutions', 'resurrections', 'animatrix', 'revisited'],
          flow,
          output: ['comics'],
          queue: ['original', 'reloaded']
        })
        const choice = getVerifiedChoice({ flow: insertedFlow })
        const operation = insertedFlow.operations[choice.operation]
        const initial = getInitialOptionIndex({ operation })
        expect(initial).toEqual(1)
        const optionIndex = getOptionIndex({ operation })
        expect(optionIndex).toEqual(initial)
        const item = operation.catalog[initial]
        expect(item).toEqual('resurrections')
        expect(item).toEqual(choice.catalog)
        const chosenFlow = operate({
          flow: insertedFlow,
          option: choice.catalog
        })
        const chosenOperation = chosenFlow.operations[choice.operation]
        expect(chosenOperation.better).toEqual(initial)
        expect(chosenOperation.catalog).toEqual(['revolutions', 'resurrections', 'animatrix', 'revisited'])
        expect(chosenOperation.output).toEqual(['comics'])
        expect(chosenOperation.queue).toEqual(['original', 'reloaded'])
      })
    })

    describe('if better is defined', () => {
      it('should set better to the floor half of better', () => {
        const flow = createFlow({ uid: 'matrix' })
        const operation = createOperation({
          catalog: ['revolutions', 'resurrections', 'animatrix', 'revisited', 'enter', 'online', 'path', 'awakens'],
          flow,
          queue: ['original', 'reloaded'],
          output: ['comics']
        })
        operation.better = 3
        const addedFlow = addOperation({
          flow,
          operation
        })
        const choice = getVerifiedChoice({ flow: addedFlow })
        const floorHalf = getFloorHalf({ value: operation.better })
        expect(floorHalf).toEqual(1)
        const chosenFlow = operate({
          flow: addedFlow,
          option: choice.catalog
        })
        const chosenOperation = chosenFlow.operations[choice.operation]
        expect(chosenOperation.better).toEqual(floorHalf)
      })
    })
  })
})

describe('if queue is chosen', () => {
  describe('if catalog is 1 long', () => {
    it('should move catalog to the end of the output followed by queue', () => {
      const flow = createFlow({ uid: 'star-wars' })
      const operation = createOperation({
        catalog: ['hope'],
        flow,
        output: ['empire'],
        queue: ['jedi']
      })
      const addedFlow = addOperation({
        flow,
        operation
      })
      const choice = getVerifiedChoice({ flow: addedFlow })
      expect(choice.catalog).toEqual('hope')
      expect(choice.queue).toEqual('jedi')
      const chosenFlow = operate({
        flow: addedFlow, option: choice.queue
      })
      const chosenOperation = chosenFlow.operations[operation.uid]
      expect(chosenOperation.queue).toEqual([])
      expect(chosenOperation.catalog).toEqual([])
      expect(chosenOperation.output).toEqual(['empire', 'hope', 'jedi'])
    })
    it('should set better to undefined', () => {
      const flow = createFlow({ uid: 'matrix' })
      const operation = createOperation({
        catalog: ['revolutions', 'resurrections', 'animatrix', 'revisited', 'enter', 'online', 'path', 'awakens'],
        flow,
        output: ['comics'],
        queue: ['original', 'reloaded']
      })
      operation.better = 3
      const addedFlow = addOperation({
        flow,
        operation
      })
      const choice = getVerifiedChoice({ flow: addedFlow })
      expect(choice.catalog).toEqual('resurrections')
      expect(choice.queue).toEqual('original')
      const chosenFlow = operate({
        flow: addedFlow,
        option: choice.queue
      })
      const chosenOperation = chosenFlow.operations[choice.operation]
      expect(chosenOperation.better).toEqual(undefined)
    })
  })

  describe('if catalog is more than 1 long', () => {
    // if the difference between better and the option index is 1
    //   it should move the catalog items through the option index to the end of the output followed by the first queue item
    //   it should set better to undefined
    // if the difference between better and the option index is greater than 1
    //   it should move the catalog items through the option index to the end of the output
    //   it should set better to the floor half of better - 1
    describe('if better is 1', () => {
      it('should move the first catalog item to the end of the output followed by the first queue item', () => {
        const flow = createFlow({ uid: 'star-wars' })
        const operation = createOperation({
          catalog: ['hope', 'empire', 'jedi', 'phantom'],
          flow,
          output: ['clones'],
          queue: ['revenge', 'awakens']
        })
        operation.better = 1
        const addedFlow = addOperation({
          flow,
          operation
        })
        const choice = getVerifiedChoice({ flow: addedFlow })
        expect(choice.catalog).toEqual('empire')
        expect(choice.queue).toEqual('revenge')
        const chosenFlow = operate({
          flow: addedFlow, option: choice.queue
        })
        const chosenOperation = chosenFlow.operations[choice.operation]
        expect(chosenOperation.catalog).toEqual(['empire', 'jedi', 'phantom'])
        expect(chosenOperation.output).toEqual(['clones', 'hope', 'revenge'])
        expect(chosenOperation.queue).toEqual(['awakens'])
      })
    })
    describe('if better is not 1', () => {
      it('should move catalog through the option index to the end of the output', () => {
        const flow = createFlow({ uid: 'star-wars' })
        const operation = createOperation({
          catalog: ['hope', 'empire', 'jedi', 'phantom'],
          flow,
          output: ['clones'],
          queue: ['revenge']
        })
        const addedFlow = addOperation({
          flow,
          operation
        })
        const choice = getVerifiedChoice({ flow: addedFlow })
        expect(choice.catalog).toEqual('empire')
        expect(choice.queue).toEqual('revenge')
        const choiceOperation = addedFlow.operations[choice.operation]
        const index = getOptionIndex({ operation: choiceOperation })
        expect(index).toEqual(1)
        const chosenFlow = operate({
          flow: addedFlow, option: choice.queue
        })
        const chosenOperation = chosenFlow.operations[choice.operation]
        expect(chosenOperation.catalog).toEqual(['jedi', 'phantom'])
        expect(chosenOperation.output).toEqual(['clones', 'hope', 'empire'])
        expect(chosenOperation.queue).toEqual(['revenge'])
      })
    })
  })

  describe('if queue is equal or longer than catalog after the items are moved to the output', () => {
    it('should switch queue and catalog', () => {
      const flow = createFlow({ uid: 'matrix' })
      const insertedFlow = insertOperation({
        catalog: ['revolutions', 'resurrections', 'animatrix'],
        flow,
        output: ['comics'],
        queue: ['original']
      })
      const choice = getVerifiedChoice({ flow: insertedFlow })
      expect(choice.queue).toEqual('original')
      expect(choice.catalog).toEqual('resurrections')
      const chosenFlow = operate({
        flow: insertedFlow,
        option: choice.queue
      })
      const chosenOperation = chosenFlow.operations[choice.operation]
      expect(chosenOperation.catalog).toEqual(['original'])
      expect(chosenOperation.output).toEqual(['comics', 'revolutions', 'resurrections'])
      expect(chosenOperation.queue).toEqual(['animatrix'])
    })
  })
})
