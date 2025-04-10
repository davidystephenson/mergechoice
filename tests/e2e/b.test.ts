import { createFlow, Flow } from '../../src'
import verifyFlowStep from '../flow/verifyFlowStep'

describe('b', () => {
  function createInitialFlow (): Flow {
    const flow = createFlow({ uid: 'matrix a' })
    flow.items = {
      original: { name: 'original', uid: 'original', seed: 0 },
      reloaded: { name: 'reloaded', uid: 'reloaded', seed: 0 },
      revolutions: { name: 'revolutions', uid: 'revolutions', seed: 0 },
      animatrix: { name: 'animatrix', uid: 'animatrix', seed: 0 },
      revisited: { name: 'revisited', uid: 'revisited', seed: 0 },
      enter: { name: 'enter', uid: 'enter', seed: 0 },
      online: { name: 'online', uid: 'online', seed: 0 },
      path: { name: 'path', uid: 'path', seed: 0 },
      awakens: { name: 'awakens', uid: 'awakens', seed: 0 },
      comics: { name: 'comics', uid: 'comics', seed: 0 }
    }
    flow.operations = {
      operation1: {
        aInput: ['original', 'reloaded', 'revolutions', 'animatrix'],
        bInput: ['revisited', 'enter', 'online', 'path', 'awakens'],
        output: ['comics'],
        uid: 'operation1'
      }
    }
    return flow
  }
  describe('operation1', () => {
    verifyFlowStep({
      choice: {
        a: 'original',
        b: 'online'
      },
      createInitialFlow,
      options: [],
      ranking: [
        { uid: 'awakens', points: 5, rank: 1 },
        { uid: 'animatrix', points: 4, rank: 2 },
        { uid: 'path', points: 4, rank: 2 },
        { uid: 'online', points: 3, rank: 3 },
        { uid: 'revolutions', points: 3, rank: 3 },
        { uid: 'enter', points: 2, rank: 4 },
        { uid: 'reloaded', points: 2, rank: 4 },
        { uid: 'original', points: 1, rank: 5 },
        { uid: 'revisited', points: 1, rank: 5 },
        { uid: 'comics', points: 0, rank: 6 }
      ]
    })
  })

  describe('operation2', () => {
    verifyFlowStep({
      choice: {
        a: 'original',
        b: 'enter'
      },
      createInitialFlow,
      options: ['B'],
      ranking: [
        { uid: 'awakens', points: 6, rank: 1 },
        { uid: 'path', points: 5, rank: 2 },
        { uid: 'animatrix', points: 4, rank: 3 },
        { uid: 'online', points: 4, rank: 3 },
        { uid: 'revolutions', points: 3, rank: 4 },
        { uid: 'enter', points: 2, rank: 5 },
        { uid: 'reloaded', points: 2, rank: 5 },
        { uid: 'original', points: 1, rank: 6 },
        { uid: 'revisited', points: 1, rank: 6 },
        { uid: 'comics', points: 0, rank: 7 }
      ]
    })
  })

  describe('operation3', () => {
    verifyFlowStep({
      choice: {
        a: 'animatrix',
        b: 'awakens'
      },
      createInitialFlow,
      options: ['A', 'A'],
      ranking: [
        { uid: 'animatrix', points: 8, rank: 1 },
        { uid: 'awakens', points: 8, rank: 1 },
        { uid: 'path', points: 7, rank: 2 },
        { uid: 'revolutions', points: 6, rank: 3 },
        { uid: 'reloaded', points: 5, rank: 4 },
        { uid: 'original', points: 4, rank: 5 },
        { uid: 'online', points: 3, rank: 6 },
        { uid: 'enter', points: 2, rank: 7 },
        { uid: 'revisited', points: 1, rank: 8 },
        { uid: 'comics', points: 0, rank: 9 }
      ]
    })
  })

  describe('operation4', () => {
    verifyFlowStep({
      choice: undefined,
      createInitialFlow,
      options: ['A', 'A', 'A'],
      ranking: [
        { uid: 'animatrix', points: 9, rank: 1 },
        { uid: 'awakens', points: 8, rank: 2 },
        { uid: 'path', points: 7, rank: 3 },
        { uid: 'revolutions', points: 6, rank: 4 },
        { uid: 'reloaded', points: 5, rank: 5 },
        { uid: 'original', points: 4, rank: 6 },
        { uid: 'online', points: 3, rank: 7 },
        { uid: 'enter', points: 2, rank: 8 },
        { uid: 'revisited', points: 1, rank: 9 },
        { uid: 'comics', points: 0, rank: 10 }
      ]
    })
  })
})
