import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Surface from './components/layout/Surface.js';
import Flexbox from './components/layout/Flexbox.js';
import Scrollbars from './components/layout/Scrollbars.js';
import Spacer from './components/layout/Spacer.js';
import Text from './components/parts/Text.js';
import Clickable from './components/core/Clickable.js';

import MovieDetails from './components/assemblies/MovieDetails.js';

import { getMovies } from './redux/state/core/movies/base.js';
import { fetchMovies } from './redux/workflows/fetchMovies.js';
import {
  getPending,
  getSuccess,
  getResult,
} from './redux/state/requests/fetchMovies/base.js';

import { set, get, isEmpty, debounce } from 'lodash';

import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const movies = useSelector(state => getMovies(state));
  const requestPending = useSelector(state => getPending(state));
  const requestSuccess = useSelector(state => getSuccess(state));
  const fetchedMovies = useSelector(state => getResult(state));
  const [selectedMovie, setSelectedMovie] = useState(0);
  const [searchText, setSearchText] = useState('');
  const scrollContent = useRef(null);
  const scrollContainer = useRef(null);
  const filteredMovies = useRef({});

  if (searchText.length > 0 && requestSuccess && fetchedMovies) {
    fetchedMovies.movies.forEach(movie =>
      set(filteredMovies.current, movie.id, movie)
    );
  }

  const movieList =
    searchText.length > 0
      ? Object.values(filteredMovies.current)
      : Object.values(movies);

  const listPending = isEmpty(movies);

  return (
    <Surface height="100vh" flexDirection="column">
      <Flexbox flexDirection="column" padding="1em" flexGrow="1">
        <Text fontSize="heading">kMDb</Text>
        <Spacer height="1em" />
        {listPending ? (
          <Text fontSize="heading" disabled>
            Loading...
          </Text>
        ) : (
          <Flexbox flexGrow="1">
            <Flexbox
              flexDirection="column"
              maxWidth="50vw"
              minWidth="20vw"
              flexGrow="1"
              ref={scrollContainer}
            >
              <input
                type="text"
                onChange={evt => {
                  setSearchText(evt.target.value);
                  filteredMovies.current = {};
                  dispatch(fetchMovies({ query: evt.target.value }));
                }}
                value={searchText}
              />
              <Scrollbars
                onScrollStop={() =>
                  scrollContent.current &&
                  scrollContainer.current &&
                  scrollContent.current.getBoundingClientRect().bottom - 500 <=
                    scrollContainer.current.getBoundingClientRect().bottom &&
                  dispatch(
                    fetchMovies({
                      pageSize: 50,
                      offset: Object.keys(movies).length,
                      query: searchText,
                    })
                  )
                }
              >
                <Flexbox
                  ref={scrollContent}
                  flexDirection="column"
                  maxWidth="50vw"
                  minWidth="20vw"
                >
                  {movieList
                    .sort((a, b) => a.title.localeCompare(b.title))
                    .map(movie => (
                      <Clickable
                        id={movie.id}
                        key={movie.id}
                        onClick={() => setSelectedMovie(movie.id)}
                      >
                        <Text bold={selectedMovie === movie.id}>
                          {movie.title}
                        </Text>
                      </Clickable>
                    ))}
                  {requestPending && (
                    <Text disabled fontSize="detail">
                      LOADING...
                    </Text>
                  )}
                </Flexbox>
              </Scrollbars>
            </Flexbox>
            <Spacer width="1ch" />
            <MovieDetails movie={get(movies, selectedMovie, movieList[0])} />
          </Flexbox>
        )}
      </Flexbox>
    </Surface>
  );
};

export default App;
