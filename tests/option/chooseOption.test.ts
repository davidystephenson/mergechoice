import { chooseOption, createFlow, getChoice, importItems } from '../../src'

describe('chooseOption', () => {
  const flow = createFlow({ uid: 'test' })
  const items = [
    { name: 'The Matrix', uid: '1', seed: 90 },
    { name: 'The Matrix Reloaded', uid: 2, seed: 30 },
    { name: 'The Matrix Revolutions', uid: '3', seed: 40 }
  ]

  const importedFlow = importItems({ flow, items })

  it('should take a flow and an option and return a new flow', () => {
    const choice = getChoice({ flow: importedFlow })
    if (choice == null) {
      throw new Error('Choice should be defined')
    }
    const chosenFlow = chooseOption({ flow: importedFlow, option: choice.a })
    expect(chosenFlow).toBeDefined()
  })

  it('should throw an error if the flow has no choice', () => {
    const flowWithoutChoice = createFlow({ uid: 'test' })
    expect(() => chooseOption({ flow: flowWithoutChoice, option: '1' }))
      .toThrow('Flow has no choice')
  })

  it('should throw an error if the option is not the a UID or b UID', () => {
    expect(() => chooseOption({ flow: importedFlow, option: 'A-DIFFERENT-UID' }))
      .toThrow('Option is not in the choice')
  })
})
