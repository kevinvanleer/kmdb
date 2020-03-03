import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import Select from './Select';

storiesOf('Select', module)
  .add('Basic', () => <Select onChange={action('onChange')} />)
  .add('Creatable', () => <Select creatable onChange={action('onChange')} />)
  .add('Fifty percent width', () => (
    <Select width="50%" onChange={action('onChange')} />
  ));
