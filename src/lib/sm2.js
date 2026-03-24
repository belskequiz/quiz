export function initialCardState() {
  return {
    interval: 1,
    easeFactor: 2.5,
    repetitions: 0,
    nextReviewDate: null,
    lastReviewDate: null,
  }
}

export function applyAnswer(state, correct, todayISO) {
  let { interval, easeFactor, repetitions } = state

  if (correct) {
    repetitions += 1
    if (repetitions === 1) interval = 1
    else if (repetitions === 2) interval = 3
    else interval = Math.round(interval * easeFactor)
    easeFactor = Math.min(3.0, easeFactor + 0.1)
  } else {
    repetitions = 0
    interval = 1
    easeFactor = Math.max(1.3, easeFactor - 0.2)
  }

  const next = new Date(todayISO)
  next.setDate(next.getDate() + interval)

  return {
    ...state,
    interval,
    easeFactor: Math.round(easeFactor * 100) / 100,
    repetitions,
    nextReviewDate: next.toISOString().slice(0, 10),
    lastReviewDate: todayISO,
  }
}

export function isDue(state, todayISO) {
  if (!state.nextReviewDate) return true
  return state.nextReviewDate <= todayISO
}

export function isMastered(state) {
  return state.interval >= 21
}
