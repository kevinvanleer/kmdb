import styled from 'styled-components';
import Flexbox from './Flexbox.js';

const Divider = styled(Flexbox).attrs({ className: 'grasp-divider' })`
  border-bottom: ${props =>
    props.horizontal && `1px solid ${props.theme.colors.borders};`};
  border-right: ${props =>
    props.vertical && `1px solid ${props.theme.colors.borders};`};
`;

export default Divider;
