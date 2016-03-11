import React from 'react';
import { Link } from 'react-router';

import { getIconCssClass } from 'utils/icons';

import classes from './CloseViewButton.scss';

export const CloseViewButton =
  () =>
    <Link
      className={classes['container']}
      to='/'
    >
      <i className={getIconCssClass('close')} />
    </Link>;

export default CloseViewButton;
