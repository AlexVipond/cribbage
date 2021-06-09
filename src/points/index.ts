type Transform = (hand: Hand) => number

export type Hand = {
  contents: [Card, Card, Card, Card, Card], // First card will always be the cut
  isDealer: boolean,
}

export type Card = {
  name: 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K',
  suit: 'clubs' | 'spades' | 'hearts' | 'diamonds',
  number: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
}

export const toPoints: Transform = hand => {
  return transforms.reduce((points, transform) => points + transform(hand), 0)
}

export const pairs: Transform = hand => {
  const quantities = toQuantities(hand.contents)
  return quantities.reduce((points, [, quantity]) => {
    if (quantity === 1) {
      return points
    }

    if (quantity === 2) {
      return points + 2
    }

    return points + quantity * 2
  }, 0)
}

type Quantity = [Card['name'], number]
function toQuantities (contents: Hand['contents']): Quantity[] {
  const names = new Set(contents.map(({ name }) => name))

  return Array.from(names).map(name => [
    name,
    contents.filter(({ name: n }) => n === name).length
  ])
}

export const flush: Transform = hand => {
  const suits = new Set()
  
  let points = 5,
      i = 4 // last card in hand
  while (points > 0 && i > -1) {
    const card = hand.contents[i]
    
    suits.add(card.suit)

    if (suits.size === 1) {
      i--
      continue
    }

    if (suits.size === 2) {
      if (i > 0) {
        points = 0
        continue
      }

      points = 4
      i--
      continue
    }
    
    points = 0
  }

  return points
}

export const nobs: Transform = hand => {
  return hand.contents
    .slice(1)
    .some(({ name, suit }) => name === 'J' && suit === hand.contents[0].suit)
    ? 1
    : 0
}

export const nibs: Transform = hand => {
  if (!hand.isDealer) {
    return 0
  }

  return hand.contents[0].name === 'J' ? 2 : 0
}

const transforms: Transform[] = [
  // fifteens,
  pairs,
  // run,
  flush,
  nobs,
  nibs,
]
