import { createFlow } from '../src/index'

describe('createFlow', () => {
  it('should require a seed and return an object', () => {
    const flow = createFlow({ seed: 'abc' })
    expect(typeof flow).toBe('object')
    expect(flow.seed).toBe('abc')
  })

  it('should throw an error if seed is not supplied', () => {
    // @ts-expect-error
    expect(() => createFlow({ seed: null })).toThrow('Seed is required')
  })
})
