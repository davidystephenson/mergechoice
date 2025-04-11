import createFlow from '../../src/createFlow'
import verifyFlowStep from '../flow/verifyFlowStep'

describe('if zero items are imported', () => {
  verifyFlowStep({
    choice: undefined,
    ranking: [],
    createInitialFlow: () => createFlow({ uid: 'test' }),
    queues: []
  })
})
