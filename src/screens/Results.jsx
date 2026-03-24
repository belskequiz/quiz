import { useState } from 'react'
import { Star, Flame, ChevronDown, ChevronUp, Trophy } from 'lucide-react'
import { updateStreak } from '../lib/streak'
import { isMastered } from '../lib/sm2'

export default function Results({ data, progress, updateProgress, setScreen, results, onContinue }) {
  const [errorsOpen, setErrorsOpen] = useState(false)
  const today = new Date().toISOString().slice(0, 10)

  const { total, correct, results: cardResults, cards: updatedCards } = results
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0
  const starEarned = pct >= data.settings.starThreshold

  // Cards that newly crossed the mastered threshold this session
  const newlyMastered = cardResults.filter(r => {
    if (!r.correct) return false
    const updated = updatedCards?.find(c => c.id === r.cardId)
    const previous = data.cards.find(c => c.id === r.cardId)
    return updated && isMastered(updated) && previous && !isMastered(previous)
  })

  // Update progress (once on mount via lazy init)
  const [newProgress] = useState(() => {
    const newStreak = updateStreak(progress.streak, today)
    const newStars = progress.totalStars + (starEarned ? 1 : 0)
    const errors = cardResults.filter(r => !r.correct).map(r => r.cardId)
    const session = {
      date: today,
      total,
      correct,
      pct,
      star: starEarned,
      errors,
      newlyMastered: newlyMastered.length,
    }
    const updated = {
      ...progress,
      streak: newStreak,
      totalStars: newStars,
      sessions: [...progress.sessions, session],
      dailyLog: {
        ...progress.dailyLog,
        [today]: { completed: true, star: starEarned, pct },
      },
    }
    updateProgress(updated)
    return updated
  })

  const pctColor = pct >= 70 ? 'text-emerald-400' : pct >= 50 ? 'text-yellow-400' : 'text-red-400'
  const errors = cardResults.filter(r => !r.correct)

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center px-4 py-8 max-w-md mx-auto gap-8">
      {/* Score */}
      <div className="flex flex-col items-center gap-2">
        <span className={`text-7xl font-black ${pctColor}`}>{pct}%</span>
        <span className="text-gray-400">{correct} / {total} correct</span>
      </div>

      {/* Star + Streak */}
      <div className="flex gap-8 items-center">
        {starEarned && (
          <div className="flex flex-col items-center gap-1">
            <Star size={40} className="text-yellow-400 fill-yellow-400" />
            <span className="text-yellow-400 text-sm font-medium">Star earned!</span>
          </div>
        )}
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-2">
            <Flame size={28} className="text-orange-400" />
            <span className="text-3xl font-bold text-orange-400">{newProgress.streak.current}</span>
          </div>
          <span className="text-gray-500 text-sm">day streak</span>
        </div>
      </div>

      {/* Newly mastered */}
      {newlyMastered.length > 0 && (
        <div className="flex items-center gap-2 text-yellow-500">
          <Trophy size={20} />
          <span className="font-medium">Mastered today: +{newlyMastered.length}</span>
        </div>
      )}

      {/* Errors (collapsible) */}
      {errors.length > 0 && (
        <div className="w-full bg-gray-900 rounded-2xl overflow-hidden">
          <button
            className="w-full flex items-center justify-between px-4 py-3 text-gray-400"
            onClick={() => setErrorsOpen(o => !o)}
          >
            <span>Missed: {errors.length} card{errors.length !== 1 ? 's' : ''}</span>
            {errorsOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          {errorsOpen && (
            <div className="px-4 pb-4 flex flex-col gap-3">
              {errors.map(({ card, cardId }) => (
                <div key={cardId} className="border-t border-gray-800 pt-3">
                  <p className="text-white font-medium">
                    {card?.word || card?.term || card?.question || cardId}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    {card?.definition || card?.method || card?.answer || ''}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="flex-1" />

      {onContinue && (
        <button
          onClick={onContinue}
          className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-lg py-4 rounded-2xl transition-colors"
        >
          5 more cards
        </button>
      )}
      <button
        onClick={() => setScreen('dashboard')}
        className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold text-lg py-4 rounded-2xl transition-colors"
      >
        Done
      </button>
    </div>
  )
}
