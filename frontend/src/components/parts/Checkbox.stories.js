import React from 'react';

import Checkbox from './Checkbox';

export default { title: 'Checkbox' };

export const unchecked = () => <Checkbox />;
export const checked = () => <Checkbox checked />;
export const disabled = () => <Checkbox disabled />;
