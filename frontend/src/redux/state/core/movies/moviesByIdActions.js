import { getMovies, setMovies } from './base';

export const setMoviesById = (newMovies) => (dispatch, getState) => {
  const movies = getMovies(getState());
  let newMoviesById = {};
  newMovies.forEach((movie) => (newMoviesById[movie._id] = movie));

  dispatch(setMovies(Object.assign({}, movies, newMoviesById)));
};

export const removeMovie = (id) => (dispatch, getState) => {
  const movies = getMovies(getState());
  delete movies[id];
  dispatch(setMovies(movies));
};
