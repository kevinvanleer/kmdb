import { initialState } from './schema';
import { get } from 'lodash';

export const REQUESTS_FETCH_MOVIES__INITIATE_REQUEST =
  'REQUESTS_FETCH_MOVIES__INITIATE_REQUEST';
export const REQUESTS_FETCH_MOVIES__SET_RESULT_SUCCESS =
  'REQUESTS_FETCH_MOVIES__SET_RESULT_SUCCESS';
export const REQUESTS_FETCH_MOVIES__SET_RESULT_FAIL =
  'REQUESTS_FETCH_MOVIES__SET_RESULT_FAIL';

export const getPending = state => get(state, 'requests.fetchMovies.pending');
export const getComplete = state =>
  get(state, 'requests.fetchMovies.complete');
export const getSuccess = state => get(state, 'requests.fetchMovies.success');
export const getError = state => get(state, 'requests.fetchMovies.error');

export const initiateRequest = object => ({
  type: REQUESTS_FETCH_MOVIES__INITIATE_REQUEST,
  value: {
    pending: true,
    error: null,
    complete: false,
    success: null,
    result: null,
    object,
  },
});

export const setResultSuccess = result => ({
  type: REQUESTS_FETCH_MOVIES__SET_RESULT_SUCCESS,
  value: {
    pending: false,
    error: false,
    complete: true,
    success: true,
    result,
  },
});

export const setResultFail = result => ({
  type: REQUESTS_FETCH_MOVIES__SET_RESULT_FAIL,
  value: {
    pending: false,
    error: true,
    complete: true,
    success: false,
    result,
  },
});

const fetchMovies = (state = initialState, action) => {
  switch (action.type) {
    case REQUESTS_FETCH_MOVIES__INITIATE_REQUEST:
      return Object.assign({}, state, { ...action.value });
    case REQUESTS_FETCH_MOVIES__SET_RESULT_SUCCESS:
      return Object.assign({}, state, { ...action.value });
    case REQUESTS_FETCH_MOVIES__SET_RESULT_FAIL:
      return Object.assign({}, state, { ...action.value });
    default:
      return state;
  }
};

export default fetchMovies;
