import styled from 'styled-components';
import Flexbox from './Flexbox.js';

const Spacer = styled(Flexbox).attrs({ className: 'grasp-spacer' })`
  min-width: ${props => props.width};
  min-height: ${props => props.height};
`;

export default Spacer;
