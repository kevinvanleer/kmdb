import React from 'react';
import PropTypes from 'prop-types';

import { Scrollbars as ReactCustomScrollbars } from 'react-custom-scrollbars';

export const Scrollbars = ({ children, ...props }) => (
  <ReactCustomScrollbars
    {...props}
    renderThumbVertical={({ style, ...props }) => (
      <div
        {...props}
        style={{
          ...style,
          backgroundColor: '#919397',
          opacity: 0.5,
        }}
      />
    )}
    renderThumbHorizontal={({ style, ...props }) => (
      <div
        {...props}
        style={{
          ...style,
          backgroundColor: '#919397',
          opacity: 0.5,
        }}
      />
    )}
  >
    {children}
  </ReactCustomScrollbars>
);

Scrollbars.propTypes = {
  props: PropTypes.node,
  children: PropTypes.node,
};

export default Scrollbars;
