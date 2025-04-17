import { Flow } from './flowTypes'
import getChoice from './getChoice'
import getFloorHalf from './getFloorHalf'
import getOptionIndex from './getOptionIndex'

export default function operate (props: {
  flow: Flow
  option: string
}): Flow {
  const choice = getChoice({ flow: props.flow })
  if (choice == null) {
    throw new Error('Flow has no choice')
  }

  const operation = props.flow.operations[choice.operation]
  if (operation.queue.length > operation.catalog.length) {
    throw new Error('Queue cannot be longer than catalog')
  }

  if (operation.catalog.length <= 2 && operation.better != null) {
    throw new Error('Better cannot be defined when catalog is two or less long')
  }

  const optionIndex = getOptionIndex({ operation })
  const catalogSelected = props.option === choice.catalog
  const queueSelected = props.option === choice.queue

  if (!catalogSelected && !queueSelected) {
    throw new Error('Option is not in the choice')
  }

  const newOperation = { ...operation }

  if (catalogSelected) {
    if (optionIndex === 0) {
      newOperation.better = undefined
      if (operation.queue.length === 1) {
        newOperation.output = [
          ...operation.output,
          operation.queue[0],
          ...operation.catalog
        ]
        newOperation.catalog = []
        newOperation.queue = []
      } else {
        newOperation.output = [
          ...operation.output,
          operation.queue[0]
        ]
        newOperation.queue = operation.queue.slice(1)
      }
    } else {
      if (operation.better == null) {
        newOperation.better = optionIndex
      } else {
        newOperation.better = getFloorHalf({ value: operation.better })
      }
    }
  } else {
    newOperation.better = undefined
    if (operation.catalog.length === 1) {
      newOperation.output = [
        ...operation.output,
        operation.catalog[0],
        operation.queue[0]
      ]
      newOperation.catalog = []
      newOperation.queue = operation.queue.slice(1)
    } else {
      if (operation.better === 1) {
        newOperation.output = [
          ...operation.output,
          operation.catalog[0],
          operation.queue[0]
        ]
        newOperation.catalog = operation.catalog.slice(1)
        newOperation.queue = operation.queue.slice(1)
      } else {
        newOperation.output = [
          ...operation.output,
          ...operation.catalog.slice(0, optionIndex + 1)
        ]
        newOperation.catalog = operation.catalog.slice(optionIndex + 1)
      }
      if (newOperation.queue.length >= newOperation.catalog.length) {
        const temp = newOperation.catalog
        newOperation.catalog = newOperation.queue
        newOperation.queue = temp
      }
    }
  }

  return {
    ...props.flow,
    operations: {
      ...props.flow.operations,
      [operation.uid]: newOperation
    }
  }
}
