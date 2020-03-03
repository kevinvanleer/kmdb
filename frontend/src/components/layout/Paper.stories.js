import React from 'react';

import { storiesOf } from '@storybook/react';

import { Paper } from './Paper.js';

storiesOf('Paper', module)
  .add('No props', () => <Paper />)
  .add('Text', () => <Paper>Text on paper</Paper>);
