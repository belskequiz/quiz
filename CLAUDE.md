# Quiz App — Developer Notes

## Context

Spaced repetition quiz app for a student preparing for the 11+ exam. Built with Vite + React + Tailwind CSS v4, hosted on GitHub Pages.

**Stack:** Vite 8 + React 19 + Tailwind CSS 4 + Recharts (for progress charts)
**Tests:** Vitest + jsdom
**Deploy:** Push to `main` → GitHub Actions builds and deploys to GitHub Pages via `peaceiris/actions-gh-pages`

---

## Project Structure

```
src/
  App.jsx              — Root component, screen routing, data loading
  main.jsx             — Entry point
  index.css            — Tailwind imports
  data/
    seed.js            — ALL card definitions + generateAllCards() export
  lib/
    sm2.js             — SM-2 spaced repetition algorithm (interval, ease, due checks)
    session.js         — Builds a quiz session (priority: errors → new → due)
    questions.js       — Generates question objects from cards (multiple choice, fill-in)
    storage.js         — localStorage wrapper (quiz-data, quiz-progress)
    streak.js          — Streak tracking logic
  screens/
    Dashboard.jsx      — Home screen with stats, streak, start button
    Quiz.jsx           — Active quiz session UI
    Results.jsx        — Post-session results and stars
    Admin.jsx          — PIN-protected admin panel (settings, unlock cards, reset)
scripts/
  generateCards.js     — Reads seed.js → writes public/cards.json
public/
  cards.json           — Generated file (DO NOT edit directly)
.github/workflows/
  deploy.yml           — CI: npm ci → generate-cards → build → deploy
```

### Key Concepts

- **Cards** are defined as JS objects in `src/data/seed.js`, exported as arrays by type
- **Waves** (1–5) control when cards unlock. Wave dates are in `WAVE_DATES` at the bottom of seed.js
- **`generateAllCards()`** merges all card arrays and stamps `nextReviewDate` from wave dates
- **`npm run generate-cards`** runs `scripts/generateCards.js` which calls `generateAllCards()` and writes `public/cards.json`
- **SM-2 algorithm** (`sm2.js`) handles spaced repetition: interval, ease factor, repetitions, due date
- **Session building** (`session.js`): picks cards by priority — recent errors (max 3) → new cards (newest first) → due cards
- **Question generation** (`questions.js`): creates varied question formats per card type (definition↔word, fill-in-blank, synonym matching, etc.)
- **Storage**: two localStorage keys — `quiz-data` (cards + settings) and `quiz-progress` (sessions, streak, stars)
- On first load, the app fetches `public/cards.json` and hydrates localStorage

### Card Types

| Type | Array in seed.js | ID prefix | Fields |
|---|---|---|---|
| `vocabulary` | `vocabularyCards` | `vocab_` | word, definition, definitionSimple, exampleSentence, synonyms, antonyms |
| `literary_device` | `literaryDeviceCards` | `lit_` | term, definition, example, confusableWith |
| `grammar` (suffix) | `grammarCards` | `gram_` | subtype:'suffix', suffix, partOfSpeech, examples |
| `grammar` (term) | `grammarCards` | `gram_` | subtype:'term', term, definition, examples |
| `maths_technique` | `mathsTechniqueCards` | `math_` | question, method, steps, example |
| `strategy` | `strategyCards` | `strat_` | question, answer, options |
| `arithmetic` | `arithmeticCards` | `arith_` | question, answer, explanation?, options? |

### Common Commands

```bash
npm run dev              # Start dev server (localhost:5173)
npm run build            # Production build → dist/
npm run test             # Run all tests (vitest)
npm run test:watch       # Watch mode
npm run generate-cards   # Rebuild public/cards.json from seed.js
```

---

## Adding Cards from a Tutor Report

The owner will paste or attach a PDF report. When asked to add cards:

### Step 1: Read the report

Look for the **"Vocabulary:"** or **"New Vocabulary:"** section. It ends at **"Homework:"** or end of document.

### Step 2: Classify each item

The vocabulary section mixes three types — classify before adding:

| Type | Examples | Card type |
|---|---|---|
| Regular English words | Reluctant, Trudged, Foreboding | `vocabulary` |
| Literary devices | Simile, Metaphor, Personification, Hyperbole, Onomatopoeia, Idiom, Consonance, Juxtaposition, Analogy, Repetition | `literary_device` |
| Grammar terms | Noun, Verb, Adjective, Adverb, Preposition, Homonym, Homograph, Homophone, Pronoun | `grammar` (subtype: `term`) |

**Skip:** abbreviations (ATM), test scores (11/15), section headers, blank lines.

**Fix typos:** e.g. "Gratisfaction" → "Gratification", "Personifi>cation" → "Personification"

### Step 3: Check for duplicates

Search `src/data/seed.js` before adding — skip anything already there.

### Step 4: Add to seed.js

**Vocabulary card** (most common):
```js
{
  id: 'vocab_NNN',           // next available number
  type: 'vocabulary',
  word: 'reluctant',         // lowercase
  definition: 'Not willing to do something; hesitant',   // clear, accurate
  definitionSimple: "When you really don't want to do something",  // how a 10-year-old would say it
  exampleSentence: 'She was reluctant to leave the party early.',  // natural sentence
  synonyms: ['hesitant', 'unwilling'],  // at least one
  antonyms: ['eager', 'willing']        // can be empty []
}
```

If the report gives a definition after `;` (e.g. `Infallible; never wrong, failing, or making a mistake`), use it as a starting point but write proper `definition` and `definitionSimple` fields.

**Literary device card:**
```js
{
  id: 'lit_NNN',
  type: 'literary_device',
  term: 'Simile',            // capitalised
  definition: "Comparing two things using 'like' or 'as'",
  example: 'Her eyes were like stars in the night sky.',
  confusableWith: ['Metaphor']   // devices students mix up, or []
}
```

**Grammar term card:**
```js
{
  id: 'gram_NNN',
  type: 'grammar',
  subtype: 'term',
  term: 'Homophone',
  definition: 'Words that sound the same but have different spellings and meanings',
  examples: ["there/their/they're", "to/too/two"]
}
```

### Step 5: Run and push

```bash
npm run generate-cards
npm run test
git add src/data/seed.js public/cards.json
git commit -m "feat: add cards from report YYYY-MM-DD"
git push
```

---

## Adding Other Card Types

### Maths technique card
```js
{
  id: 'math_NNN',
  wave: N,
  type: 'maths_technique',
  question: 'How do you find a percentage of a number?',
  method: 'Find 10% (÷10), find 1% (÷100), then build the percentage you need',
  steps: ['Find 10% by dividing by 10', 'Find 1% by dividing by 100', 'Combine'],
  example: '35% of 200: 10%=20, so 30%=60; 5%=10; 35%=70'
}
```

### Strategy card (multiple choice)
```js
{
  id: 'strat_NNN',
  wave: N,
  type: 'strategy',
  question: 'What is the Process of Elimination technique?',
  answer: 'Read all options, cross out clearly wrong ones, then choose from what remains',
  options: ['correct answer', 'distractor 1', 'distractor 2', 'distractor 3']
}
```

### Arithmetic card (numeric input)
```js
{
  id: 'arith_pNN',
  wave: N,
  type: 'arithmetic',
  question: '25% of 80 = ?',
  answer: 20,
  explanation: '25% = 1/4, so 80 ÷ 4 = 20'  // optional
}
```

### Arithmetic card (multiple choice — use `options` field)
```js
{
  id: 'arith_rNN',
  wave: N,
  type: 'arithmetic',
  question: '17 ÷ 5 written as a mixed number = ?',
  answer: '3 2/5',
  options: ['3 2/5', '2 3/5', '3 3/5', '4 1/5']
}
```

---

## Wave Assignment

Every card must have a `wave` property (1–5). Waves control when cards become available:

| Wave | Unlock date | Notes |
|---|---|---|
| 1 | Immediately (null) | Available from first use |
| 2–5 | Set in `WAVE_DATES` at bottom of seed.js | Spaced ~1 week apart |

When adding new cards, assign them to the **latest unlocked wave** (or the next upcoming wave if all are unlocked). Check `WAVE_DATES` in seed.js for current dates.

New cards added to an already-unlocked wave will appear in sessions immediately (prioritised as "new cards", sorted by `addedAt` timestamp which gets stamped by `generateAllCards()`).

---

## Card ID Conventions

- Vocabulary: `vocab_001` → `vocab_NNN` (check last used number in seed.js)
- Literary devices: `lit_001` → `lit_NNN`
- Grammar suffixes: `gram_001` → `gram_020`
- Grammar terms: `gram_021` → `gram_NNN`
- Maths techniques: `math_001` → `math_NNN`
- Strategy: `strat_001` → `strat_NNN`
- Arithmetic fractions: `arith_fNN`, percentage calcs: `arith_pNN`, remainders: `arith_rNN`

Always check the last used number in the relevant array before assigning a new ID.

---

## Quality Rules for Vocabulary Cards

- `definition`: proper dictionary-style, accurate
- `definitionSimple`: how a 10-year-old would explain it to a friend — short, no jargon
- `exampleSentence`: use the word naturally in context (not "The word reluctant means...")
- `synonyms`: minimum 1, real synonyms not just related words
- `antonyms`: include when obvious opposites exist, otherwise `[]`
- All text in **English** (this is an English learning app)

---

## Report Format Reference

Reports come from Atom Learning / the tutor. Vocabulary section looks like:

```
Vocabulary:
Unvaried
Practical
Infallible; never wrong, failing, or making a mistake
Simile
Homonyms; two words that have the same sound, different meaning, same spelling
Homework:
...
```

Some reports have no vocabulary section (maths-only sessions) — nothing to add in those cases.

---

## Troubleshooting

- **Cards not showing up after push?** Make sure `npm run generate-cards` was run and `public/cards.json` was committed. The CI also runs it, but only on `main`.
- **Existing users don't see new cards?** The app only fetches `cards.json` on first load (when localStorage is empty). Existing users need to use the Admin panel's reset or the app needs a data migration. New cards added to already-unlocked waves will appear after a reset.
- **Tests failing?** Run `npm run test` locally. Tests are in `src/lib/*.test.js`.
