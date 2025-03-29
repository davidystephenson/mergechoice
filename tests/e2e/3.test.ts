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
      options: ['a']
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
        options: ['a', 'a']
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
        options: ['a', 'b']
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
          options: ['a', 'b', 'a']
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
          options: ['a', 'b', 'b']
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
      options: ['b']
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
        options: ['b', 'a']
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
        options: ['b', 'b']
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
          options: ['b', 'b', 'a']
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
          options: ['b', 'b', 'b']
        })
      })
    })
  })
})
