import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getIconCssClass } from 'utils/icons';
import { pixelsType } from 'utils/propTypes';

import { actions } from 'redux/modules/pixels';

import classes from './ClearPixelsButton.scss';

const mapStateToProps =
  ({ pixels }) => {
    return {
      pixels: pixels.toJS(),
    };
  };

export class ClearPixelsButton extends Component {
  static propTypes = {
    clearPixels: PropTypes.func.isRequired,
    pixels: pixelsType.isRequired,
  };

  onClick =
    () => {
      const { pixels, clearPixels } = this.props;
      clearPixels(pixels);
    };

  render =
    () =>
      <div className={classes['container']}>
        <ul>
          <li>
            <i
              title='Clear Pixels'
              className={getIconCssClass('trash')}
              onClick={this.onClick}
            />
          </li>
        </ul>
      </div>;
}

export default connect(mapStateToProps, actions)(ClearPixelsButton);

