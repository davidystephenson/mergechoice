import createOneFlow from '../flow/createOneFlow'
import verifyFlowStep from '../flow/verifyFlowStep'

describe('if one item is imported', () => {
  verifyFlowStep({
    choice: undefined,
    ranking: [
      { uid: 'original', rank: 1, points: 0 }
    ],
    createInitialFlow: createOneFlow,
    options: []
  })
})
