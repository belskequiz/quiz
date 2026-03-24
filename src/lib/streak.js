export function updateStreak(streak, todayISO) {
  if (streak.lastDate === todayISO) return streak // already done today

  const yesterday = new Date(todayISO)
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayISO = yesterday.toISOString().slice(0, 10)

  const current = streak.lastDate === yesterdayISO ? streak.current + 1 : 1
  const longest = Math.max(streak.longest, current)

  return { current, longest, lastDate: todayISO }
}
