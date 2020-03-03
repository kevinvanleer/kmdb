import React from 'react';
import styled from 'styled-components';
import Color from 'color';

import Clickable from '../core/Clickable';
import Spacer from '../layout/Spacer.js';
import Flexbox from '../layout/Flexbox.js';

const SquareButton = styled(({ className, children, ...props }) => (
  <Clickable className={`grasp-square-button ${className}`} {...props}>
    <Flexbox justifyContent="center" alignItems="center">
      <Spacer marginTop="100%" />
      <Flexbox>{children}</Flexbox>
    </Flexbox>
  </Clickable>
))`
  border: none;
  font: inherit;
  font-family: ${props => props.theme.type.face.normal};
  font-size: ${props => props.theme.type.height.button};
  cursor: pointer;
  outline: inherit;
  align-items: center;
  text-align: center;
  min-height: 2em;
  min-width: 2em;

  background-color: ${props =>
    Color(props.theme.colors.vantage.normal.background)
      .alpha(0.7)
      .string()};
  color: ${props => props.theme.colors.vantage.normal.font};
  border-radius: ${props => props.theme.borders.radius};
  padding: 0.5em 0.5em;

  ${({ disabled, theme }) =>
    disabled
      ? `
  cursor: not-allowed;
    background-color: ${Color(theme.colors.vantage.normal.background)
      .darken(0.5)
      .string()};
  `
      : `
  &:hover {
    background-color: ${theme.colors.vantage.normal.background};
  }
  &:active {
    background-color: ${Color(theme.colors.vantage.normal.background)
      .darken(0.5)
      .string()};
  }`}
`;

export default SquareButton;
