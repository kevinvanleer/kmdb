import React from 'react';
import styled from 'styled-components';

import Flexbox from '../layout/Flexbox';
import Text from '../parts/Text';

const Dropzone = styled(
  ({ className, getRootProps, getInputProps, isDragActive }) => (
    <Flexbox
      alignItems="center"
      justifyContent="center"
      className={className}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <Text>Drop the file here ...</Text>
      ) : (
        <Text>{"Drag 'n' drop a file here, or click to select"}</Text>
      )}
    </Flexbox>
  )
)`
  border-radius: 20px;
  flex-grow: 1;
  outline: none;
  user-select: none;
  ${({ isDragActive, theme }) =>
    isDragActive
      ? `
  color: white;
  border: 20px dashed white;
  opacity: 1;
  `
      : `
  border: 20px dashed ${theme.colors.borders};
  opacity: 0.5;
  `};
`;

export default Dropzone;
