import { suite as createSuite } from 'uvu'
import * as assert from 'uvu/assert'
import { pairs } from '../../src/points'
import type { Hand } from '../../src/points'
import { clubs, spades, diamonds, hearts } from '../stubs'

const suite = createSuite('pairs (node)')

suite(`counts two-card pairs`, context => {
  const hand = {
    isDealer: true,
    contents: [
      spades('A'),
      clubs('A'),
      spades('3'),
      spades('4'),
      spades('5'),
    ] as Hand['contents']
  }

  assert.is(pairs(hand), 2)
})

suite(`counts more-than-two-card pairs`, context => {
  const hand = {
    isDealer: true,
    contents: [
      spades('A'),
      clubs('A'),
      diamonds('A'),
      spades('4'),
      spades('5'),
    ] as Hand['contents']
  }

  assert.is(pairs(hand), 6)
})

suite(`discounts non-pairs`, context => {
  const hand = {
    isDealer: true,
    contents: [
      spades('A'),
      spades('2'),
      spades('3'),
      spades('4'),
      clubs('5'),
    ] as Hand['contents']
  }

  assert.is(pairs(hand), 0)
})


suite.run()
