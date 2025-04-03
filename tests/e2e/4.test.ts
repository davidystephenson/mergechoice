import createFourFlow from '../flow/createFourFlow'
import verifyFlowStep from '../flow/verifyFlowStep'

describe('if the four Matrix movies are imported with the seed "test"', () => {
  verifyFlowStep({
    choice: {
      a: 'original',
      b: 'revolutions'
    },
    ranking: [
      { uid: 'original', rank: 1, points: 0 },
      { uid: 'reloaded', rank: 1, points: 0 },
      { uid: 'resurrections', rank: 1, points: 0 },
      { uid: 'revolutions', rank: 1, points: 0 }
    ],
    createInitialFlow: createFourFlow,
    options: []
  })

  describe('if a is chosen', () => {
    verifyFlowStep({
      choice: {
        a: 'original',
        b: 'revolutions'
      },
      ranking: [
        { uid: 'original', rank: 1, points: 1 },
        { uid: 'reloaded', rank: 2, points: 0 },
        { uid: 'resurrections', rank: 2, points: 0 },
        { uid: 'revolutions', rank: 2, points: 0 }
      ],
      createInitialFlow: createFourFlow,
      options: ['a']
    })

    xdescribe('if a is chosen', () => {
      verifyFlowStep({
        choice: {
          a: 'revolutions',
          b: 'reloaded'
        },
        ranking: [
          { uid: 'original', rank: 1, points: 1 },
          { uid: 'resurrections', rank: 1, points: 1 },
          { uid: 'reloaded', rank: 2, points: 0 },
          { uid: 'revolutions', rank: 2, points: 0 }
        ],
        createInitialFlow: createFourFlow,
        options: ['a', 'a']
      })

      xdescribe('if a is chosen', () => {
        verifyFlowStep({
          choice: {
            a: 'revolutions',
            b: 'resurrections'
          },
          ranking: [
            { uid: 'original', rank: 1, points: 2 },
            { uid: 'resurrections', rank: 2, points: 1 },
            { uid: 'revolutions', rank: 2, points: 1 },
            { uid: 'reloaded', rank: 3, points: 0 }
          ],
          createInitialFlow: createFourFlow,
          options: ['a', 'a', 'a']
        })
      })
    })
  })
})
