import { useState } from 'react'
import { ArrowLeft, Plus, List, Upload, BarChart2, Settings } from 'lucide-react'
import { initialCardState } from '../lib/sm2'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const TABS = [
  { id: 'cards', label: 'Cards', Icon: List },
  { id: 'add', label: 'Add', Icon: Plus },
  { id: 'import', label: 'Import', Icon: Upload },
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
        {tab === 'add' && <AddCardTab data={data} updateData={updateData} />}
        {tab === 'import' && <ImportTab data={data} updateData={updateData} />}
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

// --- Add Card Tab ---
function AddCardTab({ data, updateData }) {
  const [type, setType] = useState('vocabulary')
  const [form, setForm] = useState({})
  const [saved, setSaved] = useState(false)

  function set(key, val) { setForm(f => ({ ...f, [key]: val })) }

  function save() {
    const id = `${type}_${Date.now()}`
    const card = { id, type, ...initialCardState(), ...form }
    updateData({ ...data, cards: [...data.cards, card] })
    setForm({})
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="p-4 flex flex-col gap-4">
      <select
        value={type}
        onChange={e => { setType(e.target.value); setForm({}) }}
        className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white"
      >
        <option value="vocabulary">Vocabulary</option>
        <option value="literary_device">Literary Device</option>
        <option value="grammar">Grammar</option>
        <option value="maths_technique">Maths Technique</option>
        <option value="strategy">Strategy</option>
      </select>

      {type === 'vocabulary' && <>
        <Field label="Word" value={form.word || ''} onChange={v => set('word', v)} />
        <Field label="Definition" value={form.definition || ''} onChange={v => set('definition', v)} />
        <Field label="Simple definition" value={form.definitionSimple || ''} onChange={v => set('definitionSimple', v)} />
        <Field label="Example sentence" value={form.exampleSentence || ''} onChange={v => set('exampleSentence', v)} />
        <Field
          label="Synonyms (comma-separated)"
          value={form.synonymsRaw || ''}
          onChange={v => { set('synonymsRaw', v); set('synonyms', v.split(',').map(s => s.trim()).filter(Boolean)) }}
        />
      </>}

      {type === 'literary_device' && <>
        <Field label="Term" value={form.term || ''} onChange={v => set('term', v)} />
        <Field label="Definition" value={form.definition || ''} onChange={v => set('definition', v)} />
        <Field label="Example" value={form.example || ''} onChange={v => set('example', v)} />
      </>}

      {type === 'maths_technique' && <>
        <Field label="Question" value={form.question || ''} onChange={v => set('question', v)} />
        <Field label="Method" value={form.method || ''} onChange={v => set('method', v)} textarea />
        <Field label="Example" value={form.example || ''} onChange={v => set('example', v)} />
      </>}

      {type === 'strategy' && <>
        <Field label="Question" value={form.question || ''} onChange={v => set('question', v)} />
        <Field label="Correct answer" value={form.answer || ''} onChange={v => set('answer', v)} textarea />
      </>}

      {type === 'grammar' && <>
        <Field label="Subtype (suffix or term)" value={form.subtype || ''} onChange={v => set('subtype', v)} />
        <Field label="Suffix or Term" value={form.suffix || form.term || ''} onChange={v => { set('suffix', v); set('term', v) }} />
        <Field label="Part of Speech / Definition" value={form.partOfSpeech || form.definition || ''} onChange={v => { set('partOfSpeech', v); set('definition', v) }} />
        <Field label="Examples (comma-separated)" value={form.examplesRaw || ''} onChange={v => { set('examplesRaw', v); set('examples', v.split(',').map(s => s.trim()).filter(Boolean)) }} />
      </>}

      <button
        onClick={save}
        className={`py-4 rounded-xl font-bold transition-colors ${saved ? 'bg-emerald-700 text-white' : 'bg-emerald-500 text-black'}`}
      >
        {saved ? 'Saved!' : 'Add Card'}
      </button>
    </div>
  )
}

function Field({ label, value, onChange, textarea }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-gray-500 text-xs">{label}</label>
      {textarea
        ? <textarea value={value} onChange={e => onChange(e.target.value)} rows={3}
            className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white resize-none focus:outline-none" />
        : <input value={value} onChange={e => onChange(e.target.value)}
            className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none" />
      }
    </div>
  )
}

// --- Import Tab ---
function ImportTab({ data, updateData }) {
  const [text, setText] = useState('')
  const [preview, setPreview] = useState(null)

  function parseReport(raw) {
    const existingWords = new Set(
      data.cards.filter(c => c.type === 'vocabulary').map(c => c.word?.toLowerCase())
    )
    const lines = raw.split('\n').map(l => l.trim()).filter(Boolean)
    const stopWords = new Set(['vocabulary:', 'new vocabulary:', 'new vocabulary', 'homework:', 'homework'])
    const cards = []
    let hitHomework = false

    for (const line of lines) {
      if (hitHomework) break
      if (line.toLowerCase().startsWith('homework')) { hitHomework = true; continue }
      if (stopWords.has(line.toLowerCase())) continue

      let word, definition = ''
      if (line.includes(';')) {
        [word, definition] = line.split(';').map(s => s.trim())
      } else if (line.split(' ').length <= 3) {
        word = line
      } else continue

      if (!word) continue
      const skip = existingWords.has(word.toLowerCase())
      cards.push({ word, definition, skip })
    }
    return cards
  }

  function handlePreview() {
    setPreview(parseReport(text))
  }

  function handleImport() {
    const toAdd = preview.filter(p => !p.skip).map((p, i) => ({
      id: `vocab_import_${Date.now()}_${i}`,
      type: 'vocabulary',
      word: p.word,
      definition: p.definition,
      definitionSimple: '',
      exampleSentence: '',
      synonyms: [],
      antonyms: [],
      ...initialCardState(),
    }))
    updateData({ ...data, cards: [...data.cards, ...toAdd] })
    setText('')
    setPreview(null)
  }

  return (
    <div className="p-4 flex flex-col gap-4">
      <p className="text-gray-500 text-sm">Paste vocabulary section from tutor report:</p>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        rows={8}
        placeholder={"Reluctant\nExasperated; feeling super annoyed"}
        className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white resize-none focus:outline-none text-sm"
      />
      <button onClick={handlePreview} className="bg-gray-700 text-white font-bold py-3 rounded-xl">
        Preview
      </button>

      {preview && (
        <div className="flex flex-col gap-3">
          <p className="text-gray-400 text-sm">
            Found {preview.filter(p => !p.skip).length} new words.{' '}
            {preview.filter(p => p.skip).length} already exist (skipped).
          </p>
          <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
            {preview.map((p, i) => (
              <div key={i} className={`text-sm ${p.skip ? 'text-gray-700' : 'text-gray-300'}`}>
                {p.skip ? '✗ ' : '+ '}{p.word}{p.definition ? ` — ${p.definition}` : ''}
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={handleImport} className="flex-1 bg-emerald-500 text-black font-bold py-3 rounded-xl">
              Add All
            </button>
            <button onClick={() => setPreview(null)} className="flex-1 bg-gray-800 text-white py-3 rounded-xl">
              Cancel
            </button>
          </div>
        </div>
      )}
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
function SettingsTab({ data, updateData }) {
  const [newPin, setNewPin] = useState('')
  const [pinSaved, setPinSaved] = useState(false)
  const [resetConfirm, setResetConfirm] = useState(false)

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

      <div className="flex flex-col gap-2 pt-4 border-t border-gray-800">
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
