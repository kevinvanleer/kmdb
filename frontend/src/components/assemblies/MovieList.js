import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Flexbox from '../layout/Flexbox.js';
import Scrollbars from '../layout/Scrollbars.js';
import Text from '../parts/Text.js';
import Clickable from '../core/Clickable.js';

import { fetchMovies } from '../../redux/workflows/fetchMovies.js';
import {
  getPending,
  getSuccess,
  getResult,
} from '../../redux/state/requests/fetchMovies/base.js';

import { set } from 'lodash';
const MovieList = ({ movies, selectedMovie, setSelectedMovie }) => {
  const dispatch = useDispatch();
  const requestPending = useSelector(state => getPending(state));
  const requestSuccess = useSelector(state => getSuccess(state));
  const fetchedMovies = useSelector(state => getResult(state));
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

  return (
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
                <Text bold={selectedMovie === movie.id}>{movie.title}</Text>
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
  );
};

export default MovieList;
