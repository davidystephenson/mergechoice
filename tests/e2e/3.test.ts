import createThreeFlow from '../flow/createThreeFlow'
import verifyFlowStep from '../flow/verifyFlowStep'

describe('if the first three Matrix movies are imported with the seed "test"', () => {
  verifyFlowStep({
    choice: {
      queue: 'revolutions',
      catalog: 'reloaded'
    },
    ranking: [
      { uid: 'original', rank: 1, points: 0 },
      { uid: 'reloaded', rank: 1, points: 0 },
      { uid: 'revolutions', rank: 1, points: 0 }
    ],
    createInitialFlow: createThreeFlow,
    queues: []
  })

  describe('if a is chosen', () => {
    verifyFlowStep({
      choice: {
        queue: 'reloaded',
        catalog: 'original'
      },
      ranking: [
        { uid: 'revolutions', rank: 1, points: 1 },
        { uid: 'original', rank: 2, points: 0 },
        { uid: 'reloaded', rank: 2, points: 0 }
      ],
      createInitialFlow: createThreeFlow,
      queues: ['A']
    })

    describe('if a is chosen', () => {
      verifyFlowStep({
        choice: undefined,
        ranking: [
          { uid: 'revolutions', rank: 1, points: 2 },
          { uid: 'reloaded', rank: 2, points: 1 },
          { uid: 'original', rank: 3, points: 0 }
        ],
        createInitialFlow: createThreeFlow,
        queues: ['A', 'A']
      })
    })

    describe('if b is chosen', () => {
      verifyFlowStep({
        choice: {
          queue: 'revolutions',
          catalog: 'original'
        },
        ranking: [
          { uid: 'original', rank: 1, points: 1 },
          { uid: 'revolutions', rank: 1, points: 1 },
          { uid: 'reloaded', rank: 2, points: 0 }
        ],
        createInitialFlow: createThreeFlow,
        queues: ['A', 'B']
      })

      describe('if a is chosen', () => {
        verifyFlowStep({
          choice: undefined,
          ranking: [
            { uid: 'revolutions', rank: 1, points: 2 },
            { uid: 'original', rank: 2, points: 1 },
            { uid: 'reloaded', rank: 3, points: 0 }
          ],
          createInitialFlow: createThreeFlow,
          queues: ['A', 'B', 'A']
        })
      })

      describe('if b is chosen', () => {
        verifyFlowStep({
          choice: undefined,
          ranking: [
            { uid: 'original', rank: 1, points: 2 },
            { uid: 'revolutions', rank: 2, points: 1 },
            { uid: 'reloaded', rank: 3, points: 0 }
          ],
          createInitialFlow: createThreeFlow,
          queues: ['A', 'B', 'B']
        })
      })
    })
  })

  describe('if b is chosen', () => {
    verifyFlowStep({
      choice: {
        queue: 'revolutions',
        catalog: 'original'
      },
      ranking: [
        { uid: 'reloaded', rank: 1, points: 1 },
        { uid: 'original', rank: 2, points: 0 },
        { uid: 'revolutions', rank: 2, points: 0 }
      ],
      createInitialFlow: createThreeFlow,
      queues: ['B']
    })

    describe('if a is chosen', () => {
      verifyFlowStep({
        choice: undefined,
        ranking: [
          { uid: 'reloaded', rank: 1, points: 2 },
          { uid: 'revolutions', rank: 2, points: 1 },
          { uid: 'original', rank: 3, points: 0 }
        ],
        createInitialFlow: createThreeFlow,
        queues: ['B', 'A']
      })
    })

    describe('if b is chosen', () => {
      verifyFlowStep({
        choice: {
          queue: 'reloaded',
          catalog: 'original'
        },
        ranking: [
          { uid: 'original', rank: 1, points: 1 },
          { uid: 'reloaded', rank: 1, points: 1 },
          { uid: 'revolutions', rank: 2, points: 0 }
        ],
        createInitialFlow: createThreeFlow,
        queues: ['B', 'B']
      })

      describe('if a is chosen', () => {
        verifyFlowStep({
          choice: undefined,
          ranking: [
            { uid: 'reloaded', rank: 1, points: 2 },
            { uid: 'original', rank: 2, points: 1 },
            { uid: 'revolutions', rank: 3, points: 0 }
          ],
          createInitialFlow: createThreeFlow,
          queues: ['B', 'B', 'A']
        })
      })

      describe('if b is chosen', () => {
        verifyFlowStep({
          choice: undefined,
          ranking: [
            { uid: 'original', rank: 1, points: 2 },
            { uid: 'reloaded', rank: 2, points: 1 },
            { uid: 'revolutions', rank: 3, points: 0 }
          ],
          createInitialFlow: createThreeFlow,
          queues: ['B', 'B', 'B']
        })
      })
    })
  })
})
