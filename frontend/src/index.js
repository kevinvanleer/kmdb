import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './redux/configureStore';
import './index.css';
import App from './App';
import AppProvider from './AppProvider.js';
import currentTheme from './themes.js';

import { fetchMovies } from './redux/workflows/fetchMovies.js';

const store = configureStore();
store.dispatch(fetchMovies({}));

ReactDOM.render(
  <AppProvider store={store} theme={currentTheme}>
    <App />
  </AppProvider>,
  document.getElementById('root')
);
