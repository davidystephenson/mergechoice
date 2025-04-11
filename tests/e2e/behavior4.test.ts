import { createFlow, Flow } from '../../src'
import verifyFlowStep from '../flow/verifyFlowStep'
import insertOperation from '../operation/insertOperation'

describe('behavior4', () => {
  function createFourFlow (): Flow {
    const flow = createFlow({ uid: 'test' })
    flow.items = {
      original: { uid: 'original', label: 'original', seed: 0 },
      reloaded: { uid: 'reloaded', label: 'reloaded', seed: 1 },
      resurrections: { uid: 'resurrections', label: 'resurrections', seed: 2 },
      revolutions: { uid: 'revolutions', label: 'revolutions', seed: 3 },
      animatrix: { uid: 'animatrix', label: 'animatrix', seed: 4 },
      enter: { uid: 'enter', label: 'enter', seed: 5 },
      online: { uid: 'online', label: 'online', seed: 6 },
      path: { uid: 'path', label: 'path', seed: 7 },
      awakens: { uid: 'awakens', label: 'awakens', seed: 8 }
    }
    const insertedFlow = insertOperation({
      queue: ['reloaded', 'revolutions', 'resurrections', 'animatrix'],
      catalog: ['enter', 'online', 'path', 'awakens'],
      flow,
      output: ['original']
    })
    return insertedFlow
  }
  describe('operation1', () => {
    verifyFlowStep({
      choice: {
        queue: 'reloaded',
        catalog: 'enter'
      },
      createInitialFlow: createFourFlow,
      queues: [],
      ranking: [
        { uid: 'animatrix', rank: 1, points: 4 },
        { uid: 'awakens', rank: 1, points: 4 },
        { uid: 'path', rank: 2, points: 3 },
        { uid: 'resurrections', rank: 2, points: 3 },
        { uid: 'online', rank: 3, points: 2 },
        { uid: 'revolutions', rank: 3, points: 2 },
        { uid: 'enter', rank: 4, points: 1 },
        { uid: 'reloaded', rank: 4, points: 1 },
        { uid: 'original', rank: 5, points: 0 }
      ]
    })
  })
  describe('operation2', () => {
    verifyFlowStep({
      choice: {
        queue: 'reloaded',
        catalog: 'awakens'
      },
      createInitialFlow: createFourFlow,
      queues: ['A'],
      ranking: [
        { uid: 'animatrix', rank: 1, points: 5 },
        { uid: 'awakens', rank: 2, points: 4 },
        { uid: 'resurrections', rank: 2, points: 4 },
        { uid: 'path', rank: 3, points: 3 },
        { uid: 'revolutions', rank: 3, points: 3 },
        { uid: 'online', rank: 4, points: 2 },
        { uid: 'reloaded', rank: 4, points: 2 },
        { uid: 'enter', rank: 5, points: 1 },
        { uid: 'original', rank: 6, points: 0 }
      ]
    })
  })
  describe('operation3', () => {
    verifyFlowStep({
      choice: undefined,
      createInitialFlow: createFourFlow,
      queues: ['A', 'A'],
      ranking: [
        { uid: 'animatrix', rank: 1, points: 8 },
        { uid: 'resurrections', rank: 2, points: 7 },
        { uid: 'revolutions', rank: 3, points: 6 },
        { uid: 'reloaded', rank: 4, points: 5 },
        { uid: 'awakens', rank: 5, points: 4 },
        { uid: 'path', rank: 6, points: 3 },
        { uid: 'online', rank: 7, points: 2 },
        { uid: 'enter', rank: 8, points: 1 },
        { uid: 'original', rank: 9, points: 0 }
      ]
    })
  })
})
