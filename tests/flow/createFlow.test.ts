import { createFlow } from '../../src'

describe('createFlow', () => {
  it('should require a seed and return an object with a seed, no choice, and empty history, items, and operations', () => {
    const flow = createFlow({ seed: 'abc' })
    expect(typeof flow).toBe('object')
    expect(flow.seed).toBe('abc')
    expect(flow.choice).toBeUndefined()
    expect(typeof flow.history).toBe('array')
    expect(flow.history.length).toBe(0)
    expect(typeof flow.items).toBe('object')
    const itemKeys = Object.keys(flow.items)
    expect(itemKeys.length).toBe(0)
    expect(typeof flow.operations).toBe('object')
    const operationKeys = Object.keys(flow.operations)
    expect(operationKeys.length).toBe(0)
  })

  it('should throw an error if seed is not supplied', () => {
    // @ts-expect-error
    expect(() => createFlow({ seed: null })).toThrow('Seed is required')
  })
})
