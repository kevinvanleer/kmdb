import React from 'react';

import Flexbox from '../layout/Flexbox.js';
import Scrollbars from '../layout/Scrollbars.js';
import Spacer from '../layout/Spacer.js';
import Text from '../parts/Text.js';
import Link from '../parts/Link.js';

import { get } from 'lodash';

const MovieDetails = ({ movie }) =>
  movie ? (
    <Flexbox flexDirection="column" flexGrow="1">
      <Flexbox alignItems="flex-end" flexWrap="wrap">
        <Text fontSize="heading">{get(movie, 'title')}</Text>
        <Spacer width="1ch" />
        <Text disabled>
          {/^[AEIOU]/.test(get(movie, 'origin')) ? 'an' : 'a'}{' '}
          {get(movie, 'origin')} film
        </Text>
      </Flexbox>
      <Spacer height="1em" />
      <Flexbox alignItems="flex-end">
        <Text fontSize="label">{get(movie, 'release_year')}</Text>
        <Spacer width="1ch" />
        <Text disabled>{get(movie, 'genre').toUpperCase()}</Text>
      </Flexbox>
      <Spacer height="1em" />
      <Flexbox alignItems="flex-end">
        <Flexbox flexDirection="column">
          <Text disabled fontSize="detail">
            DIRECTED BY
          </Text>
          <Text fontSize="label">{get(movie, 'director', 'Unknown')}</Text>
        </Flexbox>
        <Spacer width="1ch" />
      </Flexbox>
      <Spacer height="1em" />
      <Text disabled fontSize="detail">
        PLOT SUMMARY
      </Text>
      <Scrollbars>
        <Text>{get(movie, 'plot')}</Text>
      </Scrollbars>
      <Spacer height="1em" />
      <Text disabled fontSize="detail">
        CAST
      </Text>
      <Text>{get(movie, 'cast_of_characters', 'No information avaiable')}</Text>
      <Spacer height="1em" />
      <Text disabled fontSize="detail">
        MORE INFORMATION
      </Text>
      <Link href={get(movie, 'wiki_page')}>{get(movie, 'wiki_page')}</Link>
      <Spacer height="1em" />
    </Flexbox>
  ) : (
    <Flexbox flexGrow="1" alignItems="center" justifyContent="center">
      <Text fontSize="heading" disabled>
        Selet a movie from the list
      </Text>
    </Flexbox>
  );

export default MovieDetails;
