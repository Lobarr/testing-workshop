import {createGist} from '../gist'

jest.mock('axios', () => {
  return {
    post: jest.fn(() => Promise.resolve({data: {}})),
  }
})

test('makes a request to the github API with the given data', async () => {
  const data = {
    description: 'the description for this gist',
    public: true,
    files: {
      'file1.txt': {
        content: 'String file contents',
      },
    },
  }
  const res = await createGist(data)
  expect(res).toEqual({})
})
