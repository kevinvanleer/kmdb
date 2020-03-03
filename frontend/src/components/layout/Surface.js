import styled from 'styled-components';

import Flexbox from './Flexbox.js';

export const Surface = styled(Flexbox)`
  font-family: ${props => props.theme.type.normal};
  background-color: ${props => props.theme.colors.surface.normal.background};
  color: ${props => props.theme.colors.surface.normal.font};
`;

export default Surface;
