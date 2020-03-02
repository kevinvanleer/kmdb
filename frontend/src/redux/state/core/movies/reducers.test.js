import rootReducer from '../../index.js';
import { initialState } from './schema.js';
import { CORE_MOVIES__SET_MOVIES } from './base.js';

describe('core/movies reducers', () => {
  test('should return the initial state', () => {
    expect(rootReducer(undefined, {}).core.movies).toEqual(initialState);
  });

  test('should initialize movies state', () => {
    const fakeMovies = ['a', 'b', 'c'];
    expect(
      rootReducer(undefined, {
        type: CORE_MOVIES__SET_MOVIES,
        value: fakeMovies,
      }).core.movies
    ).toEqual(
      Object.assign({}, initialState, { expressions: fakeMovies })
    );
  });
});
