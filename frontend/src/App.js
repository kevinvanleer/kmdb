import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Surface from './components/layout/Surface.js';
import Flexbox from './components/layout/Flexbox.js';
import Spacer from './components/layout/Spacer.js';
import Text from './components/parts/Text.js';

import MovieDetails from './components/assemblies/MovieDetails.js';
import MovieList from './components/assemblies/MovieList.js';

import { getMovies } from './redux/state/core/movies/base.js';

import { get, isEmpty } from 'lodash';

import './App.css';

const App = () => {
  const movies = useSelector(state => getMovies(state));
  const [selectedMovie, setSelectedMovie] = useState(0);

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
            <MovieList
              movies={movies}
              selectedMovie={selectedMovie}
              setSelectedMovie={setSelectedMovie}
            />
            <Spacer width="1ch" />
            <MovieDetails movie={get(movies, selectedMovie)} />
          </Flexbox>
        )}
      </Flexbox>
    </Surface>
  );
};

export default App;
