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

  const updatedOperation = { ...operation }
  const singleCatalog = operation.catalog.length === 1
  const queueChosen = props.option === choice.queue

  if (singleCatalog) {
    if (updatedOperation.better != null) {
      throw new Error('Better cannot be defined when catalog is single')
    }
    if (operation.queue.length > 1) {
      throw new Error('Queue cannot be longer than 1 when catalog is single')
    }
  }

  if (queueChosen) {
    if (singleCatalog) {
      updatedOperation.output = [...operation.output, ...operation.catalog, ...operation.queue]
      updatedOperation.queue = []
      updatedOperation.catalog = []
    } else {
      const bElementsToMove = updatedOperation.better != null
        ? operation.catalog.slice(0, updatedOperation.better)
        : operation.catalog.slice(0, operation.catalog.indexOf(choice.catalog) + 1)
      updatedOperation.output = [...operation.output, ...bElementsToMove, operation.queue[0]]
      updatedOperation.queue = operation.queue.slice(1)
      updatedOperation.catalog = operation.catalog.slice(bElementsToMove.length)
    }
    updatedOperation.better = undefined
  } else {
    if (updatedOperation.better == null) {
      updatedOperation.better = getInitialOptionIndex({ length: operation.catalog.length })
    } else {
      if (typeof updatedOperation.better !== 'number') {
        throw new Error('Better must be a number')
      }
      if (updatedOperation.better <= 0) {
        throw new Error('Better must be greater than 0')
      }
      const initial = getInitialOptionIndex({ length: operation.catalog.length })
      if (updatedOperation.better > initial) {
        throw new Error('Better must not be greater than the initial option index')
      }
      if (updatedOperation.better === 1) {
        const [firstQueue, ...restQueue] = operation.queue
        const [firstCatalog, ...restCatalog] = operation.catalog
        updatedOperation.output = [...operation.output, firstQueue, firstCatalog]
        updatedOperation.queue = restQueue
        updatedOperation.catalog = restCatalog
        updatedOperation.better = undefined
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

  const updatedFlow = {
    ...props.flow,
    operations: updatedOperations
  }

  return updatedFlow
}
