import styled from 'styled-components';
import Button from './Button.js';

const CircleButton = styled(Button)`
  && {
    width: 64px;
    min-width: 64px;
    max-width: 64px;
    min-height: 64px;
    height: 64px;
    max-height: 64px;
    padding: 0;
    margin: 0;
    border-radius: 50%;
  }
`;

export default CircleButton;
