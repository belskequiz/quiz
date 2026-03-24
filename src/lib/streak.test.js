import { describe, it, expect } from 'vitest'
import { updateStreak } from './streak'

describe('updateStreak', () => {
  it('first ever session starts streak at 1', () => {
    const result = updateStreak({ current: 0, longest: 0, lastDate: null }, '2026-03-24')
    expect(result.current).toBe(1)
    expect(result.lastDate).toBe('2026-03-24')
  })

  it('consecutive day increments streak', () => {
    const result = updateStreak({ current: 3, longest: 5, lastDate: '2026-03-23' }, '2026-03-24')
    expect(result.current).toBe(4)
    expect(result.longest).toBe(5)
  })

  it('same day does not increment streak', () => {
    const result = updateStreak({ current: 3, longest: 5, lastDate: '2026-03-24' }, '2026-03-24')
    expect(result.current).toBe(3)
  })

  it('gap of more than 1 day resets streak', () => {
    const result = updateStreak({ current: 5, longest: 10, lastDate: '2026-03-20' }, '2026-03-24')
    expect(result.current).toBe(1)
  })

  it('updates longest when current exceeds it', () => {
    const result = updateStreak({ current: 5, longest: 5, lastDate: '2026-03-23' }, '2026-03-24')
    expect(result.longest).toBe(6)
  })
})
