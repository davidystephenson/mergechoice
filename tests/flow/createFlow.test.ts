import { createFlow } from '../../src'

describe('createFlow', () => {
  it('should require a seed and return an object with a seed, no choice, 0 operation count, and empty history, items, and operations', () => {
    const flow = createFlow({ seed: 'abc' })
    expect(typeof flow).toBe('object')
    expect(flow.seed).toBe('abc')
    expect(flow.choice).toBeUndefined()
    const historyArrayed = Array.isArray(flow.history)
    expect(historyArrayed).toBe(true)
    expect(flow.history.length).toBe(0)
    expect(flow.items).toBeDefined()
    expect(typeof flow.items).toBe('object')
    const itemKeys = Object.keys(flow.items)
    expect(itemKeys.length).toBe(0)
    expect(flow.operations).toBeDefined()
    expect(typeof flow.operations).toBe('object')
    const operationKeys = Object.keys(flow.operations)
    expect(operationKeys.length).toBe(0)
    expect(flow.operationCount).toBe(0)
  })

  it('should throw an error if seed is not supplied', () => {
    // @ts-expect-error
    expect(() => createFlow({ seed: null })).toThrow('Seed is required')
  })

  it('should throw an error if seed is not a string', () => {
    // @ts-expect-error
    expect(() => createFlow({ seed: 123 })).toThrow('Seed must be a string')
  })
})
