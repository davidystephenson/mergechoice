import { shuffleArray } from '../../src'

describe('shuffleArray', () => {
  const numbers = [1, 2, 3]
  const shuffledNumbers = shuffleArray({ count: 0, items: numbers, uid: 'test' })

  it('accepts an array of an type of matching elements', () => {
    const everyNumber = numbers.every(number => shuffledNumbers.includes(number))
    expect(everyNumber).toBe(true)
    const letters = ['a', 'b', 'c']
    const shuffledLetters = shuffleArray({ count: 0, items: letters, uid: 'test' })
    const everyLetter = letters.every(letter => shuffledLetters.includes(letter))
    expect(everyLetter).toBe(true)
    const arrays = [[1, 2], [3, 4], [5, 6]]
    const shuffledArrays = shuffleArray({ count: 0, items: arrays, uid: 'test' })
    const everyArray = arrays.every(array => shuffledArrays.includes(array))
    expect(everyArray).toBe(true)
  })

  it('should create a predictable shuffle based on the flow UID and count', () => {
    const sameCountSameUid = shuffleArray({ count: 0, items: numbers, uid: 'test' })
    const sameCountDifferentUid = shuffleArray({ count: 0, items: numbers, uid: 'different' })
    const differentCountSameUid = shuffleArray({ count: 1, items: numbers, uid: 'test' })
    const differentCountDifferentUid = shuffleArray({ count: 1, items: numbers, uid: 'different' })
    expect(sameCountSameUid).toEqual(shuffledNumbers)
    expect(sameCountDifferentUid).not.toEqual(shuffledNumbers)
    expect(differentCountSameUid).not.toEqual(shuffledNumbers)
    expect(differentCountDifferentUid).not.toEqual(shuffledNumbers)
  })
})
