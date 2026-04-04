import { Flame, Star, Trophy, Settings } from 'lucide-react'
import { isMastered, isDue } from '../lib/sm2'

function getWeeklyStars(dailyLog) {
  const now = new Date()
  const day = now.getDay() // 0=Sun, 1=Mon...
  const monday = new Date(now)
  monday.setDate(now.getDate() - ((day + 6) % 7))
  monday.setHours(0, 0, 0, 0)

  let count = 0
  for (const [date, entry] of Object.entries(dailyLog)) {
    if (entry.star && new Date(date + 'T00:00:00') >= monday) count++
  }
  return count
}

export default function Dashboard({ data, progress, setScreen }) {
  const today = new Date().toISOString().slice(0, 10)
  const todayLog = progress.dailyLog[today]
  const starEarned = todayLog?.star ?? false
  const weeklyStars = getWeeklyStars(progress.dailyLog)

  const dueCount = data.cards.filter(c => isDue(c, today)).length
  const masteredCount = data.cards.filter(c => isMastered(c)).length
  const totalCount = data.cards.length

  const streakActive = progress.streak.current > 0

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-between p-6 max-w-md mx-auto">
      {/* Header */}
      <div className="w-full flex justify-end">
        <button
          onClick={() => setScreen('admin')}
          className="p-2 text-gray-600 hover:text-gray-400 transition-colors"
          aria-label="Admin"
        >
          <Settings size={20} />
        </button>
      </div>

      {/* Main Stats */}
      <div className="flex-1 flex flex-col items-center justify-center gap-8 w-full">
        {/* Streak */}
        <div className="flex flex-col items-center gap-2">
          <div className={`text-8xl font-black transition-all ${streakActive ? 'text-orange-400' : 'text-gray-700'}`}>
            {progress.streak.current}
          </div>
          <div className="flex items-center gap-2 text-lg text-gray-400">
            <Flame size={20} className={streakActive ? 'text-orange-400' : 'text-gray-600'} />
            <span>day streak</span>
          </div>
        </div>

        {/* Star & Cards Info */}
        <div className="flex gap-6">
          <div className="flex flex-col items-center gap-1">
            <Star
              size={32}
              className={starEarned ? 'text-yellow-400 fill-yellow-400' : 'text-gray-700'}
            />
            <span className="text-xs text-gray-500">today</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-bold text-yellow-400">{weeklyStars}</span>
            <span className="text-xs text-gray-500">this week</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-bold text-yellow-400">{progress.totalStars}</span>
            <span className="text-xs text-gray-500">total stars</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-bold text-emerald-400">{dueCount}</span>
            <span className="text-xs text-gray-500">cards due</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1">
              <Trophy size={20} className="text-yellow-600" />
              <span className="text-2xl font-bold text-yellow-600">{masteredCount}</span>
            </div>
            <span className="text-xs text-gray-500">mastered / {totalCount}</span>
          </div>
        </div>
      </div>

      {/* Start Button */}
      <div className="w-full pb-4">
        {todayLog?.completed && (
          <div className="text-center text-gray-500 text-sm mb-4">
            Session complete for today ✓
          </div>
        )}
        <button
          onClick={() => setScreen('quiz')}
          className="w-full bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-black font-bold text-xl py-5 rounded-2xl transition-colors"
        >
          {todayLog?.completed ? 'Practice Again' : 'Start Quiz'}
        </button>
      </div>
    </div>
  )
}
