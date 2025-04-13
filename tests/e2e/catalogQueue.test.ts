import { createFlow, Flow } from '../../src'
import verifyFlowStep from '../flow/verifyFlowStep'

describe('catalogQueue', () => {
  function createInitialFlow (): Flow {
    const flow = createFlow({ uid: 'matrix a' })
    flow.items = {
      original: { label: 'original', uid: 'original', seed: 0 },
      reloaded: { label: 'reloaded', uid: 'reloaded', seed: 0 },
      revolutions: { label: 'revolutions', uid: 'revolutions', seed: 0 },
      animatrix: { label: 'animatrix', uid: 'animatrix', seed: 0 },
      revisited: { label: 'revisited', uid: 'revisited', seed: 0 },
      enter: { label: 'enter', uid: 'enter', seed: 0 },
      online: { label: 'online', uid: 'online', seed: 0 },
      path: { label: 'path', uid: 'path', seed: 0 },
      awakens: { label: 'awakens', uid: 'awakens', seed: 0 },
      comics: { label: 'comics', uid: 'comics', seed: 0 }
    }
    flow.operations = {
      operation1: {
        queue: ['original', 'reloaded', 'revolutions', 'animatrix'],
        catalog: ['revisited', 'enter', 'online', 'path', 'awakens'],
        output: ['comics'],
        uid: 'operation1'
      }
    }
    return flow
  }

  describe('operation1', () => {
    verifyFlowStep({
      choice: {
        catalog: 'online',
        queue: 'original'
      },
      createInitialFlow,
      queues: [],
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
        queue: 'original',
        catalog: 'enter'
      },
      createInitialFlow,
      queues: [false],
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
        catalog: 'revolutions',
        queue: 'online'
      },
      createInitialFlow,
      queues: [false, true],
      ranking: [
        { uid: 'animatrix', points: 6, rank: 1 },
        { uid: 'awakens', points: 6, rank: 1 },
        { uid: 'path', points: 5, rank: 2 },
        { uid: 'revolutions', points: 5, rank: 2 },
        { uid: 'online', points: 4, rank: 3 },
        { uid: 'reloaded', points: 4, rank: 3 },
        { uid: 'original', points: 3, rank: 4 },
        { uid: 'enter', points: 2, rank: 5 },
        { uid: 'revisited', points: 1, rank: 6 },
        { uid: 'comics', points: 0, rank: 7 }
      ]
    })
  })

  describe('operation4', () => {
    verifyFlowStep({
      choice: {
        queue: 'online',
        catalog: 'reloaded'
      },
      createInitialFlow,
      queues: [false, true, false],
      ranking: [
        { uid: 'animatrix', points: 7, rank: 1 },
        { uid: 'awakens', points: 6, rank: 2 },
        { uid: 'revolutions', points: 6, rank: 2 },
        { uid: 'path', points: 5, rank: 3 },
        { uid: 'online', points: 4, rank: 4 },
        { uid: 'reloaded', points: 4, rank: 4 },
        { uid: 'original', points: 3, rank: 5 },
        { uid: 'enter', points: 2, rank: 6 },
        { uid: 'revisited', points: 1, rank: 7 },
        { uid: 'comics', points: 0, rank: 8 }
      ]
    })
  })

  describe('operation5', () => {
    verifyFlowStep({
      choice: {
        catalog: 'path',
        queue: 'revolutions'
      },
      createInitialFlow,
      queues: [false, true, false, true],
      ranking: [
        { uid: 'animatrix', points: 7, rank: 1 },
        { uid: 'awakens', points: 7, rank: 1 },
        { uid: 'path', points: 6, rank: 2 },
        { uid: 'revolutions', points: 6, rank: 2 },
        { uid: 'online', points: 5, rank: 3 },
        { uid: 'reloaded', points: 4, rank: 4 },
        { uid: 'original', points: 3, rank: 5 },
        { uid: 'enter', points: 2, rank: 6 },
        { uid: 'revisited', points: 1, rank: 7 },
        { uid: 'comics', points: 0, rank: 8 }
      ]
    })
  })

  describe('operation6', () => {
    verifyFlowStep({
      choice: {
        catalog: 'animatrix',
        queue: 'awakens'
      },
      createInitialFlow,
      queues: [false, true, false, true, false],
      ranking: [
        { uid: 'animatrix', points: 8, rank: 1 },
        { uid: 'awakens', points: 8, rank: 1 },
        { uid: 'path', points: 7, rank: 2 },
        { uid: 'revolutions', points: 6, rank: 3 },
        { uid: 'online', points: 5, rank: 4 },
        { uid: 'reloaded', points: 4, rank: 5 },
        { uid: 'original', points: 3, rank: 6 },
        { uid: 'enter', points: 2, rank: 7 },
        { uid: 'revisited', points: 1, rank: 8 },
        { uid: 'comics', points: 0, rank: 9 }
      ]
    })
  })

  describe('operation7', () => {
    verifyFlowStep({
      choice: undefined,
      createInitialFlow,
      queues: [false, true, false, true, false, true],
      ranking: [
        { uid: 'awakens', points: 9, rank: 1 },
        { uid: 'animatrix', points: 8, rank: 2 },
        { uid: 'path', points: 7, rank: 3 },
        { uid: 'revolutions', points: 6, rank: 4 },
        { uid: 'online', points: 5, rank: 5 },
        { uid: 'reloaded', points: 4, rank: 6 },
        { uid: 'original', points: 3, rank: 7 },
        { uid: 'enter', points: 2, rank: 8 },
        { uid: 'revisited', points: 1, rank: 9 },
        { uid: 'comics', points: 0, rank: 10 }
      ]
    })
  })
})
