import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import Button from './Button';

const actions = {
  onClick: action('onClick'),
};
storiesOf('Button', module)
  .add('Basic', () => <Button {...actions} />)
  .add('Disabled', () => <Button disabled {...actions} />);
