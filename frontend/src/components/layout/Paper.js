import styled from 'styled-components';

import Surface from './Surface.js';

export const Paper = styled(Surface)`
  border-radius: 1em;
  padding: 1em;
  filter: drop-shadow(0 3px 2px #000);
  margin-bottom: 5px;
`;

export default Paper;
