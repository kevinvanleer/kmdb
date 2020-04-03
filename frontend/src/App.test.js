import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AppProvider from './AppProvider.js';
import currentTheme from './themes.js';
import configureStore from './redux/configureStore';

const store = configureStore();

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <AppProvider store={store} theme={currentTheme}>
      <App />
    </AppProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
