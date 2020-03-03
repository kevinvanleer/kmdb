import { getMovies, setMovies } from './base';

export const setMoviesById = newMovies => (dispatch, getState) => {
  const movies = getMovies(getState());
  let newMoviesById = {};
  newMovies.forEach(movie => (newMoviesById[movie.id] = movie));

  dispatch(setMovies(Object.assign({}, movies, newMoviesById)));
};

export const removeMovie = id => (dispatch, getState) => {
  const movies = getMovies(getState());
  delete movies[id];
  dispatch(setMovies(movies));
};

export const initializeMovies = movies => (dispatch, getState) => {
  let moviesById = {};
  movies.forEach(movie => (moviesById[movie.id] = movie));
  dispatch(setMovies(moviesById));
};
