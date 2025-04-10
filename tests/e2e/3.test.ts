import createThreeFlow from '../flow/createThreeFlow'
import verifyFlowStep from '../flow/verifyFlowStep'

describe('if the first three Matrix movies are imported with the seed "test"', () => {
  verifyFlowStep({
    choice: {
      a: 'revolutions',
      b: 'reloaded'
    },
    ranking: [
      { uid: 'original', rank: 1, points: 0 },
      { uid: 'reloaded', rank: 1, points: 0 },
      { uid: 'revolutions', rank: 1, points: 0 }
    ],
    createInitialFlow: createThreeFlow,
    options: []
  })

  describe('if a is chosen', () => {
    verifyFlowStep({
      choice: {
        a: 'reloaded',
        b: 'original'
      },
      ranking: [
        { uid: 'revolutions', rank: 1, points: 1 },
        { uid: 'original', rank: 2, points: 0 },
        { uid: 'reloaded', rank: 2, points: 0 }
      ],
      createInitialFlow: createThreeFlow,
      options: ['A']
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
        options: ['A', 'A']
      })
    })

    describe('if b is chosen', () => {
      verifyFlowStep({
        choice: {
          a: 'revolutions',
          b: 'original'
        },
        ranking: [
          { uid: 'original', rank: 1, points: 1 },
          { uid: 'revolutions', rank: 1, points: 1 },
          { uid: 'reloaded', rank: 2, points: 0 }
        ],
        createInitialFlow: createThreeFlow,
        options: ['A', 'B']
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
          options: ['A', 'B', 'A']
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
          options: ['A', 'B', 'B']
        })
      })
    })
  })

  describe('if b is chosen', () => {
    verifyFlowStep({
      choice: {
        a: 'revolutions',
        b: 'original'
      },
      ranking: [
        { uid: 'reloaded', rank: 1, points: 1 },
        { uid: 'original', rank: 2, points: 0 },
        { uid: 'revolutions', rank: 2, points: 0 }
      ],
      createInitialFlow: createThreeFlow,
      options: ['B']
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
        options: ['B', 'A']
      })
    })

    describe('if b is chosen', () => {
      verifyFlowStep({
        choice: {
          a: 'reloaded',
          b: 'original'
        },
        ranking: [
          { uid: 'original', rank: 1, points: 1 },
          { uid: 'reloaded', rank: 1, points: 1 },
          { uid: 'revolutions', rank: 2, points: 0 }
        ],
        createInitialFlow: createThreeFlow,
        options: ['B', 'B']
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
          options: ['B', 'B', 'A']
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
          options: ['B', 'B', 'B']
        })
      })
    })
  })
})
