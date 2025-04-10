import createTwoFlow from '../flow/createTwoFlow'
import verifyFlowStep from '../flow/verifyFlowStep'

describe('if two items are imported', () => {
  verifyFlowStep({
    choice: {
      a: 'reloaded',
      b: 'original'
    },
    ranking: [
      { uid: 'original', rank: 1, points: 0 },
      { uid: 'reloaded', rank: 1, points: 0 }
    ],
    createInitialFlow: createTwoFlow,
    options: []
  })

  describe('if a is chosen', () => {
    verifyFlowStep({
      choice: undefined,
      ranking: [
        { uid: 'reloaded', rank: 1, points: 1 },
        { uid: 'original', rank: 2, points: 0 }
      ],
      createInitialFlow: createTwoFlow,
      options: ['A']
    })
  })

  describe('if b is chosen', () => {
    verifyFlowStep({
      choice: undefined,
      ranking: [
        { uid: 'original', rank: 1, points: 1 },
        { uid: 'reloaded', rank: 2, points: 0 }
      ],
      createInitialFlow: createTwoFlow,
      options: ['B']
    })
  })
})
