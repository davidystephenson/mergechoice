const questionDiv = document.getElementById('questionDiv')
const choiceDiv = document.getElementById('choiceDiv')
const leftOptionDiv = document.getElementById('leftOptionDiv')
const rightOptionDiv = document.getElementById('rightOptionDiv')
const rankTable = document.getElementById('rankTable')
const nitems = 5
const labels = [
  'Schindler\'s List',
  'The Silence of the Lambs',
  'Back to the Future',
  'Amadeus',
  'Raiders of the Lost Ark',
  'The Shawshank Redemption',
  'Forrest Gump',
  'The Lion King',
  'Saving Private Ryan',
  'Gladiator',
  'Memento',
  'Fight Club',
  'The Matrix',
  'The Prestige',
  'The Departed',
  'Inception',
  'Django Unchained',
  'The Godfather',
  'Alien'
]

function range (n) { return [...Array(n).keys()] }
function getShuffled (array) {
  const indices = range(array.length)
  const randoms = indices.map(i => Math.random())
  indices.sort((i, j) => randoms[i] - randoms[j])
  return indices.map(i => array[i])
}
function getRandom (array) {
  return array[Math.floor(Math.random() * array.length)]
}

let state = {
  items: [],
  operations: [],
  choice: {
    options: [],
    currentOperationIndex: 0,
    leftIndex: 0,
    rightIndex: 1
  },
  finalized: false
}

function findById ({ items, id }) {
  return items.find(item => item.id === id)
}
function findLabelById ({ items, id }) {
  return findById({ items, id }).label
}
function clone (x) {
  return JSON.parse(JSON.stringify(x))
}
function cloneLog (label, x) {
  const cloned = clone(x)
  console.log(label, cloned)
}
const shuffledLabels = getShuffled(labels).slice(0, nitems)
state.items = range(nitems).map(i => ({
  id: Math.random(),
  label: shuffledLabels[i],
  score: 0
}))
state.operations = state.items.map(item => ({
  input: [[], []],
  output: [item.id],
  steps: 0
}))

function updateRankTable ({ items }) {
  rankTable.innerHTML = ''
  items.forEach(item => {
    const row = rankTable.insertRow()
    row.insertCell().textContent = item.label
    row.insertCell().textContent = item.score
  })
}
updateRankTable(state)

function getOperations ({ operations }) {
  const blocks = operations.map(operation => operation.output)
  const newOperations = []
  const pairs = Math.floor(blocks.length / 2)
  range(pairs).forEach(i => {
    const blockA = blocks.pop()
    const blockB = blocks.pop()
    newOperations.unshift({
      input: [blockA, blockB],
      output: [],
      steps: blockA.length + blockB.length - 1
    })
  })
  if (blocks.length === 1) {
    newOperations.push({
      input: [[], []],
      output: blocks.pop(),
      steps: 0
    })
  }
  return newOperations
}
state.operations = getOperations(state)

function getOperationIndex ({
  operations
}) {
  const maxSteps = Math.max(...operations.map(operation => operation.steps))
  const indices = range(operations.length)
  const maximalIndices = indices.filter(index => operations[index].steps === maxSteps)
  return getRandom(maximalIndices)
}

function updateLabels ({
  choice,
  items
}) {
  const leftId = choice.options[choice.leftIndex]
  const leftItem = findById({ items, id: leftId })
  leftOptionDiv.innerHTML = leftItem.label
  const rightId = choice.options[choice.rightIndex]
  const rightItem = findById({ items, id: rightId })
  rightOptionDiv.innerHTML = rightItem.label
}

function createChoice ({ choice, operations, items }) {
  logOperations({ choice, items, operations })
  const newChoice = {
    options: [],
    currentOperationIndex: 0,
    leftIndex: 0,
    rightIndex: 1
  }
  newChoice.currentOperationIndex = getOperationIndex({
    choice,
    operations,
    items
  })
  console.log('newChoice.currentOperationIndex', newChoice.currentOperationIndex)
  const currentOperation = operations[newChoice.currentOperationIndex]
  newChoice.options[0] = currentOperation.input[0][0]
  newChoice.options[1] = currentOperation.input[1][0]
  newChoice.leftIndex = getRandom([0, 1])
  newChoice.rightIndex = 1 - newChoice.leftIndex
  updateLabels({
    choice: newChoice,
    items
  })
  logChoice({ choice: newChoice, items })
  return newChoice
}
state.choice = createChoice(state)

function chooseOption ({
  state: {
    items,
    operations,
    choice
  },
  choiceIndex
}) {
  const newItems = JSON.parse(JSON.stringify(items))
  const newOperations = JSON.parse(JSON.stringify(operations))
  cloneLog('newOperations', newOperations)
  const currentOperation = newOperations[choice.currentOperationIndex]
  cloneLog('currentOperation', currentOperation)
  const chosenId = currentOperation.input[choiceIndex].shift()
  console.log('chosenId', chosenId)
  currentOperation.output.push(chosenId)
  const chosenItem = findById({ items: newItems, id: chosenId })
  console.log('chosenItem', chosenItem)
  chosenItem.score = currentOperation.steps
  currentOperation.steps -= 1
  if (currentOperation.input[choiceIndex].length === 0) {
    currentOperation.output.push(...currentOperation.input[1 - choiceIndex])
    currentOperation.input[1 - choiceIndex] = []
    currentOperation.steps = 0
  }
  newItems.sort((a, b) => b.score - a.score)
  updateRankTable({ items: newItems })
  const maxSteps = Math.max(...newOperations.map(operation => operation.steps))
  if (maxSteps > 0) {
    const newChoice = createChoice({
      choice, operations: newOperations, items: newItems
    })
    return {
      items: newItems,
      operations: newOperations,
      choice: newChoice,
      finalized: false
    }
  } else {
    const nextOperations = getOperations({ operations: newOperations })
    const maxSteps = Math.max(...nextOperations.map(operation => operation.steps))
    if (maxSteps > 0) {
      const nextChoice = createChoice({
        choice,
        operations: nextOperations,
        items: newItems
      })
      return {
        items: newItems,
        operations: nextOperations,
        choice: nextChoice,
        final: false
      }
    } else {
      return {
        items: newItems,
        operations: nextOperations,
        choice: null,
        finalized: true
      }
    }
  }
}

document.onkeydown = function (event) {
  if (event.key === ' ') {
    logOperations(state)
  }
  if (event.key === 'A') {
    logChoice(state)
  }
  if (state.finalized) {
    return
  }
  // console.log('state', state)
  const leftOption = state.choice.options[state.choice.leftIndex]
  const leftItem = findById({ items: state.items, id: leftOption })
  const rightOption = state.choice.options[state.choice.rightIndex]
  const rightItem = findById({ items: state.items, id: rightOption })
  if (event.key === 'ArrowLeft') {
    console.log(`${leftItem.label} > ${rightItem.label}`)
    state = chooseOption({ state, choiceIndex: state.choice.leftIndex })
  }
  if (event.key === 'ArrowRight') {
    console.log(`${rightItem.label} > ${leftItem.label}`)
    state = chooseOption({ state, choiceIndex: state.choice.rightIndex })
  }
  if (state.finalized) {
    choiceDiv.innerHTML = ''
    questionDiv.innerHTML = 'Final Scores:'
  }
}

function logOperations ({ choice, items, operations }) {
  operations.forEach(operation => {
    console.log(`operation steps: ${operation.steps}`)
    const firstLabels = operation.input[0].map(id => {
      const item = findById({ items, id })
      return item.label
    })
    console.log('first input items', firstLabels)
    const secondLabels = operation.input[1].map(id => {
      const item = findById({ items, id })
      return item.label
    })
    console.log('second input items', secondLabels)
    const outputLabels = operation.output.map(id => {
      const item = findById({ items, id })
      return item.label
    })
    console.log('output items', outputLabels)
  })
}

function logChoice ({ choice, items }) {
  const choiceLabels = choice.options.map(id => {
    return findLabelById({ items, id })
  })
  console.log('choice items', choiceLabels)
}
