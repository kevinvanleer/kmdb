import { combineReducers } from 'redux';

import fetchMovies from './fetchMovies/base';

export default combineReducers({
  fetchMovies,
});
