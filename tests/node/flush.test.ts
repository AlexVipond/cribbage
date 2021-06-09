import { suite as createSuite } from 'uvu'
import * as assert from 'uvu/assert'
import { flush } from '../../src/points'
import type { Hand } from '../../src/points'
import { clubs, spades, diamonds, hearts } from '../stubs'

const suite = createSuite('flush (node)')

suite(`counts five-card flush`, context => {
  const hand = {
    isDealer: true,
    contents: [
      spades('A'),
      spades('2'),
      spades('3'),
      spades('4'),
      spades('5'),
    ] as Hand['contents']
  }

  assert.is(flush(hand), 5)
})

suite(`counts four-card flush`, context => {
  const hand = {
    isDealer: true,
    contents: [
      clubs('A'),
      spades('2'),
      spades('3'),
      spades('4'),
      spades('5'),
    ] as Hand['contents']
  }

  assert.is(flush(hand), 4)
})

suite(`discounts four-card flush that relies on the cut`, context => {
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

  assert.is(flush(hand), 0)
})

suite(`discounts non-flush`, context => {
  const hand = {
    isDealer: true,
    contents: [
      hearts('A'),
      diamonds('2'),
      clubs('3'),
      spades('4'),
      clubs('5'),
    ] as Hand['contents']
  }

  assert.is(flush(hand), 0)
})

suite.run()
