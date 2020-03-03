import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import SquareButton from './SquareButton';

const actions = {
  onClick: action('onClick'),
};
storiesOf('SquareButton', module)
  .add('Basic', () => <SquareButton {...actions} />)
  .add('Disabled', () => <SquareButton disabled {...actions} />)
  .add('One char', () => <SquareButton {...actions}>O</SquareButton>)
  .add('Three chars', () => <SquareButton {...actions}>OOO</SquareButton>);
