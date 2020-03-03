import React from 'react';
import Text from './Text';

import { storiesOf } from '@storybook/react';

storiesOf('Text', module)
  .add('Basic', () => <Text>test</Text>)
  .add('Inline', () => (
    <React.Fragment>
      <Text>test</Text>
      <Text>test</Text>
    </React.Fragment>
  ))
  .add('monospace', () => <Text mono>test</Text>)
  .add('bold', () => <Text bold>test</Text>)
  .add('italic', () => <Text italic>test</Text>)
  .add('disabled', () => <Text disabled>test</Text>)
  .add('title', () => <Text fontSize="title">test</Text>)
  .add('custom size', () => <Text fontSize="5em">test</Text>);
