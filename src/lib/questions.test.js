import { describe, it, expect } from 'vitest'
import { generateQuestion } from './questions'

const vocabCard = {
  id: 'v1', type: 'vocabulary', word: 'reluctant',
  definition: 'Not willing to do something', definitionSimple: "When you don't want to do something",
  exampleSentence: 'She was reluctant to leave.', synonyms: ['hesitant'], antonyms: [],
}

const allVocab = [
  vocabCard,
  { id:'v2', type:'vocabulary', word:'eager', definition:'Very willing', exampleSentence:'He was eager to start.', synonyms:['keen'], antonyms:[] },
  { id:'v3', type:'vocabulary', word:'bold', definition:'Not afraid', exampleSentence:'She was bold enough.', synonyms:['brave'], antonyms:[] },
  { id:'v4', type:'vocabulary', word:'calm', definition:'Not worried', exampleSentence:'He stayed calm under pressure.', synonyms:['peaceful'], antonyms:[] },
]

describe('generateQuestion - vocabulary', () => {
  it('returns a question with 4 options', () => {
    const q = generateQuestion(vocabCard, allVocab)
    expect(q.options).toHaveLength(4)
  })

  it('correct answer is among options', () => {
    const q = generateQuestion(vocabCard, allVocab)
    expect(q.options).toContain(q.correctAnswer)
  })

  it('has a question string', () => {
    const q = generateQuestion(vocabCard, allVocab)
    expect(typeof q.question).toBe('string')
    expect(q.question.length).toBeGreaterThan(0)
  })
})

const litCard = {
  id: 'l1', type: 'literary_device', term: 'Simile',
  definition: "Comparing two things using 'like' or 'as'",
  example: 'Her eyes were like stars.', confusableWith: ['Metaphor'],
}
const allLit = [
  litCard,
  { id:'l2', type:'literary_device', term:'Metaphor', definition:'Saying one thing is another', example:'He is a lion.', confusableWith:[] },
  { id:'l3', type:'literary_device', term:'Hyperbole', definition:'Extreme exaggeration', example:"I've told you a million times!", confusableWith:[] },
  { id:'l4', type:'literary_device', term:'Onomatopoeia', definition:'Word sounds like what it means', example:'Buzz!', confusableWith:[] },
]

describe('generateQuestion - literary device', () => {
  it('correct answer is among options', () => {
    const q = generateQuestion(litCard, allLit)
    expect(q.options).toContain(q.correctAnswer)
  })
  it('has 4 options', () => {
    const q = generateQuestion(litCard, allLit)
    expect(q.options).toHaveLength(4)
  })
})

const arithCard = { id: 'a1', type: 'arithmetic', question: '7 × 8 = ?', answer: 56, inputType: 'number' }

describe('generateQuestion - arithmetic', () => {
  it('returns null options (number input)', () => {
    const q = generateQuestion(arithCard, [arithCard])
    expect(q.options).toBeNull()
  })
  it('correctAnswer is the number', () => {
    const q = generateQuestion(arithCard, [arithCard])
    expect(q.correctAnswer).toBe(56)
  })
  it('format is numberInput', () => {
    const q = generateQuestion(arithCard, [arithCard])
    expect(q.format).toBe('numberInput')
  })
})
