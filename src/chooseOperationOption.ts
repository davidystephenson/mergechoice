import { Flow } from './flowTypes'
import getChoice from './getChoice'
import getInitialOptionIndex from './getInitialOptionIndex'
import getFloorHalf from './getFloorHalf'

export default function chooseOperationOption (props: {
  flow: Flow
  option: string
}): Flow {
  const choice = getChoice({ flow: props.flow })
  if (choice == null) {
    throw new Error('Flow has no choice')
  }

  const operation = props.flow.operations[choice.operation]
  if (operation == null) {
    throw new Error('Operation not found')
  }

  const validOption = props.option === choice.queue || props.option === choice.catalog
  if (!validOption) {
    throw new Error('Option is not in the choice')
  }

  if (operation.queue.length > operation.catalog.length) {
    throw new Error('Queue cannot be longer than catalog')
  }

  if (operation.better != null) {
    if (typeof operation.better !== 'number') {
      throw new Error('Better must be a number')
    }
    if (operation.better <= 0) {
      throw new Error('Better must be greater than 0')
    }
    const initial = getInitialOptionIndex({ length: operation.catalog.length })
    if (operation.better > initial) {
      throw new Error('Better must not be greater than the initial option index')
    }
  }

  if (operation.catalog.length <= 2 && operation.better != null) {
    throw new Error('Better cannot be defined when catalog is two or less long')
  }

  const updatedOperation = { ...operation }
  const singleCatalog = operation.catalog.length === 1
  const queueChosen = props.option === choice.queue

  if (queueChosen) {
    updatedOperation.better = undefined
    if (singleCatalog) {
      updatedOperation.output = [...operation.output, ...operation.catalog, ...operation.queue]
      updatedOperation.queue = []
      updatedOperation.catalog = []
    } else {
      const optionIndex = operation.catalog.indexOf(choice.catalog) + 1
      const elementsToMove = operation.catalog.slice(0, optionIndex)
      updatedOperation.output = [...operation.output, ...elementsToMove, operation.queue[0]]
      updatedOperation.queue = operation.queue.slice(1)
      updatedOperation.catalog = operation.catalog.slice(elementsToMove.length)
    }
  } else {
    const optionIndex = operation.catalog.indexOf(choice.catalog)
    if (optionIndex === 0) {
      updatedOperation.better = undefined
      if (operation.queue.length === 1) {
        updatedOperation.output = [...operation.output, ...operation.queue, ...operation.catalog]
        updatedOperation.queue = []
        updatedOperation.catalog = []
      } else {
        const [firstQueue, ...restQueue] = operation.queue
        const [firstCatalog, ...restCatalog] = operation.catalog
        updatedOperation.output = [...operation.output, firstQueue, firstCatalog]
        updatedOperation.queue = restQueue
        updatedOperation.catalog = restCatalog
      }
    } else {
      if (updatedOperation.better == null) {
        updatedOperation.better = getInitialOptionIndex({ length: operation.catalog.length })
      } else {
        updatedOperation.better = getFloorHalf({ value: updatedOperation.better })
      }
    }
  }

  if (updatedOperation.queue.length >= updatedOperation.catalog.length) {
    const temp = updatedOperation.queue
    updatedOperation.queue = updatedOperation.catalog
    updatedOperation.catalog = temp
  }

  const updatedOperations = {
    ...props.flow.operations,
    [operation.uid]: updatedOperation
  }

  return {
    ...props.flow,
    operations: updatedOperations
  }
}
