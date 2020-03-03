import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { get } from 'lodash';

const Icon = styled(FontAwesomeIcon)`
  padding: ${props => get(props, 'padding', undefined)};
`;

export default Icon;
