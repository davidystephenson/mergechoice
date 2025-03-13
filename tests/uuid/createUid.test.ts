import { createUid } from '../../src'

describe('createUid', () => {
  const uid = createUid({ uid: 'test', count: 0 })
  const sameUidSameCount = createUid({ uid: 'test', count: 0 })
  const sameUidDifferentCount = createUid({ uid: 'test', count: 1 })
  const differentUidSameCount = createUid({ uid: 'different', count: 0 })
  const differentUidDifferentCount = createUid({ uid: 'different', count: 1 })

  it('should create a UID', () => {
    expect(uid).toBeDefined()
    expect(uid.length).toBe(36)
  })

  it('should create a predictable UID based on the input UID and count', () => {
    expect(uid).toBe(sameUidSameCount)
    expect(uid).not.toBe(sameUidDifferentCount)
    expect(uid).not.toBe(differentUidSameCount)
    expect(uid).not.toBe(differentUidDifferentCount)
  })
})
