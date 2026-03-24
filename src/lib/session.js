import { isDue } from './sm2'

export function buildSession(cards, recentErrorIds, todayISO, settings, excludeIds = new Set()) {
  const { cardsPerSession = 15 } = settings

  const available = cards.filter(c => !excludeIds.has(c.id))

  // Priority 1: recent errors (max 3)
  const errorCards = recentErrorIds
    .map(id => available.find(c => c.id === id))
    .filter(Boolean)
    .slice(0, 3)

  const errorIdSet = new Set(errorCards.map(c => c.id))

  // Priority 2: due cards (SM-2 scheduled)
  const dueCards = available
    .filter(c => !errorIdSet.has(c.id) && c.lastReviewDate && isDue(c, todayISO))

  // Priority 3: new cards (never reviewed) — fill remaining capacity
  const remainingSlots = cardsPerSession - errorCards.length - dueCards.length
  const newCards = available
    .filter(c => !errorIdSet.has(c.id) && !c.lastReviewDate)
    .slice(0, Math.max(remainingSlots, 0))

  const newIdSet = new Set(newCards.map(c => c.id))
  const filteredDue = dueCards.filter(c => !newIdSet.has(c.id))

  // Combine up to limit
  const pool = [...errorCards, ...filteredDue, ...newCards].slice(0, cardsPerSession)

  // Interleave types
  return interleaveByType(pool)
}

function interleaveByType(cards) {
  if (cards.length <= 1) return cards
  const byType = {}
  for (const card of cards) {
    byType[card.type] = byType[card.type] || []
    byType[card.type].push(card)
  }
  const types = Object.keys(byType)
  const result = []
  let typeIndex = 0
  let remaining = cards.length

  while (remaining > 0) {
    for (let attempt = 0; attempt < types.length; attempt++) {
      const t = types[(typeIndex + attempt) % types.length]
      if (byType[t] && byType[t].length > 0) {
        result.push(byType[t].shift())
        typeIndex = (typeIndex + attempt + 1) % types.length
        remaining--
        break
      }
    }
  }
  return result
}
