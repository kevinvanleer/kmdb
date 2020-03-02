import { initialState } from './schema';
import { get } from 'lodash';

export const CORE_MOVIES__SET_MOVIES = 'CORE_MOVIES__SET_MOVIES';

export const getMovies = state => get(state, 'core.movies.expressions');

export const setMovies = value => ({
  type: CORE_MOVIES__SET_MOVIES,
  value: value,
});

const movies = (state = initialState, action) => {
  switch (action.type) {
    case CORE_MOVIES__SET_MOVIES:
      return Object.assign({}, state, { expressions: action.value });
    default:
      return state;
  }
};

export default movies;
