import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Clickable from '../core/Clickable.js';
import Icon from './Icon.js';

const ToggleButton = styled(
  ({
    id,
    className,
    iconTrue,
    iconFalse,
    value,
    setValue,
    tooltipTrue,
    tooltipFalse,
  }) => (
    <Clickable
      id={id}
      className={className}
      title={value ? tooltipTrue : tooltipFalse}
      onClick={() => setValue(!value)}
    >
      <Icon size="lg" icon={value ? iconTrue : iconFalse} />
    </Clickable>
  )
)`
  padding: 0.5em;
  min-width: 48px;
  cursor: 'pointer';
`;

ToggleButton.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  iconTrue: PropTypes.object,
  iconFalse: PropTypes.object,
  value: PropTypes.bool,
  setValue: PropTypes.func,
  tooltipTrue: PropTypes.string,
  tooltipFalse: PropTypes.string,
};

export default ToggleButton;
