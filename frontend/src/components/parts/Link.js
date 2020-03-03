import styled from 'styled-components';

export const Link = styled.a`
  font-family: ${props => props.theme.type.normal};
  color: ${props => props.theme.colors.surface.normal.font};
  a:link {
    color: #0ee;
  }
  a:visited {
    color: #0aa;
  }
  a:active {
    color: #088;
  }
  a:hover {
    color: #0ff;
  }
`;

export default Link;
