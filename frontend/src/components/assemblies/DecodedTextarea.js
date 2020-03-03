import React from 'react';
import PropTypes from 'prop-types';

import Flexbox from '../layout/Flexbox.js';
import Label from '../parts/Label.js';
import Textarea from '../parts/Textarea.js';


const DecodedTextarea = ({ decodedValue, setDecodedValue }) => (
  <Flexbox flexDirection="column" alignItems="flex-start">
    <Textarea
      value={decodedValue || ''}
      onChange={evt => setDecodedValue(evt.target.value)}
      placeholder="Enter any string value here, or enter a comma separated list of integers in the box below."
      onKeyPress={evt => {
        'Enter' === evt.key && setDecodedValue(decodedValue);
      }}
    />
    <Label>decoded</Label>
  </Flexbox>
);

DecodedTextarea.propTypes = {
  decodedValue: PropTypes.string,
  setDecodedValue: PropTypes.func,
};

export default DecodedTextarea;
