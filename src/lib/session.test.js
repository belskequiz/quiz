import { describe, it, expect } from 'vitest'
import { buildSession } from './session'
import { initialCardState } from './sm2'

function makeCard(id, type = 'vocabulary') {
  return { id, type, word: id, definition: 'def', ...initialCardState() }
}

// Card already reviewed — appears as "due" not "new"
function makeDueCard(id, type = 'vocabulary') {
  return { id, type, word: id, definition: 'def', ...initialCardState(), lastReviewDate: '2026-03-01', nextReviewDate: '2026-03-24' }
}

describe('buildSession', () => {
  it('returns at most cardsPerSession cards', () => {
    const cards = Array.from({ length: 30 }, (_, i) => makeCard(`v${i}`))
    const session = buildSession(cards, [], '2026-03-24', { cardsPerSession: 15 })
    expect(session.length).toBeLessThanOrEqual(15)
  })

  it('includes the first 3 error card IDs (not the 4th)', () => {
    const errorIds = ['v0', 'v1', 'v2', 'v3']
    // Use reviewed cards so they don't also appear as "new" cards
    const cards = Array.from({ length: 20 }, (_, i) => makeDueCard(`v${i}`))
    const session = buildSession(cards, errorIds, '2026-03-24', { cardsPerSession: 15 })
    const sessionIds = session.map(c => c.id)
    expect(sessionIds).toContain('v0')
    expect(sessionIds).toContain('v1')
    expect(sessionIds).toContain('v2')
  })

  it('includes no more than 3 new cards (never reviewed)', () => {
    const cards = Array.from({ length: 20 }, (_, i) => makeCard(`v${i}`))
    const session = buildSession(cards, [], '2026-03-24', { cardsPerSession: 15 })
    const newCards = session.filter(c => !c.lastReviewDate)
    expect(newCards.length).toBeLessThanOrEqual(3)
  })

  it('interleaves 4 different types — no type repeats more than twice consecutively', () => {
    // Use due cards (not new) so all 24 get into the pool
    const cards = [
      ...Array.from({ length: 6 }, (_, i) => makeDueCard(`v${i}`, 'vocabulary')),
      ...Array.from({ length: 6 }, (_, i) => makeDueCard(`m${i}`, 'maths_technique')),
      ...Array.from({ length: 6 }, (_, i) => makeDueCard(`g${i}`, 'grammar')),
      ...Array.from({ length: 6 }, (_, i) => makeDueCard(`l${i}`, 'literary_device')),
    ]
    const session = buildSession(cards, [], '2026-03-24', { cardsPerSession: 12 })
    let maxRun = 1, currentRun = 1
    for (let i = 1; i < session.length; i++) {
      if (session[i].type === session[i - 1].type) currentRun++
      else currentRun = 1
      maxRun = Math.max(maxRun, currentRun)
    }
    expect(maxRun).toBeLessThanOrEqual(2)
  })
})
