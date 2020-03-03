import React from 'react';
import Icon from './Icon';

import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

import { storiesOf } from '@storybook/react';

storiesOf('Icon', module)
  .add('chevron-up', () => <Icon icon={faChevronUp} />)
  .add('chevron-down', () => <Icon icon={faChevronDown} />)
  .add('2em', () => <Icon icon={faChevronDown} size="2em" />);
