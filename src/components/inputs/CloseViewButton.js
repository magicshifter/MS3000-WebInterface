import React from 'react';
import { Link } from 'react-router';

import { getIconCssClassObject } from 'utils/icons';

import classes from './CloseViewButton.scss';

export const CloseViewButton =
  () =>
    <Link
      className={classes['container']}
      to='/'
    >
      <i {...getIconCssClassObject('close')} />
    </Link>;

export default CloseViewButton;
