import styled from 'styled-components';

const Flexbox = styled.div.attrs({ className: 'grasp-flexbox' })`
  display: ${props => (props.inline ? 'inline-flex' : 'flex')};
  flex: ${props => props.flex};
  flex-flow: ${props => props.flexFlow};
  flex-direction: ${props => props.flexDirection};
  align-items: ${props => props.alignItems};
  align-self: ${props => props.alignSelf};
  align-content: ${props => props.alignContent};
  justify-content: ${props => props.justifyContent};
  flex-grow: ${props => props.flexGrow};
  flex-shrink: ${props => props.flexShrink};
  flex-basis: ${props => props.flexBasis};
  flex-wrap: ${props => props.flexWrap};
  order: ${props => props.order};
  width: ${props => props.width};
  height: ${props => props.height};
  min-width: ${props => props.minWidth};
  min-height: ${props => props.minHeight};
  max-width: ${props => props.maxWidth};
  max-height: ${props => props.maxHeight};
  margin: ${props => props.margin};
  margin-top: ${props => props.marginTop};
  margin-bottom: ${props => props.marginBottom};
  margin-left: ${props => props.marginLeft};
  margin-right: ${props => props.marginRight};
  opacity: ${props => props.opacity};
  overflow: ${props => props.overflow};
  padding: ${props => props.padding};
  padding-top: ${props => props.paddingTop};
  padding-bottom: ${props => props.paddingBottom};
  padding-left: ${props => props.paddingLeft};
  padding-right: ${props => props.paddingRight};
  position: ${props => props.position};
  visibility: ${props => props.visibility};
  z-index: ${props => props.zIndex};
  left: ${props => props.left};
  right: ${props => props.right};
  bottom: ${props => props.bottom};
  top: ${props => props.top};
  background-color: ${props => props.backgroundColor};

  ${({ disabled }) => disabled && `pointer-events: none; opacity: 0.3;`}
  ${({ marginBetween }) =>
    marginBetween &&
    `
  & > *:not(:first-child) { margin-top: ${marginBetween}; }`}
`;

export default Flexbox;
