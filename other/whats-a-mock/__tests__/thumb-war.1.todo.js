// monkey-patching
import thumbWar from '../thumb-war'
import * as utils from '../utils';
// import the utils module (see hint #1 at the bottom of the file)

test('returns winner', () => {
  utils.getWinner = jest.fn((p1,p2) => p2);
  const winner = thumbWar('Ken Wheeler', 'Kent C. Dodds')
  expect(['Ken Wheeler', 'Kent C. Dodds'].includes(winner)).toBe(true)
  expect(winner).toEqual('Kent C. Dodds');
})

/*

Hints below:






See answers in the solution file



































Hint #1:

import * as utils from '../utils'





Hint #2:

const originalGetWinner = utils.getWinner






Hint #3:

utils.getWinner = functionThatAlwaysReturnsPlayer2






Hint #4:

expect(winner).toBe('Kent C. Dodds')






Hint #5:

utils.getWinner = originalGetWinner

 */
