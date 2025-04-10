import getInitialOptionIndex from '../../src/getInitialOptionIndex'

describe('getInitialOptionIndex', () => {
  it('should throw an error if length is not a number', () => {
    // @ts-expect-error
    expect(() => getInitialOptionIndex({ length: 'not a number' })).toThrow()
    // @ts-expect-error
    expect(() => getInitialOptionIndex({ length: null })).toThrow()
    // @ts-expect-error
    expect(() => getInitialOptionIndex({ length: undefined })).toThrow()
  })
  it('should return the floor half of the length of B minus 1', () => {
    const ten = getInitialOptionIndex({ length: 10 })
    expect(ten).toBe(4)
    const eleven = getInitialOptionIndex({ length: 11 })
    expect(eleven).toBe(5)
    const twelve = getInitialOptionIndex({ length: 12 })
    expect(twelve).toBe(5)
    const thirteen = getInitialOptionIndex({ length: 13 })
    expect(thirteen).toBe(6)
  })
})
