import { suite as createSuite } from 'uvu'
import * as assert from 'uvu/assert'
import { nibs } from '../../src/points'
import type { Hand } from '../../src/points'
import { clubs, spades, diamonds, hearts } from '../stubs'

const suite = createSuite('flush (node)')

suite(`counts nibs`, context => {
  const hand = {
    isDealer: true,
    contents: [
      diamonds('J'),
      diamonds('2'),
      diamonds('3'),
      diamonds('4'),
      diamonds('5'),
    ] as Hand['contents']
  }

  assert.is(nibs(hand), 2)
})

suite(`discounts non-nibs`, context => {
  const hand = {
    isDealer: true,
    contents: [
      diamonds('A'),
      diamonds('2'),
      diamonds('3'),
      diamonds('4'),
      diamonds('5'),
    ] as Hand['contents']
  }

  assert.is(nibs(hand), 0)
})

suite(`discounts nibs for non-dealer`, context => {
  const hand = {
    isDealer: false,
    contents: [
      diamonds('J'),
      diamonds('2'),
      diamonds('3'),
      diamonds('4'),
      diamonds('5'),
    ] as Hand['contents']
  }

  assert.is(nibs(hand), 0)
})

suite.run()
