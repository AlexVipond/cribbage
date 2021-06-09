import type { Card } from '../src/points'

export function clubs (name: Card['name']): Card {
  return {
    name,
    suit: 'clubs',
    number: numbersByName[name],
  }
}

export function spades (name: Card['name']): Card {
  return {
    name,
    suit: 'spades',
    number: numbersByName[name],
  }
}

export function diamonds (name: Card['name']): Card {
  return {
    name,
    suit: 'diamonds',
    number: numbersByName[name],
  }
}

export function hearts (name: Card['name']): Card {
  return {
    name,
    suit: 'hearts',
    number: numbersByName[name],
  }
}

const numbersByName: Record<Card['name'], Card['number']> = {
  'A': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  '10': 10,
  'J': 10,
  'Q': 10, 
  'K': 10,
}
