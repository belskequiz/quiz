# Quiz App — Developer Notes

## Context

Spaced repetition quiz app for a student preparing for the 11+ exam. Built with Vite + React + Tailwind, hosted on GitHub Pages.

**Cards live in:** `src/data/seed.js`
**After editing:** run `npm run generate-cards` → `git push` → GitHub Pages auto-deploys

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
git add src/data/seed.js public/cards.json
git commit -m "feat: add cards from report YYYY-MM-DD"
git push
```

---

## Card ID Conventions

- Vocabulary: `vocab_001` → `vocab_NNN` (check last used number in seed.js)
- Literary devices: `lit_001` → `lit_NNN`
- Grammar suffixes: `gram_001` → `gram_NNN`
- Grammar terms: `gram_021` → `gram_NNN` (terms start after suffixes)

---

## Quality Rules for Vocabulary Cards

- `definition`: proper dictionary-style, accurate
- `definitionSimple`: how a 10-year-old would explain it to a friend — short, no jargon
- `exampleSentence`: use the word naturally in context (not "The word reluctant means...")
- `synonyms`: minimum 1, real synonyms not just related words
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
