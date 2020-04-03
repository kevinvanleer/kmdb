import { setMoviesById, removeMovie } from './moviesByIdActions.js';

jest.mock('uuid');

import * as base from './base.js';
import { v4 as uuid } from 'uuid';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('movies by ID actions', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('setMoviesById empty list', () => {
    let store = mockStore();
    const mockGet = jest.spyOn(base, 'getMovies').mockImplementation(() => []);
    const mockSet = jest.spyOn(base, 'setMovies').mockImplementation(() => ({
      type: 'mock-set-filter-expressions',
    }));
    uuid.mockReturnValue('mockuuid');

    let fakeMovie = {
      _id: 'fake-id',
    };
    store.dispatch(setMoviesById([fakeMovie]));
    const mockActions = store.getActions();
    expect(mockActions.length).toBe(1);
    expect(mockActions).toEqual(
      expect.arrayContaining([{ type: 'mock-set-filter-expressions' }])
    );
    expect(mockGet).toHaveBeenCalled();
    expect(mockSet).toHaveBeenCalledWith({ [fakeMovie._id]: fakeMovie });
  });
  test('setMoviesById to populated list', () => {
    const initialMovies = { a: {}, b: {}, c: {} };
    let store = mockStore();
    const mockGet = jest
      .spyOn(base, 'getMovies')
      .mockImplementation(() => initialMovies);
    const mockSet = jest.spyOn(base, 'setMovies').mockImplementation(() => ({
      type: 'mock-set-filter-expressions',
    }));

    let fakeMovie = {
      _id: 'fake-id',
    };

    store.dispatch(setMoviesById([fakeMovie]));
    const mockActions = store.getActions();
    expect(mockActions.length).toBe(1);
    expect(mockActions).toEqual(
      expect.arrayContaining([{ type: 'mock-set-filter-expressions' }])
    );
    expect(mockGet).toHaveBeenCalled();
    expect(mockSet).toHaveBeenCalledWith({
      a: {},
      b: {},
      c: {},
      'fake-id': { _id: 'fake-id' },
    });
  });
  test('removeMovie last item', () => {
    let store = mockStore();

    let fakeMovie = {
      'fake-expression-id': {
        field: 'a',
        operation: '=',
        value: 'a-value',
        _id: 'fake-expression-id',
      },
    };

    const mockGet = jest
      .spyOn(base, 'getMovies')
      .mockImplementation(() => fakeMovie);
    const mockSet = jest.spyOn(base, 'setMovies').mockImplementation(() => ({
      type: 'mock-set-filter-expressions',
    }));

    store.dispatch(removeMovie('fake-expression-id'));
    const mockActions = store.getActions();
    expect(mockActions.length).toBe(1);
    expect(mockActions).toEqual(
      expect.arrayContaining([{ type: 'mock-set-filter-expressions' }])
    );
    expect(mockGet).toHaveBeenCalled();
    expect(mockSet).toHaveBeenCalledWith({});
  });
  test('removeMovie from populated list', () => {
    let fakeMovie = {
      'fake-expression-id': {
        field: 'a',
        operation: '=',
        value: 'a-value',
        _id: 'fake-expression-id',
      },
    };
    const initialMovies = { a: {}, b: {}, c: {}, ...fakeMovie };
    let store = mockStore();
    const mockGet = jest
      .spyOn(base, 'getMovies')
      .mockImplementation(() => initialMovies);
    const mockSet = jest.spyOn(base, 'setMovies').mockImplementation(() => ({
      type: 'mock-set-filter-expressions',
    }));

    store.dispatch(removeMovie('fake-expression-id'));
    const mockActions = store.getActions();
    expect(mockActions.length).toBe(1);
    expect(mockActions).toEqual(
      expect.arrayContaining([{ type: 'mock-set-filter-expressions' }])
    );
    expect(mockGet).toHaveBeenCalled();
    expect(mockSet).toHaveBeenCalledWith({ a: {}, b: {}, c: {} });
  });
});
