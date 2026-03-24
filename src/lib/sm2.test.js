import { describe, it, expect } from 'vitest'
import { applyAnswer, isDue, isMastered, initialCardState } from './sm2'

describe('initialCardState', () => {
  it('returns correct defaults', () => {
    const s = initialCardState()
    expect(s.interval).toBe(1)
    expect(s.easeFactor).toBe(2.5)
    expect(s.repetitions).toBe(0)
    expect(s.nextReviewDate).toBeNull()
  })
})

describe('applyAnswer - correct', () => {
  it('first correct: interval=1, repetitions=1', () => {
    const s = applyAnswer(initialCardState(), true, '2026-03-24')
    expect(s.repetitions).toBe(1)
    expect(s.interval).toBe(1)
    expect(s.easeFactor).toBe(2.6)
  })

  it('second correct: interval=3', () => {
    let s = applyAnswer(initialCardState(), true, '2026-03-24')
    s = applyAnswer(s, true, '2026-03-25')
    expect(s.repetitions).toBe(2)
    expect(s.interval).toBe(3)
  })

  it('third correct: interval = round(prev_interval * prev_easeFactor)', () => {
    // After 2nd correct: interval=3, easeFactor=2.7
    // After 3rd correct: interval = round(3 * 2.7) = round(8.1) = 8
    let s = applyAnswer(initialCardState(), true, '2026-03-24')
    s = applyAnswer(s, true, '2026-03-25')
    s = applyAnswer(s, true, '2026-03-28')
    expect(s.repetitions).toBe(3)
    expect(s.interval).toBe(8)  // round(3 * 2.7) = 8
  })

  it('easeFactor caps at 3.0', () => {
    let s = { ...initialCardState(), easeFactor: 2.95 }
    s = applyAnswer(s, true, '2026-03-24')
    expect(s.easeFactor).toBe(3.0)
  })
})

describe('applyAnswer - wrong', () => {
  it('resets repetitions and interval', () => {
    let s = applyAnswer(initialCardState(), true, '2026-03-24')
    s = applyAnswer(s, true, '2026-03-25')
    s = applyAnswer(s, false, '2026-03-28')
    expect(s.repetitions).toBe(0)
    expect(s.interval).toBe(1)
  })

  it('reduces easeFactor, min 1.3', () => {
    let s = { ...initialCardState(), easeFactor: 1.3 }
    s = applyAnswer(s, false, '2026-03-24')
    expect(s.easeFactor).toBe(1.3)
  })
})

describe('isDue', () => {
  it('card with null nextReviewDate is due', () => {
    expect(isDue(initialCardState(), '2026-03-24')).toBe(true)
  })

  it('card due today is due', () => {
    const s = { ...initialCardState(), nextReviewDate: '2026-03-24' }
    expect(isDue(s, '2026-03-24')).toBe(true)
  })

  it('card due tomorrow is not due', () => {
    const s = { ...initialCardState(), nextReviewDate: '2026-03-25' }
    expect(isDue(s, '2026-03-24')).toBe(false)
  })
})

describe('isMastered', () => {
  it('interval >= 21 is mastered', () => {
    const s = { ...initialCardState(), interval: 21 }
    expect(isMastered(s)).toBe(true)
  })

  it('interval < 21 is not mastered', () => {
    const s = { ...initialCardState(), interval: 20 }
    expect(isMastered(s)).toBe(false)
  })
})
