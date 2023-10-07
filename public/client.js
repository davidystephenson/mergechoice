"use strict";
console.log('start');
const questionDiv = document.getElementById('questionDiv');
if (questionDiv == null) {
    throw new Error('questionDiv not found');
}
const choiceDiv = document.getElementById('choiceDiv');
if (choiceDiv == null) {
    throw new Error('choiceDiv not found');
}
const leftOptionDiv = document.getElementById('leftOptionDiv');
if (leftOptionDiv == null) {
    throw new Error('leftOptionDiv not found');
}
const rightOptionDiv = document.getElementById('rightOptionDiv');
if (rightOptionDiv == null) {
    throw new Error('rightOptionDiv not found');
}
const rankTable = document.getElementById('rankTable');
if (rankTable == null) {
    throw new Error('rankTable not found');
}
const nitems = 5;
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
];
function range(n) {
    return [...Array(n).keys()];
}
function getShuffled(array) {
    const indices = range(array.length);
    const randoms = indices.map(i => Math.random());
    indices.sort((i, j) => randoms[i] - randoms[j]);
    return indices.map(i => array[i]);
}
function getRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
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
};
function findById({ id, items }) {
    const found = items.find(item => item.id === id);
    if (found == null) {
        throw new Error(`id ${id} not found in items`);
    }
    return found;
}
function findLabelById({ id, items }) {
    return findById({ items, id }).label;
}
function clone(x) {
    return JSON.parse(JSON.stringify(x));
}
function cloneLog(label, x) {
    const cloned = clone(x);
    console.log(label, cloned);
}
const shuffledLabels = getShuffled(labels).slice(0, nitems);
state.items = range(nitems).map(i => {
    const item = {
        id: String(Math.random()),
        label: shuffledLabels[i],
        points: 0
    };
    return item;
});
state.operations = state.items.map(item => ({
    input: [[], []],
    output: [item.id],
    steps: 0
}));
function updateRankTable({ items }) {
    if (rankTable == null) {
        throw new Error('rankTable not found');
    }
    rankTable.innerHTML = '';
    items.forEach(item => {
        const row = rankTable.insertRow();
        row.insertCell().textContent = item.label;
        row.insertCell().textContent = String(item.points);
    });
}
updateRankTable(state);
function getOperations({ operations }) {
    const blocks = operations.map(operation => operation.output);
    const newOperations = [];
    const pairs = Math.floor(blocks.length / 2);
    range(pairs).forEach(i => {
        const blockA = blocks.pop();
        if (blockA == null) {
            throw new Error('blockA is null');
        }
        const blockB = blocks.pop();
        if (blockB == null) {
            throw new Error('blockB is null');
        }
        newOperations.unshift({
            input: [blockA, blockB],
            output: [],
            steps: blockA.length + blockB.length - 1
        });
    });
    if (blocks.length === 1) {
        const output = blocks.pop();
        if (output == null) {
            throw new Error('output is null');
        }
        newOperations.push({
            input: [[], []],
            output,
            steps: 0
        });
    }
    return newOperations;
}
state.operations = getOperations(state);
function getOperationIndex({ operations }) {
    const maxSteps = Math.max(...operations.map(operation => operation.steps));
    const indices = range(operations.length);
    const maximalIndices = indices.filter(index => operations[index].steps === maxSteps);
    return getRandom(maximalIndices);
}
function updateLabels({ choice, items }) {
    const leftId = choice.options[choice.leftIndex];
    const leftItem = findById({ items, id: leftId });
    leftOptionDiv.innerHTML = leftItem.label;
    const rightId = choice.options[choice.rightIndex];
    const rightItem = findById({ items, id: rightId });
    rightOptionDiv.innerHTML = rightItem.label;
}
function createChoice({ choice, operations, items }) {
    logOperations({ items, operations });
    const newChoice = {
        options: [],
        currentOperationIndex: 0,
        leftIndex: 0,
        rightIndex: 1
    };
    newChoice.currentOperationIndex = getOperationIndex({ operations });
    const currentOperation = operations[newChoice.currentOperationIndex];
    newChoice.options[0] = currentOperation.input[0][0];
    newChoice.options[1] = currentOperation.input[1][0];
    newChoice.leftIndex = getRandom([0, 1]);
    newChoice.rightIndex = 1 - newChoice.leftIndex;
    updateLabels({
        choice: newChoice,
        items
    });
    logChoice({ choice: newChoice, items });
    return newChoice;
}
state.choice = createChoice(state);
function chooseOption({ state: { items, operations, choice }, choiceIndex }) {
    const newItems = clone(items);
    const newOperations = clone(operations);
    cloneLog('newOperations', newOperations);
    if (choice == null) {
        throw new Error('choice is null');
    }
    const currentOperation = newOperations[choice.currentOperationIndex];
    cloneLog('currentOperation', currentOperation);
    const chosenId = currentOperation.input[choiceIndex].shift();
    console.log('chosenId', chosenId);
    if (chosenId == null) {
        throw new Error('chosenId is null');
    }
    currentOperation.output.push(chosenId);
    const chosenItem = findById({ items: newItems, id: chosenId });
    console.log('chosenItem', chosenItem);
    chosenItem.points = currentOperation.steps;
    currentOperation.steps -= 1;
    if (currentOperation.input[choiceIndex].length === 0) {
        currentOperation.output.push(...currentOperation.input[1 - choiceIndex]);
        currentOperation.input[1 - choiceIndex] = [];
        currentOperation.steps = 0;
    }
    newItems.sort((a, b) => b.points - a.points);
    updateRankTable({ items: newItems });
    const maxSteps = Math.max(...newOperations.map(operation => operation.steps));
    if (maxSteps > 0) {
        const newChoice = createChoice({
            choice, operations: newOperations, items: newItems
        });
        return {
            items: newItems,
            operations: newOperations,
            choice: newChoice,
            finalized: false
        };
    }
    else {
        const nextOperations = getOperations({ operations: newOperations });
        const maxSteps = Math.max(...nextOperations.map(operation => operation.steps));
        if (maxSteps > 0) {
            const nextChoice = createChoice({
                choice,
                operations: nextOperations,
                items: newItems
            });
            return {
                items: newItems,
                operations: nextOperations,
                choice: nextChoice,
                finalized: false
            };
        }
        else {
            return {
                items: newItems,
                operations: nextOperations,
                choice,
                finalized: true
            };
        }
    }
}
document.onkeydown = function (event) {
    if (event.key === ' ') {
        logOperations(state);
    }
    if (event.key === 'A') {
        logChoice(state);
    }
    if (state.finalized) {
        return;
    }
    // console.log('state', state)
    const leftOption = state.choice.options[state.choice.leftIndex];
    const leftItem = findById({ items: state.items, id: leftOption });
    const rightOption = state.choice.options[state.choice.rightIndex];
    const rightItem = findById({ items: state.items, id: rightOption });
    if (event.key === 'ArrowLeft') {
        console.log(`${leftItem.label} > ${rightItem.label}`);
        state = chooseOption({ state, choiceIndex: state.choice.leftIndex });
    }
    if (event.key === 'ArrowRight') {
        console.log(`${rightItem.label} > ${leftItem.label}`);
        state = chooseOption({ state, choiceIndex: state.choice.rightIndex });
    }
    if (state.finalized) {
        choiceDiv.innerHTML = '';
        questionDiv.innerHTML = 'Final points:';
    }
};
function logOperations({ items, operations }) {
    operations.forEach(operation => {
        console.log(`operation steps: ${operation.steps}`);
        const firstLabels = operation.input[0].map(id => {
            const item = findById({ items, id });
            return item.label;
        });
        console.log('first input items', firstLabels);
        const secondLabels = operation.input[1].map(id => {
            const item = findById({ items, id });
            return item.label;
        });
        console.log('second input items', secondLabels);
        const outputLabels = operation.output.map(id => {
            const item = findById({ items, id });
            return item.label;
        });
        console.log('output items', outputLabels);
    });
}
function logChoice({ choice, items }) {
    const choiceLabels = choice.options.map(id => {
        return findLabelById({ items, id });
    });
    console.log('choice items', choiceLabels);
}
