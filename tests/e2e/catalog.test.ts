import { createFlow, Flow } from '../../src'
import verifyFlowStep from '../flow/verifyFlowStep'

describe('catalog', () => {
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
        queue: 'original',
        catalog: 'online'
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
        queue: 'original',
        catalog: 'revisited'
      },
      createInitialFlow,
      queues: [false, false],
      ranking: [
        { uid: 'awakens', points: 6, rank: 1 },
        { uid: 'path', points: 5, rank: 2 },
        { uid: 'animatrix', points: 4, rank: 3 },
        { uid: 'online', points: 4, rank: 3 },
        { uid: 'enter', points: 3, rank: 4 },
        { uid: 'revolutions', points: 3, rank: 4 },
        { uid: 'reloaded', points: 2, rank: 5 },
        { uid: 'original', points: 1, rank: 6 },
        { uid: 'revisited', points: 1, rank: 6 },
        { uid: 'comics', points: 0, rank: 7 }
      ]
    })
  })

  // describe('operation4', () => {
  //   verifyFlowStep({
  //     choice: {
  //       queue: 'reloaded',
  //       catalog: 'online'
  //     },
  //     createInitialFlow,
  //     queues: [false, false, false],
  //     ranking: [
  //       { uid: 'awakens', points: 6, rank: 1 },
  //       { uid: 'animatrix', points: 5, rank: 2 },
  //       { uid: 'path', points: 5, rank: 2 },
  //       { uid: 'online', points: 4, rank: 3 },
  //       { uid: 'revolutions', points: 4, rank: 3 },
  //       { uid: 'enter', points: 3, rank: 4 },
  //       { uid: 'reloaded', points: 3, rank: 4 },
  //       { uid: 'revisited', points: 2, rank: 5 },
  //       { uid: 'original', points: 1, rank: 6 },
  //       { uid: 'comics', points: 0, rank: 7 }
  //     ]
  //   })
  // })
})
