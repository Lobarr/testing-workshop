import {isPasswordAllowed, userToJSON} from '../auth'

test('isPasswordAllowed only allows some passwords', () => {
  expect(isPasswordAllowed('test')).toBeFalsy()
  expect(isPasswordAllowed('Testing0')).toBeTruthy()
  expect(isPasswordAllowed('Test')).toBeFalsy()
})

test('userToJSON excludes secure properties', () => {
  const user = {
    id: 'some-id',
    username: 'sarah',
    exp: new Date(),
    iat: new Date(),
    hash: 'some really long string',
    salt: 'some shorter string',
  }
  expect(userToJSON(user)).not.toHaveProperty('exp')
  expect(userToJSON(user)).not.toHaveProperty('iat')
  expect(userToJSON(user)).not.toHaveProperty('hash')
  expect(userToJSON(user)).not.toHaveProperty('salt')
})

//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=Testing&e=auth%20util&em=
*/
test.skip('I submitted my elaboration and feedback', () => {
  const submitted = false // change this when you've submitted!
  expect(submitted).toBe(true)
})
////////////////////////////////
