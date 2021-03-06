import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import rgba from 'rgba-convert';

import { getIconCssClass } from 'utils/icons';
import { isColor } from 'utils/types';
import { colorType } from 'utils/propTypes';

import classes from './MenuLink.scss';

export const MenuLink =
  ({ text, title, to, icon, iconClass, style = {}, color }) => {
    if (isColor(color) && icon === 'colors') {
      style = {
        ...style,
        color: rgba.css(color),
      };
    }

    return (
      <li className={classes['container']}>
        {
          to === '/'
          ? (
              <IndexLink
                to={to}
                activeClassName={classes['active']}
                title={title || text}
              >
                <i
                  className={iconClass || getIconCssClass(icon)}
                  style={style}
                />
              </IndexLink>
            )
          : (
              <Link
                to={to}
                activeClassName={classes['active']}
                title={title || text}
              >
                <i
                  className={iconClass || getIconCssClass(icon)}
                  style={style}
                />

                {text && <span>{text}</span>}
              </Link>
            )
        }
      </li>
    );
  };

MenuLink.propTypes = {
  text: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.string,
  iconClass: PropTypes.string,
  to: PropTypes.string.isRequired,
  style: PropTypes.object,
  color: colorType,
};

export default MenuLink;
