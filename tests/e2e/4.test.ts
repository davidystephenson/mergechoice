import createFourFlow from '../flow/createFourFlow'
import verifyFlowStep from '../flow/verifyFlowStep'

describe('if the four Matrix movies are imported with the seed "test"', () => {
  verifyFlowStep({
    choice: {
      queue: 'original',
      catalog: 'revolutions'
    },
    ranking: [
      { uid: 'original', rank: 1, points: 0 },
      { uid: 'reloaded', rank: 1, points: 0 },
      { uid: 'resurrections', rank: 1, points: 0 },
      { uid: 'revolutions', rank: 1, points: 0 }
    ],
    createInitialFlow: createFourFlow,
    queues: []
  })

  describe('if a is chosen', () => {
    verifyFlowStep({
      choice: {
        queue: 'original',
        catalog: 'revolutions'
      },
      ranking: [
        { uid: 'original', rank: 1, points: 1 },
        { uid: 'reloaded', rank: 2, points: 0 },
        { uid: 'resurrections', rank: 2, points: 0 },
        { uid: 'revolutions', rank: 2, points: 0 }
      ],
      createInitialFlow: createFourFlow,
      queues: ['A']
    })

    xdescribe('if a is chosen', () => {
      verifyFlowStep({
        choice: {
          queue: 'revolutions',
          catalog: 'reloaded'
        },
        ranking: [
          { uid: 'original', rank: 1, points: 1 },
          { uid: 'resurrections', rank: 1, points: 1 },
          { uid: 'reloaded', rank: 2, points: 0 },
          { uid: 'revolutions', rank: 2, points: 0 }
        ],
        createInitialFlow: createFourFlow,
        queues: ['A', 'A']
      })

      xdescribe('if a is chosen', () => {
        verifyFlowStep({
          choice: {
            queue: 'revolutions',
            catalog: 'resurrections'
          },
          ranking: [
            { uid: 'original', rank: 1, points: 2 },
            { uid: 'resurrections', rank: 2, points: 1 },
            { uid: 'revolutions', rank: 2, points: 1 },
            { uid: 'reloaded', rank: 3, points: 0 }
          ],
          createInitialFlow: createFourFlow,
          queues: ['A', 'A', 'A']
        })
      })
    })
  })
})
