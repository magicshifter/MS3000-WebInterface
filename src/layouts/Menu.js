import React from 'react';

import MenuLink from './MenuLink.js';

import classes from './Menu.scss';

import { links } from 'GLOBALS';

import DiscoverMagicShifter from 'components/DiscoverMagicShifter';

export const Menu =
  () =>
    <nav className={classes['container']}>
      <ul>
        <DiscoverMagicShifter
          key='connect'
          to='/connect'
          icon='loading'
          title='Connecting to MagicShifter 3000'
        />
        {links.map(
          link =>
            <MenuLink
              {...link}
              key={link.key || link.text || link.icon}
            />
        )}
      </ul>
    </nav>;

export default Menu;
