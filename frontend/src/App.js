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
import { getPending } from './redux/state/requests/fetchMovies/base.js';

import { get, isEmpty } from 'lodash';

import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const movies = useSelector(state => getMovies(state));
  const listPending = isEmpty(movies);
  const requestPending = useSelector(state => getPending(state));
  const [selectedMovie, setSelectedMovie] = useState(0);
  const scrollContent = useRef(null);
  const scrollContainer = useRef(null);

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
              <Scrollbars
                onScrollStop={() =>
                  scrollContent.current &&
                  scrollContainer.current &&
                  scrollContent.current.getBoundingClientRect().bottom - 500 <=
                    scrollContainer.current.getBoundingClientRect().bottom &&
                  dispatch(fetchMovies(50, Object.keys(movies).length))
                }
              >
                <Flexbox
                  ref={scrollContent}
                  flexDirection="column"
                  maxWidth="50vw"
                  minWidth="20vw"
                >
                  {Object.values(movies).map(movie => (
                    <Clickable
                      id={movie.id}
                      key={movie.id}
                      onClick={() => {
                        console.debug(movie.id);
                        setSelectedMovie(movie.id);
                      }}
                    >
                      <Text>{movie.title}</Text>
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
            <MovieDetails movie={get(movies, selectedMovie)} />
          </Flexbox>
        )}
      </Flexbox>
    </Surface>
  );
};

export default App;
