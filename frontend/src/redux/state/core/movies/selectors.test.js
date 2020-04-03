import { getMovies } from './base.js';

describe('core/dataset selectors', () => {
  test('getMovies', () => {
    let fakeValue = ['a', 'b', 'c'];
    let state = {
      core: {
        movies: fakeValue,
      },
    };
    expect(getMovies(state)).toEqual(fakeValue);
  });
});
