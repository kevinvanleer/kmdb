import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import Button from './CircleButton';

const actions = {
  onClick: action('onClick'),
};
storiesOf('CircleButton', module).add('Basic', () => <Button {...actions} />);
storiesOf('CircleButton', module).add('with char', () => (
  <Button {...actions}>B</Button>
));
