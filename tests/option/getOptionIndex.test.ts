import { getOptionIndex, Operation } from '../../src'
import getFloorHalf from '../../src/getFloorHalf'
import getInitialOptionIndex from '../../src/getInitialOptionIndex'

describe('getOptionIndex', () => {
  it('should throw an error if better is less than 1', () => {
    const zero: Operation = {
      aInput: ['original', 'reloaded'],
      better: 0,
      bInput: ['revolutions', 'resurrections', 'animatrix', 'revisited'],
      output: [],
      uid: '123'
    }
    expect(() => getOptionIndex({ operation: zero })).toThrow()
    const negative: Operation = {
      aInput: ['original', 'reloaded'],
      better: -1,
      bInput: ['revolutions', 'resurrections', 'animatrix', 'revisited'],
      output: [],
      uid: '123'
    }
    expect(() => getOptionIndex({ operation: negative })).toThrow()
  })

  it('should throw an error if better is greater than the initial option index', () => {
    const operation: Operation = {
      aInput: ['original', 'reloaded'],
      better: 2,
      bInput: ['revolutions', 'resurrections', 'animatrix', 'revisited'],
      output: [],
      uid: '123'
    }
    const initialOptionIndex = getInitialOptionIndex({ length: 4 })
    expect(initialOptionIndex).toBe(1)
    expect(() => getOptionIndex({ operation })).toThrow()
  })

  describe('if better is undefined', () => {
    it('should return the initial option index', () => {
      const operation: Operation = {
        aInput: ['original', 'reloaded'],
        bInput: ['revolutions', 'resurrections', 'animatrix', 'revisited'],
        output: [],
        uid: '123'
      }
      const initialOptionIndex = getInitialOptionIndex({ length: 4 })
      expect(initialOptionIndex).toBe(1)
      const index = getOptionIndex({ operation })
      expect(index).toBe(initialOptionIndex)
    })
  })

  describe('if better is defined', () => {
    it('should return the floor half of better', () => {
      const operation: Operation = {
        aInput: ['original'],
        better: 3,
        bInput: ['reloaded', 'revolutions', 'resurrections', 'animatrix', 'revisited', 'enter', 'path', 'comics'],
        output: [],
        uid: '123'
      }
      if (operation.better == null) {
        throw new Error('better must be a number')
      }
      const floorHalf = getFloorHalf({ value: operation.better })
      expect(floorHalf).toBe(1)
      const index = getOptionIndex({ operation })
      expect(index).toBe(floorHalf)
    })
  })
})
