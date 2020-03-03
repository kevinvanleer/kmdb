import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Flexbox from '../layout/Flexbox.js';
import Label from '../parts/Label.js';
import Error from '../parts/Error.js';
import Textarea from '../parts/Textarea.js';

const EncodedTextarea = ({ encodedArray, setEncodedArray }) => {
  let [badInput, setBadInput] = useState(false);

  return (
    <Flexbox flexDirection="column" alignItems="flex-start">
      <Textarea
        value={
          encodedArray
            ? encodedArray.map(
                item => (item === null || Number.isNaN(item) ? '' : item)
              )
            : ''
        }
        placeholder="266612521,233932948,234690629,267480282,250776100,200377091,133336357,116662882,267661097,99680276,267447871,234096717,267714634,133236482,268187974,116401762,267664937,268174299,116417602,133244164,133456434,267439770,19997489"
        onChange={evt => {
          if (/^$|^[\d, ]+$/.test(evt.target.value)) {
            setBadInput(false);
            setEncodedArray(
              evt.target.value
                .split(/\W */)
                .map(
                  item => (Number.isNaN(parseInt(item)) ? null : parseInt(item))
                )
            );
          } else {
            setBadInput(true);
            console.error('not valid input');
          }
        }}
        onKeyPress={evt => {
          'Enter' === evt.key && setEncodedArray(encodedArray);
        }}
      />
      <Flexbox justifyContent="space-between" width="100%">
        <Label>encoded</Label>
        {badInput && <Error>removed invalid characters</Error>}
      </Flexbox>
    </Flexbox>
  );
};

EncodedTextarea.propTypes = {
  encodedArray: PropTypes.array,
  setEncodedValue: PropTypes.func,
};

export default EncodedTextarea;
