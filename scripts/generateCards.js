import { writeFileSync } from 'fs'
import { generateAllCards } from '../src/data/seed.js'

const cards = generateAllCards()
const output = JSON.stringify({ cards }, null, 2)
writeFileSync('public/cards.json', output)
console.log(`Generated ${cards.length} cards → public/cards.json`)
