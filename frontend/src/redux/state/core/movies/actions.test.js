import { CORE_MOVIES__SET_MOVIES, setMovies } from './base.js';

describe('actions core/dataset', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('setMovies', () => {
    let fakeValue = 'fake-value';
    expect(setMovies(fakeValue)).toEqual({
      type: CORE_MOVIES__SET_MOVIES,
      value: fakeValue,
    });
  });
});
