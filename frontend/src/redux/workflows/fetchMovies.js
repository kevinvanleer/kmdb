import {
  initiateRequest as fetchMovies_initiateRequest,
  setResultSuccess as fetchMovies_setResultSuccess,
  setResultFail as fetchMovies_setResultFail,
} from '../state/requests/fetchMovies/base.js';

import { setMoviesById } from '../state/core/movies/moviesByIdActions.js';

export const fetchMovies = (pageSize = 50, offset = 0) => dispatch => {
  dispatch(fetchMovies_initiateRequest());
  return fetch(`/api/unstable/movies?pageSize=${pageSize}&offset=${offset}`, {
    method: 'GET',
  })
    .then(res => res.json())
    .then(
      json => {
        console.debug(json);
        dispatch(fetchMovies_setResultSuccess(json));
        dispatch(setMoviesById(json.movies));
      },
      err => dispatch(fetchMovies_setResultFail(err))
    );
};
