import { createUuid } from '../../src'

describe('createUuid', () => {
  const uuid = createUuid({ seed: 'test', count: 0 })
  const sameSeedSameCount = createUuid({ seed: 'test', count: 0 })
  const sameSeedDifferentCount = createUuid({ seed: 'test', count: 1 })
  const differentSeedSameCount = createUuid({ seed: 'different', count: 0 })
  const differentSeedDifferentCount = createUuid({ seed: 'different', count: 1 })

  it('should create a UUID', () => {
    expect(uuid).toBeDefined()
    expect(uuid.length).toBe(36)
  })

  it('should create a predictable UUID based on the seed and count', () => {
    expect(uuid).toBe(sameSeedSameCount)
    expect(uuid).not.toBe(sameSeedDifferentCount)
    expect(uuid).not.toBe(differentSeedSameCount)
    expect(uuid).not.toBe(differentSeedDifferentCount)
  })
})
