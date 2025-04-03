import { getOptionIndex, Operation } from '../../src'

describe('getOptionIndex', () => {
  it('should throw an error if better is less than 0', () => {
    const operation: Operation = {
      aInput: ['original', 'reloaded'],
      better: -1,
      bInput: ['revolutions', 'resurrections', 'animatrix', 'revisited'],
      output: [],
      uid: '123',
      worse: undefined
    }
    expect(() => getOptionIndex({ operation })).toThrow()
  })

  it('should throw an error if better is greater than the length of b minus 1', () => {
    const operation: Operation = {
      aInput: ['original', 'reloaded'],
      better: 4,
      bInput: ['revolutions', 'resurrections', 'animatrix', 'revisited'],
      output: [],
      uid: '123',
      worse: undefined
    }
    expect(() => getOptionIndex({ operation })).toThrow()
  })

  it('should throw an error if worse is less than 0', () => {
    const operation: Operation = {
      aInput: ['original', 'reloaded'],
      better: undefined,
      bInput: ['revolutions', 'resurrections', 'animatrix', 'revisited'],
      output: [],
      uid: '123',
      worse: -1
    }
    expect(() => getOptionIndex({ operation })).toThrow()
  })

  it('should throw an error if worse is greater than the length of b minus 1', () => {
    const operation: Operation = {
      aInput: ['original', 'reloaded'],
      better: undefined,
      bInput: ['revolutions', 'resurrections', 'animatrix', 'revisited'],
      output: [],
      uid: '123',
      worse: 4
    }
    expect(() => getOptionIndex({ operation })).toThrow()
  })

  describe('if better and worse are undefined', () => {
    it('should return 0', () => {
      const operation: Operation = {
        aInput: ['original', 'reloaded'],
        better: undefined,
        bInput: ['revolutions', 'resurrections', 'animatrix', 'revisited'],
        output: [],
        uid: '123',
        worse: undefined
      }
      const index = getOptionIndex({ operation })
      expect(index).toBe(0)
    })
  })

  describe('if better is 0 and worse is undefined', () => {
    it('should return the length of b minus 1', () => {
      const operation: Operation = {
        aInput: ['original', 'reloaded'],
        better: 0,
        bInput: ['revolutions', 'resurrections', 'animatrix', 'revisited'],
        output: [],
        uid: '123',
        worse: undefined
      }
      const index = getOptionIndex({ operation })
      expect(index).toBe(3)
    })
  })

  describe('if both better and worse are defined', () => {
    it('should return the average of better and worse rounded down', () => {
      const operation = {
        aInput: ['original', 'reloaded'],
        better: 0,
        bInput: ['revolutions', 'resurrections', 'animatrix', 'revisited', 'enter', 'online', 'path', 'awakens'],
        output: [],
        uid: '123',
        worse: 7
      }
      const sum = operation.better + operation.worse
      const average = sum / 2
      const rounded = Math.floor(average)
      expect(rounded).toBe(3)
      const index = getOptionIndex({ operation })
      expect(index).toBe(rounded)
    })
  })
})
