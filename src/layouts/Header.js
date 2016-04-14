import React from 'react';
import { Link } from 'react-router';

import Menu from './Menu';

import classes from './Header.scss';

export const Header =
  () =>
    <header className={classes['container']}>
      <Link
        to='/'
        className={classes['link']}
      >
        <span className={classes['logo']} />
      </Link>

      <Menu />
    </header>;

export default Header;
