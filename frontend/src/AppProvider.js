import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

const AppProvider = ({ children, store, theme }) => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </Provider>
);

AppProvider.propTypes = {
  children: PropTypes.node,
  store: PropTypes.object,
  theme: PropTypes.object,
};

export default AppProvider;
