import styled from 'styled-components';

const Grid = styled.div.attrs(() => ({ className: 'grasp-grid' }))`
  display: grid;
  ${({ flow, length, gap }) =>
    flow === 'column'
      ? `
  grid-template-rows: repeat(${length}, auto);
  grid-auto-flow: column;
  grid-row-gap: ${gap};
  `
      : `
  grid-template-columns: repeat(${length}, auto);
  grid-auto-flow: row;
  grid-column-gap: ${gap};
  `}
`;

export default Grid;
