import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import monitorReducersEnhancer from './enhancers/monitorReducers';
import loggerMiddleware from './middleware/logger';
import storybookReduxAddonEnhancer from 'addon-redux/enhancer';
import rootReducer from './state/index';

export default function configureStore(preloadedState) {
  const middlewares = [thunkMiddleware];
  process.env.NODE_ENV !== 'production' && middlewares.push(loggerMiddleware);
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  if (process.env.NODE_ENV !== 'production') {
    enhancers.push(monitorReducersEnhancer);
    enhancers.push(storybookReduxAddonEnhancer);
  }
  const composedEnhancers = compose(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  return store;
}
