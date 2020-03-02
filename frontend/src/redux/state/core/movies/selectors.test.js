import { getMovies } from './base.js';

describe('core/dataset selectors', () => {
  test('getMovies', () => {
    let fakeValue = ['a', 'b', 'c'];
    let state = {
      core: {
        movies: { expressions: fakeValue },
      },
    };
    expect(getMovies(state)).toEqual(fakeValue);
  });
});
