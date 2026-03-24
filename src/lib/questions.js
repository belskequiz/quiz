function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function pickDistractors(card, allCards, correctValue, getValue, count = 3) {
  const others = allCards
    .filter(c => c.id !== card.id)
    .map(getValue)
    .filter(v => v && v !== correctValue)
  return shuffle(others).slice(0, count)
}

function makeOptions(correct, distractors) {
  return shuffle([correct, ...distractors])
}

export function generateQuestion(card, allCards) {
  switch (card.type) {
    case 'vocabulary': return generateVocabQuestion(card, allCards)
    case 'literary_device': return generateLitQuestion(card, allCards)
    case 'grammar': return generateGrammarQuestion(card, allCards)
    case 'maths_technique': return generateMathsQuestion(card, allCards)
    case 'arithmetic': return generateArithmeticQuestion(card)
    case 'strategy': return generateStrategyQuestion(card)
    default: return generateVocabQuestion(card, allCards)
  }
}

function generateVocabQuestion(card, allCards) {
  const sameType = allCards.filter(c => c.type === 'vocabulary')
  const formats = ['defToWord', 'wordToDef', 'sentenceToWord']
  if (card.synonyms && card.synonyms.length > 0) formats.push('synonym')
  const format = formats[Math.floor(Math.random() * formats.length)]

  if (format === 'defToWord') {
    const distractors = pickDistractors(card, sameType, card.word, c => c.word)
    return {
      format,
      question: card.definition,
      hint: 'Choose the word that matches this definition',
      options: makeOptions(card.word, distractors),
      correctAnswer: card.word,
      explanation: card.definitionSimple,
    }
  }
  if (format === 'wordToDef') {
    const distractors = pickDistractors(card, sameType, card.definition, c => c.definition)
    return {
      format,
      question: card.word,
      hint: 'Choose the correct definition',
      options: makeOptions(card.definition, distractors),
      correctAnswer: card.definition,
      explanation: card.definitionSimple,
    }
  }
  if (format === 'sentenceToWord') {
    const sentence = card.exampleSentence.replace(
      new RegExp(card.word, 'gi'), '___'
    )
    const distractors = pickDistractors(card, sameType, card.word, c => c.word)
    return {
      format,
      question: sentence,
      hint: 'Choose the missing word',
      options: makeOptions(card.word, distractors),
      correctAnswer: card.word,
      explanation: `${card.word}: ${card.definitionSimple}`,
    }
  }
  // synonym
  const syn = card.synonyms[Math.floor(Math.random() * card.synonyms.length)]
  const distractors = pickDistractors(card, sameType, card.word, c => c.word)
  return {
    format,
    question: `Which word is closest in meaning to "${syn}"?`,
    hint: 'Find the synonym',
    options: makeOptions(card.word, distractors),
    correctAnswer: card.word,
    explanation: `${card.word} and "${syn}" mean similar things: ${card.definitionSimple}`,
  }
}

function generateLitQuestion(card, allCards) {
  const sameType = allCards.filter(c => c.type === 'literary_device')
  const formats = ['termToDef', 'defToTerm', 'exampleToTerm']
  const format = formats[Math.floor(Math.random() * formats.length)]

  if (format === 'termToDef') {
    const distractors = pickDistractors(card, sameType, card.definition, c => c.definition)
    return {
      format,
      question: card.term,
      hint: 'Choose the correct definition',
      options: makeOptions(card.definition, distractors),
      correctAnswer: card.definition,
      explanation: `${card.term}: ${card.definition}. Example: "${card.example}"`,
    }
  }
  if (format === 'defToTerm') {
    const distractors = pickDistractors(card, sameType, card.term, c => c.term)
    return {
      format,
      question: card.definition,
      hint: 'Name this literary device',
      options: makeOptions(card.term, distractors),
      correctAnswer: card.term,
      explanation: `${card.term}: ${card.definition}`,
    }
  }
  // exampleToTerm
  const distractors = pickDistractors(card, sameType, card.term, c => c.term)
  return {
    format,
    question: `"${card.example}" — what literary device is this?`,
    hint: 'Identify the technique',
    options: makeOptions(card.term, distractors),
    correctAnswer: card.term,
    explanation: `This is ${card.term}: ${card.definition}`,
  }
}

function generateGrammarQuestion(card, allCards) {
  const sameSubtype = allCards.filter(c => c.type === 'grammar' && c.subtype === card.subtype)

  if (card.subtype === 'suffix') {
    const formats = ['suffixToPoS', 'posToSuffix']
    const format = formats[Math.floor(Math.random() * formats.length)]
    if (format === 'suffixToPoS') {
      const distractors = pickDistractors(card, sameSubtype, card.partOfSpeech, c => c.partOfSpeech)
      return {
        format,
        question: `What part of speech does the suffix "${card.suffix}" usually create?`,
        hint: `Examples: ${card.examples.join(', ')}`,
        options: makeOptions(card.partOfSpeech, distractors),
        correctAnswer: card.partOfSpeech,
        explanation: `"${card.suffix}" makes ${card.partOfSpeech}s. E.g. ${card.examples[0]}`,
      }
    }
    const distractors = pickDistractors(card, sameSubtype, card.suffix, c => c.suffix)
    return {
      format,
      question: `Which suffix turns a word into a ${card.partOfSpeech}?`,
      hint: '',
      options: makeOptions(card.suffix, distractors),
      correctAnswer: card.suffix,
      explanation: `"${card.suffix}" makes ${card.partOfSpeech}s. E.g. ${card.examples[0]}`,
    }
  }
  // term subtype
  const distractors = pickDistractors(card, sameSubtype, card.term, c => c.term)
  return {
    format: 'termToDef',
    question: card.definition,
    hint: `Examples: ${card.examples.join(', ')}`,
    options: makeOptions(card.term, distractors),
    correctAnswer: card.term,
    explanation: `${card.term}: ${card.definition}`,
  }
}

function generateMathsQuestion(card, allCards) {
  const sameType = allCards.filter(c => c.type === 'maths_technique')
  const distractors = pickDistractors(card, sameType, card.method, c => c.method)
  return {
    format: 'methodChoice',
    question: card.question,
    hint: '',
    options: makeOptions(card.method, distractors),
    correctAnswer: card.method,
    explanation: `Example: ${card.example}`,
  }
}

function generateArithmeticQuestion(card) {
  return {
    format: 'numberInput',
    question: card.question,
    hint: '',
    options: null,
    correctAnswer: card.answer,
    explanation: null,
  }
}

function generateStrategyQuestion(card) {
  return {
    format: 'strategyChoice',
    question: card.question,
    hint: '',
    options: shuffle(card.options),
    correctAnswer: card.answer,
    explanation: null,
  }
}
