import { chooseOption, createFlow, importItems } from '../../src'

describe('chooseOption', () => {
  const flow = createFlow({ seed: 'test' })
  const items = [
    { name: 'The Matrix', uuid: '1', seed: 90 },
    { name: 'The Matrix Reloaded', uuid: 2, seed: 30 },
    { name: 'The Matrix Revolutions', uuid: '3', seed: 40 }
  ]
  const itemIds = items.map((item) => item.uuid)

  const importedFlow = importItems({ flow, items })

  it('should take a flow and an option and return a new flow', () => {
    if (importedFlow.choice == null) {
      throw new Error('Choice should be defined')
    }
    const aItemed = itemIds.includes(importedFlow.choice.a)
    expect(aItemed).toBe(true)
    const bItemed = itemIds.includes(importedFlow.choice.b)
    expect(bItemed).toBe(true)

    const chosenFlow = chooseOption({ flow: importedFlow, option: importedFlow.choice.a })
    expect(chosenFlow).toBeDefined()
  })

  it('should throw an error if the option is not the a UUID or b UUID', () => {
    expect(() => chooseOption({ flow: importedFlow, option: 'A-DIFFERENT-UUID' })).toThrow('Option is not the a UUID or b UUID')
  })
})
