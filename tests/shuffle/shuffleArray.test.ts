import { shuffleArray } from '../../src'

describe('shuffleArray', () => {
  const numbers = [1, 2, 3]
  const shuffledNumbers = shuffleArray({ count: 0, items: numbers, seed: 'test' })

  it('accepts an array of an type of matching elements', () => {
    const everyNumber = numbers.every(number => shuffledNumbers.includes(number))
    expect(everyNumber).toBe(true)
    const letters = ['a', 'b', 'c']
    const shuffledLetters = shuffleArray({ count: 0, items: letters, seed: 'test' })
    const everyLetter = letters.every(letter => shuffledLetters.includes(letter))
    expect(everyLetter).toBe(true)
    const arrays = [[1, 2], [3, 4], [5, 6]]
    const shuffledArrays = shuffleArray({ count: 0, items: arrays, seed: 'test' })
    const everyArray = arrays.every(array => shuffledArrays.includes(array))
    expect(everyArray).toBe(true)
  })

  it('should create a predictable UUID based on the seed and count', () => {
    const sameCountSameSeed = shuffleArray({ count: 0, items: numbers, seed: 'test' })
    const sameCountDifferentSeed = shuffleArray({ count: 0, items: numbers, seed: 'different' })
    const differentCountSameSeed = shuffleArray({ count: 1, items: numbers, seed: 'test' })
    const differentCountDifferentSeed = shuffleArray({ count: 1, items: numbers, seed: 'different' })
    expect(sameCountSameSeed).toEqual(shuffledNumbers)
    expect(sameCountDifferentSeed).not.toEqual(shuffledNumbers)
    expect(differentCountSameSeed).not.toEqual(shuffledNumbers)
    expect(differentCountDifferentSeed).not.toEqual(shuffledNumbers)
  })
})
