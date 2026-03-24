const PREFIX = 'quiz-'

export const storage = {
  async get(key) {
    try {
      const raw = localStorage.getItem(PREFIX + key)
      return raw ? JSON.parse(raw) : null
    } catch { return null }
  },
  async set(key, value) {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  },
  async delete(key) {
    localStorage.removeItem(PREFIX + key)
  },
}

// Two top-level keys:
// 'data'     → { cards: [...], settings: {...} }
// 'progress' → { sessions: [...], streak: {...}, totalStars, dailyLog: {...} }

export async function loadData() {
  return await storage.get('data')
}

export async function saveData(data) {
  await storage.set('data', data)
}

export async function loadProgress() {
  return await storage.get('progress')
}

export async function saveProgress(progress) {
  await storage.set('progress', progress)
}
