import { v4 as uuid } from 'uuid';

import { getMovies, setMovies } from './base';

//import { updateSet } from '../../../../utilities/setOperations.js';
//import * as exports from './expressionActions.js';

export const addMovie = expression => (dispatch, getState) => {
  const expressions = getMovies(getState());
  expression.id = uuid();
  expressions.push(expression);
  dispatch(setMovies(expressions));
};

export const removeMovie = id => (dispatch, getState) => {
  const expressions = getMovies(getState());
  const index = expressions.findIndex(expression => expression.id === id);
  if (index >= 0) {
    expressions.splice(index, 1);
    dispatch(setMovies(expressions));
  }
};
