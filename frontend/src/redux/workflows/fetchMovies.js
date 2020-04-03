import {
  initiateRequest as fetchMovies_initiateRequest,
  setResultSuccess as fetchMovies_setResultSuccess,
  setResultFail as fetchMovies_setResultFail,
} from '../state/requests/fetchMovies/base.js';

import { setMoviesById } from '../state/core/movies/moviesByIdActions.js';

export const fetchMovies = ({ pageSize, offset, search }) => (dispatch) => {
  pageSize = pageSize || 50;
  offset = offset || 0;
  search = search || '';
  dispatch(
    fetchMovies_initiateRequest({
      uri: `/api/unstable/movies?pageSize=${pageSize}&offset=${offset}&search=${search}`,
    })
  );
  return fetch(
    `/api/unstable/movies?pageSize=${pageSize}&offset=${offset}&search=${search}`,
    {
      method: 'GET',
    }
  )
    .then((res) => res.json())
    .then(
      (json) => {
        dispatch(fetchMovies_setResultSuccess(json));
        dispatch(setMoviesById(json.movies));
      },
      (err) => dispatch(fetchMovies_setResultFail(err))
    );
};
