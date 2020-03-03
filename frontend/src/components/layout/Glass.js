import styled from 'styled-components';
import Color from 'color';

import Paper from './Paper.js';

export const Glass = styled(Paper)`
  background-color: ${props =>
    Color(props.theme.colors.surface.normal.background)
      .alpha(0.7)
      .string()};
`;

export default Glass;
