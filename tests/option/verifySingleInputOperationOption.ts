import { importItems, getChoice, chooseOption, Item, createFlow } from '../../src'

export default function verifySingleInputOperationOption (props: {
  items: Item[]
}): void {
  const flow = createFlow({ uid: 'test' })
  const importedFlow = importItems({ flow, items: props.items })
  const choice = getChoice({ flow: importedFlow })
  if (choice == null) {
    throw new Error('Choice should be defined')
  }
  const operation = importedFlow.operations[choice.operationId]
  if (operation == null) {
    throw new Error('Operation should be defined')
  }
  expect(operation.aInput.length).toBe(1)
  expect(operation.bInput.length).toBe(1)
  expect(operation.output.length).toBe(0)
  expect(() => chooseOption({ flow: importedFlow, option: operation.aInput[0] })).not.toThrow()
}
