import React, { PropTypes } from 'react';
import { getIconCssClass } from 'utils/icons';

import classes from './ColorNav.scss';

export const ColorNav =
  ({ handleAddColorClick }) =>
    <div className={ classes['container'] }>
      <ul>
        <li
          onClick={ handleAddColorClick }
        >
          <i
            className={ getIconCssClass('plus') }
          />
        </li>
      </ul>
    </div>;

ColorNav.propTypes = {
  handleAddColorClick: PropTypes.func.isRequired,
};

export default ColorNav;
