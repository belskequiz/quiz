import { useState } from 'react'
import { ArrowLeft, List, BarChart2, Settings } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const TABS = [
  { id: 'cards', label: 'Cards', Icon: List },
  { id: 'stats', label: 'Stats', Icon: BarChart2 },
  { id: 'settings', label: 'Settings', Icon: Settings },
]

export default function Admin({ data, progress, updateData, updateProgress, setScreen }) {
  const [pin, setPin] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [pinError, setPinError] = useState(false)
  const [tab, setTab] = useState('cards')

  function tryPin(e) {
    e.preventDefault()
    if (pin === data.settings.pin) {
      setUnlocked(true)
    } else {
      setPinError(true)
      setPin('')
      setTimeout(() => setPinError(false), 1500)
    }
  }

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center gap-6 px-4">
        <button onClick={() => setScreen('dashboard')} className="absolute top-4 left-4 text-gray-600">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-white text-2xl font-bold">Admin</h2>
        <form onSubmit={tryPin} className="flex flex-col gap-4 w-full max-w-xs">
          <input
            type="password"
            inputMode="numeric"
            maxLength={4}
            value={pin}
            onChange={e => setPin(e.target.value)}
            placeholder="PIN"
            className={`bg-gray-900 border ${pinError ? 'border-red-500' : 'border-gray-700'} rounded-xl px-4 py-4 text-white text-center text-2xl tracking-widest focus:outline-none`}
            autoFocus
          />
          <button type="submit" className="bg-emerald-500 text-black font-bold py-3 rounded-xl">
            Enter
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col max-w-md mx-auto">
      <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-800">
        <button onClick={() => setScreen('dashboard')} className="text-gray-500">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-white font-bold text-lg">Admin</h1>
      </div>

      <div className="flex border-b border-gray-800">
        {TABS.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex-1 flex flex-col items-center py-3 gap-1 text-xs transition-colors ${
              tab === id ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-gray-600'
            }`}
          >
            <Icon size={18} />
            {label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        {tab === 'cards' && <CardListTab data={data} updateData={updateData} />}
        {tab === 'stats' && <StatsTab data={data} progress={progress} />}
        {tab === 'settings' && <SettingsTab data={data} progress={progress} updateData={updateData} updateProgress={updateProgress} />}
      </div>
    </div>
  )
}

// --- Card List Tab ---
function CardListTab({ data, updateData }) {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [editId, setEditId] = useState(null)

  const types = ['all', 'vocabulary', 'literary_device', 'grammar', 'maths_technique', 'arithmetic', 'strategy']
  const filtered = data.cards.filter(c => {
    const matchType = typeFilter === 'all' || c.type === typeFilter
    const text = JSON.stringify(c).toLowerCase()
    const matchSearch = !search || text.includes(search.toLowerCase())
    return matchType && matchSearch
  })

  function deleteCard(id) {
    if (!confirm('Delete this card?')) return
    updateData({ ...data, cards: data.cards.filter(c => c.id !== id) })
  }

  return (
    <div className="p-4 flex flex-col gap-4">
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search cards..."
        className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none"
      />
      <div className="flex gap-2 overflow-x-auto pb-1">
        {types.map(t => (
          <button
            key={t}
            onClick={() => setTypeFilter(t)}
            className={`shrink-0 px-3 py-1 rounded-full text-xs transition-colors ${
              typeFilter === t ? 'bg-emerald-500 text-black' : 'bg-gray-800 text-gray-400'
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <p className="text-gray-600 text-sm">{filtered.length} cards</p>
      <div className="flex flex-col gap-2">
        {filtered.map(card => (
          <div key={card.id} className="bg-gray-900 rounded-xl p-4 flex flex-col gap-2">
            <div className="flex justify-between items-start gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">
                  {card.word || card.term || card.question || card.suffix || card.id}
                </p>
                <p className="text-gray-500 text-xs mt-0.5 line-clamp-2">
                  {card.definition || card.method || String(card.answer ?? '')}
                </p>
                <p className="text-gray-700 text-xs mt-1">
                  {card.type} · rep {card.repetitions ?? 0} · interval {card.interval ?? 1}d
                </p>
              </div>
              <div className="flex gap-3 shrink-0">
                <button
                  onClick={() => setEditId(editId === card.id ? null : card.id)}
                  className="text-blue-600 hover:text-blue-400 text-xs"
                >
                  {editId === card.id ? 'Cancel' : 'Edit'}
                </button>
                <button
                  onClick={() => deleteCard(card.id)}
                  className="text-red-800 hover:text-red-500 text-xs"
                >
                  Delete
                </button>
              </div>
            </div>
            {editId === card.id && (
              <CardInlineEdit
                card={card}
                data={data}
                updateData={updateData}
                onDone={() => setEditId(null)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function CardInlineEdit({ card, data, updateData, onDone }) {
  const editableKeys = ['word','term','question','definition','definitionSimple','exampleSentence','method','example','answer']
  const [form, setForm] = useState(
    Object.fromEntries(
      editableKeys
        .filter(k => card[k] !== undefined)
        .map(k => [k, Array.isArray(card[k]) ? card[k].join(', ') : String(card[k])])
    )
  )

  function save() {
    const updated = { ...card }
    editableKeys.forEach(k => {
      if (form[k] === undefined) return
      if (Array.isArray(card[k])) {
        updated[k] = form[k].split(',').map(s => s.trim()).filter(Boolean)
      } else {
        updated[k] = form[k]
      }
    })
    updateData({ ...data, cards: data.cards.map(c => c.id === card.id ? updated : c) })
    onDone()
  }

  return (
    <div className="flex flex-col gap-2 pt-2 border-t border-gray-800">
      {Object.keys(form).map(k => (
        <div key={k} className="flex flex-col gap-0.5">
          <label className="text-gray-600 text-xs">{k}</label>
          <input
            value={form[k]}
            onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))}
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none"
          />
        </div>
      ))}
      <button onClick={save} className="bg-emerald-500 text-black font-bold py-2 rounded-lg text-sm">
        Save
      </button>
    </div>
  )
}

// --- Stats Tab ---
function getWeeklyMasteredData(sessions) {
  const weekMap = {}
  sessions.forEach(s => {
    const d = new Date(s.date)
    const week = `W${Math.ceil(d.getDate() / 7)}-${d.getMonth() + 1}`
    weekMap[week] = (weekMap[week] || 0) + (s.newlyMastered || 0)
  })
  return Object.entries(weekMap).map(([week, count]) => ({ week, count })).slice(-8)
}

function StatsTab({ data, progress }) {
  const sessionData = progress.sessions.slice(-20).map((s, i) => ({
    name: `#${i + 1}`,
    pct: s.pct,
  }))

  const masteredCount = data.cards.filter(c => c.interval >= 21).length
  const byType = data.cards.reduce((acc, c) => {
    acc[c.type] = (acc[c.type] || 0) + 1
    return acc
  }, {})
  const weeklyData = getWeeklyMasteredData(progress.sessions)

  return (
    <div className="p-4 flex flex-col gap-6">
      <div className="flex gap-4">
        <Stat label="Streak" value={progress.streak.current} />
        <Stat label="Best" value={progress.streak.longest} />
        <Stat label="Stars" value={progress.totalStars} />
        <Stat label="Mastered" value={masteredCount} />
      </div>

      {sessionData.length > 1 && (
        <div>
          <p className="text-gray-500 text-xs mb-2">Score per session (%)</p>
          <ResponsiveContainer width="100%" height={120}>
            <LineChart data={sessionData}>
              <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 10 }} />
              <YAxis domain={[0, 100]} tick={{ fill: '#6b7280', fontSize: 10 }} />
              <Tooltip contentStyle={{ background: '#111827', border: 'none' }} />
              <Line type="monotone" dataKey="pct" stroke="#10b981" dot={false} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {weeklyData.some(d => d.count > 0) && (
        <div>
          <p className="text-gray-500 text-xs mb-2">Cards mastered per week</p>
          <ResponsiveContainer width="100%" height={100}>
            <BarChart data={weeklyData}>
              <XAxis dataKey="week" tick={{ fill: '#6b7280', fontSize: 10 }} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} allowDecimals={false} />
              <Tooltip contentStyle={{ background: '#111827', border: 'none' }} />
              <Bar dataKey="count" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <div>
        <p className="text-gray-500 text-xs mb-2">Cards by type</p>
        <div className="flex flex-col gap-2">
          {Object.entries(byType).map(([type, count]) => (
            <div key={type} className="flex justify-between text-sm">
              <span className="text-gray-400 capitalize">{type.replace('_', ' ')}</span>
              <span className="text-white">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="flex-1 bg-gray-900 rounded-xl p-3 flex flex-col items-center gap-1">
      <span className="text-white font-bold text-xl">{value}</span>
      <span className="text-gray-600 text-xs">{label}</span>
    </div>
  )
}

// --- Settings Tab ---
function SettingsTab({ data, updateData, progress, updateProgress }) {
  const [newPin, setNewPin] = useState('')
  const [pinSaved, setPinSaved] = useState(false)
  const [resetConfirm, setResetConfirm] = useState(false)
  const [clearProgressConfirm, setClearProgressConfirm] = useState(false)
  const [restoreError, setRestoreError] = useState('')

  function exportBackup() {
    const backup = { data, progress, exportedAt: new Date().toISOString() }
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `quiz-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  function importBackup(e) {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (evt) => {
      try {
        const backup = JSON.parse(evt.target.result)
        if (!backup.data || !backup.progress) throw new Error('Invalid backup file')
        localStorage.setItem('quiz-data', JSON.stringify(backup.data))
        localStorage.setItem('quiz-progress', JSON.stringify(backup.progress))
        window.location.reload()
      } catch {
        setRestoreError('Invalid backup file')
        setTimeout(() => setRestoreError(''), 3000)
      }
    }
    reader.readAsText(file)
  }

  function savePin() {
    if (newPin.length !== 4) return
    updateData({ ...data, settings: { ...data.settings, pin: newPin } })
    setNewPin('')
    setPinSaved(true)
    setTimeout(() => setPinSaved(false), 2000)
  }

  function setCardsPerSession(n) {
    updateData({ ...data, settings: { ...data.settings, cardsPerSession: n } })
  }

  function setStarThreshold(n) {
    updateData({ ...data, settings: {
      ...data.settings,
      starThreshold: n,
      thresholdChangeDate: new Date().toISOString().slice(0, 10),
    }})
  }

  function clearProgress() {
    const settings = data.settings
    localStorage.clear()
    localStorage.setItem('quiz-settings-preserved', JSON.stringify(settings))
    window.location.reload()
  }

  function resetAll() {
    localStorage.clear()
    window.location.reload()
  }

  return (
    <div className="p-4 flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-gray-400 text-sm font-medium">Change PIN</label>
        <div className="flex gap-3">
          <input
            type="password"
            inputMode="numeric"
            maxLength={4}
            value={newPin}
            onChange={e => setNewPin(e.target.value)}
            placeholder="New 4-digit PIN"
            className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-center tracking-widest focus:outline-none"
          />
          <button
            onClick={savePin}
            className={`px-4 rounded-xl font-bold transition-colors ${pinSaved ? 'bg-emerald-700 text-white' : 'bg-emerald-500 text-black'}`}
          >
            {pinSaved ? '✓' : 'Save'}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-gray-400 text-sm font-medium">Star threshold</label>
        <p className="text-gray-600 text-xs">Score needed to earn a daily star</p>
        <div className="flex gap-3">
          {[60, 70, 80].map(n => (
            <button key={n} onClick={() => setStarThreshold(n)}
              className={`flex-1 py-3 rounded-xl font-bold transition-colors ${
                data.settings.starThreshold === n ? 'bg-emerald-500 text-black' : 'bg-gray-800 text-gray-400'
              }`}>
              {n}%
            </button>
          ))}
        </div>
        {data.settings.thresholdChangeDate && (
          <p className="text-gray-600 text-xs">Last changed: {data.settings.thresholdChangeDate}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-gray-400 text-sm font-medium">Cards per session</label>
        <div className="flex gap-3">
          {[10, 15, 20].map(n => (
            <button key={n} onClick={() => setCardsPerSession(n)}
              className={`flex-1 py-3 rounded-xl font-bold transition-colors ${
                data.settings.cardsPerSession === n ? 'bg-emerald-500 text-black' : 'bg-gray-800 text-gray-400'
              }`}>
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Backup / Restore */}
      <div className="flex flex-col gap-3 pt-4 border-t border-gray-800">
        <label className="text-gray-400 text-sm font-medium">Backup & Restore</label>
        <button
          onClick={exportBackup}
          className="bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-xl text-sm font-medium transition-colors"
        >
          Save backup to file
        </button>
        <label className="bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-xl text-sm font-medium text-center cursor-pointer transition-colors">
          Restore from backup file
          <input type="file" accept=".json" onChange={importBackup} className="hidden" />
        </label>
        {restoreError && <p className="text-red-400 text-xs">{restoreError}</p>}
      </div>

      <div className="flex flex-col gap-2 pt-4 border-t border-gray-800">
        {!clearProgressConfirm ? (
          <button onClick={() => setClearProgressConfirm(true)} className="text-red-700 text-sm py-3">
            Clear progress…
          </button>
        ) : (
          <div className="flex flex-col gap-2">
            <p className="text-red-400 text-sm">This will erase all progress and reload cards fresh from the website. Settings (PIN, thresholds) are kept. Are you sure?</p>
            <div className="flex gap-3">
              <button onClick={clearProgress} className="flex-1 bg-red-700 text-white font-bold py-3 rounded-xl">
                Yes, clear
              </button>
              <button onClick={() => setClearProgressConfirm(false)} className="flex-1 bg-gray-800 text-white py-3 rounded-xl">
                Cancel
              </button>
            </div>
          </div>
        )}
        {!resetConfirm ? (
          <button onClick={() => setResetConfirm(true)} className="text-red-700 text-sm py-3">
            Reset all data…
          </button>
        ) : (
          <div className="flex flex-col gap-2">
            <p className="text-red-400 text-sm">This will erase ALL progress and cards. Are you sure?</p>
            <div className="flex gap-3">
              <button onClick={resetAll} className="flex-1 bg-red-700 text-white font-bold py-3 rounded-xl">
                Yes, reset
              </button>
              <button onClick={() => setResetConfirm(false)} className="flex-1 bg-gray-800 text-white py-3 rounded-xl">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
