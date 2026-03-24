# 11+ Quiz App — Спецификация для разработки

## Контекст

Приложение для подготовки ребёнка к экзамену 11+. Основные проблемы: пропускает незнакомые слова, не проверяет ошибки, торопится, не пишет working out. Цель приложения — ежедневное 5-7 минутное повторение ключевых знаний через интервальный алгоритм.

---

## Технический стек

- **React** (single-file .jsx artifact)
- **Tailwind CSS** (core utility classes only)
- **Persistent storage** через `window.storage` API (НЕ localStorage)
- Никаких внешних API для словарей — все определения хранятся в данных
- Библиотеки: только то, что доступно в артефактах (React, lucide-react, recharts)

---

## Алгоритм интервального повторения (SM-2 simplified)

Каждая карточка имеет:
- `interval` — через сколько дней показать снова (начальное: 1)
- `easeFactor` — множитель (начальное: 2.5, минимум: 1.3)
- `repetitions` — сколько раз подряд ответил правильно
- `nextReviewDate` — дата следующего показа (ISO string)
- `lastReviewDate` — дата последнего показа

При **правильном** ответе:
- `repetitions += 1`
- Если repetitions == 1: interval = 1
- Если repetitions == 2: interval = 3  
- Иначе: interval = Math.round(interval * easeFactor)
- `easeFactor = easeFactor + 0.1` (макс 3.0)
- `nextReviewDate = today + interval days`

При **неправильном** ответе:
- `repetitions = 0`
- `interval = 1`
- `easeFactor = Math.max(1.3, easeFactor - 0.2)`
- `nextReviewDate = tomorrow`

"Побеждённая" карточка (mastered): interval >= 21 дней (показана 4+ раз правильно подряд). Визуально помечается особым значком.

---

## Типы карточек

### 1. Vocabulary (английские слова)
Форматы вопросов (чередуются случайно):
- **Определение → выбери слово** (4 варианта)
- **Предложение с пропуском → выбери слово** (4 варианта)  
- **Слово → выбери определение** (4 варианта)
- **Синоним/антоним** — "Какое слово ближе/противоположно по значению к X?" (4 варианта)

Данные карточки:
```json
{
  "id": "vocab_001",
  "type": "vocabulary",
  "word": "reluctant",
  "definition": "Not willing to do something; hesitant",
  "definitionSimple": "When you really don't want to do something",
  "exampleSentence": "She was reluctant to leave the party early.",
  "synonyms": ["hesitant", "unwilling"],
  "antonyms": ["eager", "willing"],
  "source": "tutor_report_2026-02-08"
}
```

### 2. Literary Devices (литературные приёмы)
Форматы:
- **Термин → выбери определение** (4 варианта)
- **Пример → определи приём** ("The sun smiled down on us" — что это?)
- **Определение → назови термин** (4 варианта)

Данные:
```json
{
  "id": "lit_001",
  "type": "literary_device",
  "term": "Simile",
  "definition": "Comparing two things using 'like' or 'as'",
  "example": "Her eyes were like stars",
  "confusableWith": ["Metaphor"]
}
```

### 3. Parts of Speech & Grammar
Форматы:
- **Суффикс → какая часть речи?** ("-ous" → Adjective)
- **Слово → определи часть речи** ("quickly" → Adverb)
- **Часть речи → выбери суффикс** (Verb → "-ify", "-ise", "-ate")

Данные:
```json
{
  "id": "grammar_001",
  "type": "grammar",
  "subtype": "suffix",
  "suffix": "-ous",
  "partOfSpeech": "Adjective",
  "examples": ["joyous", "famous", "dangerous"]
}
```

### 4. Maths Techniques (математические приёмы)
Форматы:
- **"Как найти...?" → выбери метод** (4 варианта)
- **Метод → в каком типе задач используется?**
- **Шаги метода: какой шаг следующий?** (sequential)

Данные:
```json
{
  "id": "math_001",
  "type": "maths_technique",
  "question": "How do you find 15% of a number?",
  "method": "Find 10% (divide by 10), find 5% (halve the 10%), add them together",
  "steps": ["Find 10% by dividing by 10", "Find 5% by halving the 10%", "Add 10% and 5%"],
  "example": "15% of 240: 10%=24, 5%=12, answer=36",
  "source": "tutor_report_2026-01-31"
}
```

### 5. Arithmetic Drills (устный счёт)
Форматы:
- **Прямой вопрос → ввод числа** (НЕ выбор из вариантов!)
- Таблица умножения: "7 × 8 = ?"
- Дроби ↔ проценты ↔ десятичные: "3/8 as a decimal = ?"
- Быстрые проценты: "25% of 360 = ?"

Данные:
```json
{
  "id": "arith_001",
  "type": "arithmetic",
  "question": "7 × 8 = ?",
  "answer": 56,
  "inputType": "number"
}
```

### 6. Comprehension Strategies (стратегии)
Форматы:
- **Ситуация → что делать?** (multiple choice)
- **Утверждение → правда/ложь**

Данные:
```json
{
  "id": "strat_001",
  "type": "strategy",
  "question": "What is the Process of Elimination technique?",
  "answer": "Read all options, cross out clearly wrong ones, choose from what remains",
  "options": ["Read all options and cross out wrong ones", "Pick the longest answer", "Choose the first one that seems right", "Skip and come back later"]
}
```

---

## Экраны приложения

### Экран 1: Dashboard (главный)

Элементы:
- **Streak** — крупный fire-icon + число дней подряд (центр внимания)
- **Звезда за сегодня** — заработана или нет
- **Карточек на сегодня** — число
- **Прогресс** — "Mastered: X / Y total cards"
- **Кнопка "Start Quiz"** (крупная, яркая)
- **Кнопка "⚙️ Admin"** (маленькая, незаметная, внизу)

### Экран 2: Quiz Session

- Одна карточка за раз, крупно
- Progress bar сверху (5/15)
- Тип карточки показан иконкой (📚 слово, 🔢 математика, ✏️ грамматика)
- 4 варианта ответа ИЛИ поле ввода числа (для arithmetic)
- После ответа: зелёная/красная подсветка, правильный ответ виден
- При неправильном — краткое объяснение (definitionSimple или method)
- Пауза 2 секунды после ответа, потом следующая карточка
- Нельзя закрыть/выйти без потери прогресса сессии

Порядок карточек:
1. Карточки с прошлыми ошибками (макс 3)
2. Карточки по расписанию SM-2 (nextReviewDate <= today)
3. Новые карточки (макс 3 за сессию)
4. Общий лимит: 15 карточек
5. Типы чередуются (не 5 слов подряд)

### Экран 3: Session Results

- Процент правильных (крупно, с цветом: красный < 50%, жёлтый 50-69%, зелёный 70%+)
- Звезда заработана? (анимация если да)
- "New words mastered today: +2" (если есть)
- Streak обновлён (анимация +1)
- Список ошибок с правильными ответами (collapsible)
- Кнопка "Done"

### Экран 4: Admin Panel (для папы)

Защита: 4-digit PIN.

Вкладки:

**Add Cards:**
- Выбор типа карточки → форма с нужными полями
- Кнопка "Add"

**Import from Tutor Report:**
- Textarea: вставить текст секции Vocabulary
- Парсер автоматически разбирает (формат: "word" или "word; definition")
- Preview: "Found 8 new words. 2 already exist (skipped)."
- Кнопка "Add All" / "Cancel"

**All Cards:**
- Список с фильтрами: тип (vocab/grammar/maths/etc), статус (new/learning/mastered)
- Поиск по тексту
- Кнопка редактирования на каждой карточке
- Кнопка удаления

**Statistics (recharts):**
- Line chart: % correct per session over time
- Bar chart: cards mastered per week
- Current streak, longest streak, total stars
- Total cards by type and status

**Settings:**
- PIN change
- Star threshold (60% / 70%) с датой переключения
- Cards per session (10 / 15 / 20)
- Reset all data (с подтверждением)

---

## Storage Structure

Минимизация storage calls — все данные в 2 ключах:

```javascript
// Ключ "quiz-data"
{
  cards: [...],           // Все карточки с SM-2 данными
  settings: {
    pin: "1234",
    starThreshold: 60,    // 60 first month, then 70
    cardsPerSession: 15,
    thresholdChangeDate: null  // Когда переключить на 70
  }
}

// Ключ "quiz-progress" 
{
  sessions: [{date, total, correct, pct, star}],
  streak: { current: 5, longest: 12, lastDate: "2026-03-24" },
  totalStars: 23,
  dailyLog: { "2026-03-24": {completed: true, star: true, pct: 73} }
}
```

---

## Начальные данные (seed)

### Vocabulary (~70 слов из репортов тьютора, декабрь 2025 — март 2026):

Unconvinced, Variable, Unreliable, Pending, Indecisive, Exasperated, Nonchalant, Compassionate, Exploitative, Prestigious, Unbeknownst, Perilous, Boisterous, Inference, Enhance, Impact, Fable, Intrigued, Apprehensive, Sorrow, Gratification, Absurd, Nonsensical, Preposition, Infallible, Reluctant, Trudged, Defiantly, Eroded, Oppressive, Solitary, Pity, Resonate, Obnoxiously, Foreboding, Supernatural, Unvaried, Practical, Confections, Camaraderie, Ingenuity, Enduring, Controversial, Garments, Accessible, Logistics, Unequivocal, Reconstructed, Optimistic, Fowl, Unassumingly, Analytical, Financial, Blunt, Unrelenting, Pressing, Neglected, Compelling, Urgent, Dismally, Luscious, Overlooked, Fund, Skeptical, Household, Laddered, Agitated, Proponent, Propose, Enlighten, Mirth

**Каждое слово должно иметь:** определение (простое, понятное 10-летнему), пример предложения, хотя бы один синоним. Эти данные нужно заполнить при создании seed data.

### Literary Devices (12):
Simile, Metaphor, Juxtaposition, Repetition, Analogy, Onomatopoeia, Hyperbole, Personification, Rhyme Scheme, Idiom, Consonance, Fable

Каждый с определением и примером.

### Grammar — Parts of Speech Suffixes:
- Noun suffixes: -ness, -ity, -ment, -tion, -ship, -ance/-ence (с примерами)
- Verb suffixes: -ate, -ify, -ise/-ize, -en
- Adjective suffixes: -ous, -ful, -less, -able, -al, -ive, -ish
- Adverb suffixes: -ly, -wise, -ward(s)

### Grammar — Terms:
Homonyms (same sound, same spelling, different meaning), Homographs (same spelling, different sound, different meaning), Homophones (same sound, different spelling, different meaning), Pronouns, Noun, Verb, Adjective, Adverb

### Maths Techniques (7):
1. Percentages: Find 10% (÷10), find 1% (÷100), build from there
2. Checking division: multiply answer by divisor
3. Remainder to fraction: remainder/divisor
4. Area of rectangle: length × width
5. Place value: 4-step method (points between, difference, divide, count)
6. Ratio: find one part, then multiply
7. Long division steps

### Arithmetic (генерируются программно):
- Таблица умножения 2×2 до 12×12
- Fraction↔Decimal↔Percent: 1/2, 1/4, 3/4, 1/5, 2/5, 3/5, 4/5, 1/8, 3/8, 5/8, 7/8, 1/3, 2/3, 1/10, 1/100
- Quick percentages: 10%, 20%, 25%, 50%, 75% от чисел 40, 60, 80, 120, 200, 240, 360, 400, 500, 800

### Comprehension Strategies (5):
1. Process of Elimination
2. Read the passage BEFORE answering questions
3. Underline evidence in the text
4. Re-read the question before choosing answer
5. Use remaining time to check 3 least confident answers

---

## UX и дизайн

### Целевая аудитория: 10-летний мальчик
- Тёмная тема (gaming aesthetic, не "school" aesthetic)
- Крупные кнопки (минимум 48px touch target)
- Яркие акцентные цвета (emerald green для правильного, red для ошибки)
- Анимация при правильном ответе (subtle, не конфетти — что-то вроде pulse или glow)
- Streak = fire emoji + число, анимируется при обновлении
- Mastered cards получают значок ⚡ или 🏆
- Минимум текста, максимум визуальных индикаторов
- Шрифт — крупный, читаемый, не "детский"

### Анти-паттерны (НЕ делать):
- Не делать слишком яркое/мультяшное — ему 10, не 5
- Не показывать таймер обратного отсчёта на каждый вопрос (создаёт ту же спешку)
- Не показывать общий таймер сессии на экране (только в статистике потом)
- Не использовать красный шрифт для ошибок в итогах — использовать нейтральный список

---

## Порядок реализации

### Phase 1 — Core (MVP)
Это нужно построить ПЕРВЫМ. Должно быть полностью рабочим:
- SM-2 algorithm
- Storage (quiz-data + quiz-progress)
- Dashboard screen
- Quiz session screen (vocabulary only, 4 answer choices)
- Results screen
- Streak tracking
- Star calculation
- Seed data: все 70 слов с определениями и примерами

### Phase 2 — All Card Types  
- Literary devices cards + quiz formats
- Grammar/suffix cards + quiz formats
- Maths technique cards + quiz formats
- Arithmetic drills (number input, not multiple choice)
- Comprehension strategy cards
- Mixed session (чередование типов)

### Phase 3 — Admin Panel
- PIN protection
- Add card form (all types)
- Tutor report parser (vocabulary section)
- Card list with filters
- Edit/delete cards

### Phase 4 — Stats & Motivation
- Progress charts (recharts)
- Achievement badges
- Mastered cards gallery
- Weekly/monthly star totals
- Longest streak record

---

## Парсер репортов тьютора (Phase 3)

Input: текст, скопированный из PDF-репорта.

Формат 1 (просто слова):
```
Vocabulary:
Reluctant
Trudged
Defiantly
```

Формат 2 (слова с определениями):
```
Exasperated; feeling super annoyed, frustrated
Nonchalant; acting super calm and cool
```

Логика парсера:
1. Split по строкам
2. Trim каждую строку
3. Игнорировать: пустые строки, "Vocabulary:", "New Vocabulary:", "New vocabulary:", "Homework:", и всё после "Homework:"
4. Если строка содержит ";" — word = left.trim(), definition = right.trim()
5. Если строка — одно-два слова без ";" — word = строка, definition = "" (заполнить вручную)
6. Проверка дубликатов по существующим cards
7. Preview для подтверждения

---

## Notes для разработчика

1. Приложение должно работать как single React artifact (.jsx файл)
2. Все данные через window.storage (async: get, set, delete, list)
3. При первом запуске — проверить наличие данных, если нет — загрузить seed
4. Arithmetic drills генерируются программно при создании seed (не хардкодятся)
5. Варианты ответов для multiple choice генерируются из других карточек того же типа (distractors)
6. Distractors должны быть правдоподобными (того же типа, похожей длины)
7. Тёмная тема, gaming aesthetic, крупный шрифт
8. Mobile-first (основное использование — телефон или планшет)
9. Все тексты на АНГЛИЙСКОМ (это приложение для изучения английского)
10. Admin panel тексты могут быть на английском (папа читает по-английски)
