import { useState, useEffect, useRef } from 'react'
import { BookOpen, Calculator, PenTool, Brain, Lightbulb } from 'lucide-react'
import { buildSession } from '../lib/session'
import { generateQuestion } from '../lib/questions'
import { applyAnswer } from '../lib/sm2'

const TYPE_ICONS = {
  vocabulary: BookOpen,
  arithmetic: Calculator,
  grammar: PenTool,
  maths_technique: Brain,
  literary_device: BookOpen,
  strategy: Lightbulb,
}

export default function Quiz({ data, progress, updateData, onComplete }) {
  const today = new Date().toISOString().slice(0, 10)
  const recentErrors = progress.sessions.length > 0
    ? (progress.sessions[progress.sessions.length - 1].errors || [])
    : []

  const [session] = useState(() =>
    buildSession(data.cards, recentErrors, today, data.settings)
  )
  const [index, setIndex] = useState(0)
  const [question, setQuestion] = useState(null)
  const [selected, setSelected] = useState(null)
  const [inputValue, setInputValue] = useState('')
  const [answered, setAnswered] = useState(false)
  const [results, setResults] = useState([])
  const [latestCards, setLatestCards] = useState(data.cards)
  const inputRef = useRef(null)

  useEffect(() => {
    if (session.length === 0) {
      onComplete({ total: 0, correct: 0, results: [], cards: data.cards })
      return
    }
    const card = session[index]
    setQuestion(generateQuestion(card, data.cards))
    setSelected(null)
    setInputValue('')
    setAnswered(false)
  }, [index, session])

  useEffect(() => {
    if (question?.format === 'numberInput' && inputRef.current && !answered) {
      inputRef.current.focus()
    }
  }, [question, answered])

  if (!question) return null

  const card = session[index]
  const Icon = TYPE_ICONS[card.type] || BookOpen
  const isInput = question.format === 'numberInput'

  function checkAnswer(answer) {
    if (answered) return
    const correct = isInput
      ? Math.abs(parseFloat(answer) - question.correctAnswer) < 0.01
      : answer === question.correctAnswer

    setSelected(answer)
    setAnswered(true)

    const updatedCards = latestCards.map(c =>
      c.id === card.id ? { ...c, ...applyAnswer(c, correct, today) } : c
    )
    setLatestCards(updatedCards)
    updateData({ ...data, cards: updatedCards })

    setResults(prev => [...prev, { cardId: card.id, correct, card }])
  }

  function advance() {
    if (index + 1 >= session.length) {
      onComplete({
        total: session.length,
        correct: results.filter(r => r.correct).length,
        results,
        cards: latestCards,
      })
    } else {
      setIndex(i => i + 1)
    }
  }

  function handleInputSubmit(e) {
    e.preventDefault()
    if (inputValue.trim()) checkAnswer(inputValue.trim())
  }

  const pct = Math.round((index / session.length) * 100)
  const isCorrectInput = answered && isInput && Math.abs(parseFloat(selected) - question.correctAnswer) < 0.01

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col max-w-md mx-auto">
      {/* Progress bar */}
      <div className="w-full h-1.5 bg-gray-800">
        <div
          className="h-full bg-emerald-500 transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <Icon size={16} />
          <span className="capitalize">{card.type.replace('_', ' ')}</span>
        </div>
        <span className="text-gray-500 text-sm">{index + 1} / {session.length}</span>
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col px-4 gap-6 pt-4">
        {question.hint && (
          <p className="text-gray-500 text-sm">{question.hint}</p>
        )}
        <div className="bg-gray-900 rounded-2xl p-6 min-h-[120px] flex items-center">
          <p className="text-white text-xl font-medium leading-relaxed">{question.question}</p>
        </div>

        {/* Answer area */}
        {isInput ? (
          <form onSubmit={handleInputSubmit} className="flex gap-3">
            <input
              ref={inputRef}
              type="number"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              disabled={answered}
              placeholder="Your answer"
              className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-4 py-4 text-white text-xl text-center focus:outline-none focus:border-emerald-500"
            />
            {!answered && (
              <button
                type="submit"
                className="bg-emerald-500 text-black font-bold px-6 rounded-xl"
              >
                ✓
              </button>
            )}
          </form>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {question.options.map((opt, i) => {
              let cls = 'bg-gray-900 border border-gray-800 text-white'
              if (answered) {
                if (opt === question.correctAnswer) cls = 'bg-emerald-900 border border-emerald-500 text-emerald-100'
                else if (opt === selected) cls = 'bg-red-900 border border-red-500 text-red-200'
                else cls = 'bg-gray-900 border border-gray-800 text-gray-500'
              }
              return (
                <button
                  key={i}
                  onClick={() => checkAnswer(opt)}
                  disabled={answered}
                  className={`${cls} rounded-xl px-4 py-4 text-left text-base font-medium transition-all active:scale-[0.98] min-h-[56px]`}
                >
                  {opt}
                </button>
              )
            })}
          </div>
        )}

        {/* Arithmetic result */}
        {answered && isInput && (
          <div className={`rounded-xl p-4 text-center text-lg font-bold ${
            isCorrectInput ? 'bg-emerald-900 text-emerald-300' : 'bg-red-900 text-red-300'
          }`}>
            {isCorrectInput ? '✓ Correct!' : `✗ Answer: ${question.correctAnswer}`}
          </div>
        )}

        {/* Explanation */}
        {answered && question.explanation && (
          <div className="bg-gray-900 rounded-xl p-4 text-gray-400 text-sm">
            {question.explanation}
          </div>
        )}

        {/* Next button */}
        {answered && (
          <button
            onClick={advance}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-lg py-4 rounded-2xl transition-colors mb-6"
          >
            {index + 1 >= session.length ? 'See Results' : 'Next'}
          </button>
        )}
      </div>
    </div>
  )
}
