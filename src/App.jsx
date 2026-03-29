import { useState, useEffect, useCallback } from 'react'
import { loadData, saveData, loadProgress, saveProgress } from './lib/storage'
import { initialCardState } from './lib/sm2'
import Dashboard from './screens/Dashboard'
import Quiz from './screens/Quiz'
import Results from './screens/Results'
import Admin from './screens/Admin'

const DEFAULT_SETTINGS = {
  pin: '1234',
  starThreshold: 60,
  cardsPerSession: 15,
  thresholdChangeDate: null,
}

const DEFAULT_PROGRESS = {
  sessions: [],
  streak: { current: 0, longest: 0, lastDate: null },
  totalStars: 0,
  dailyLog: {},
}

export default function App() {
  const [screen, setScreen] = useState('loading')
  const [data, setData] = useState(null)
  const [progress, setProgress] = useState(null)
  const [sessionResults, setSessionResults] = useState(null)
  const [bonusConfig, setBonusConfig] = useState(null)

  useEffect(() => { initialise() }, [])

  async function initialise() {
    const today = new Date().toISOString().slice(0, 10)
    let appData = await loadData()
    if (!appData) {
      const preservedSettings = (() => {
        try {
          const s = localStorage.getItem('quiz-settings-preserved')
          localStorage.removeItem('quiz-settings-preserved')
          return s ? JSON.parse(s) : null
        } catch { return null }
      })()
      try {
        const res = await fetch(import.meta.env.BASE_URL + 'cards.json')
        const { cards: seedCards } = await res.json()
        appData = {
          cards: seedCards.map(c => ({ ...initialCardState(), addedAt: today, ...c })),
          settings: preservedSettings ?? DEFAULT_SETTINGS,
        }
        await saveData(appData)
      } catch (e) {
        console.error('Failed to load cards.json', e)
        appData = { cards: [], settings: DEFAULT_SETTINGS }
        await saveData(appData)
      }
    } else {
      // Merge new cards from remote cards.json
      try {
        const res = await fetch(import.meta.env.BASE_URL + 'cards.json')
        const { cards: remoteCards } = await res.json()
        const existingIds = new Set(appData.cards.map(c => c.id))
        const newCards = remoteCards
          .filter(c => !existingIds.has(c.id))
          .map(c => ({ ...initialCardState(), addedAt: today, ...c }))
        if (newCards.length > 0) {
          appData = { ...appData, cards: [...appData.cards, ...newCards] }
          await saveData(appData)
        }
      } catch { /* offline — continue with existing data */ }
    }

    let prog = await loadProgress()
    if (!prog) {
      prog = DEFAULT_PROGRESS
      await saveProgress(prog)
    }

    setData(appData)
    setProgress(prog)
    setScreen('dashboard')
  }

  const updateData = useCallback(async (newData) => {
    setData(newData)
    await saveData(newData)
  }, [])

  const updateProgress = useCallback(async (newProgress) => {
    setProgress(newProgress)
    await saveProgress(newProgress)
  }, [])

  const handleSessionComplete = useCallback((results) => {
    setSessionResults({ ...results, isBonus: bonusConfig != null })
    setBonusConfig(null)
    setScreen('results')
  }, [bonusConfig])

  const handleContinue = useCallback(() => {
    setBonusConfig({
      seenIds: new Set(sessionResults.results.map(r => r.cardId)),
    })
    setScreen('quiz')
  }, [sessionResults])

  if (screen === 'loading') {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white text-xl animate-pulse">Loading...</div>
      </div>
    )
  }

  const props = { data, progress, updateData, updateProgress, setScreen }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {screen === 'dashboard' && <Dashboard {...props} />}
      {screen === 'quiz' && <Quiz {...props} onComplete={handleSessionComplete} bonusConfig={bonusConfig} />}
      {screen === 'results' && <Results {...props} results={sessionResults} onContinue={handleContinue} />}
      {screen === 'admin' && <Admin {...props} />}
    </div>
  )
}
