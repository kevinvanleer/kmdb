import React from 'react';
import PropTypes from 'prop-types';

import Flexbox from '../layout/Flexbox.js';

import EncodedTextarea from '../assemblies/EncodedTextarea.js';
import DecodedTextarea from '../assemblies/DecodedTextarea.js';

const Transcoder = ({
  decodedValue,
  encodedArray,
  setDecodedValue,
  setEncodedArray,
}) => {
  return (
    <Flexbox flexDirection="column" justifyContent="center">
      <DecodedTextarea
        decodedValue={decodedValue}
        setDecodedValue={setDecodedValue}
      />
      <Flexbox width="1ch" height="1em" />
      <EncodedTextarea
        encodedArray={encodedArray}
        setEncodedArray={setEncodedArray}
      />
    </Flexbox>
  );
};

Transcoder.propTypes = {
  decodedValue: PropTypes.string,
  encodedArray: PropTypes.array,
  setDecodedValue: PropTypes.func,
  setEncodedValue: PropTypes.func,
};

export default Transcoder;
