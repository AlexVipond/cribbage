import { suite as createSuite } from 'uvu'
import * as assert from 'uvu/assert'
import { nobs } from '../../src/points'
import type { Hand } from '../../src/points'
import { clubs, spades, diamonds, hearts } from '../stubs'

const suite = createSuite('flush (node)')

suite(`counts nobs`, context => {
  const hand = {
    isDealer: true,
    contents: [
      hearts('A'),
      diamonds('2'),
      diamonds('3'),
      diamonds('4'),
      hearts('J'),
    ] as Hand['contents']
  }

  assert.is(nobs(hand), 1)
})

suite(`discounts non-nobs`, context => {
  const hand = {
    isDealer: true,
    contents: [
      diamonds('A'),
      diamonds('2'),
      diamonds('3'),
      diamonds('4'),
      hearts('J'),
    ] as Hand['contents']
  }

  assert.is(nobs(hand), 0)
})

suite.run()
