import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import rgba from 'rgba-convert';

import { colorType, pixelType } from 'utils/propTypes';

import { actions } from 'redux/modules/pixels';

import classes from './Pixel.scss';

const mapStateToProps =
  ({ imageView }) => {
    return {
      color: imageView.get('color'),
      rows: imageView.get('rows'),
    };
  };

export class Pixel extends Component {
  static propTypes = {
    pixel: pixelType.isRequired,
    color: colorType.isRequired,
    size: PropTypes.number.isRequired,
    pixelClick: PropTypes.func.isRequired,
    pixelHover: PropTypes.func.isRequired,
  };

  onClick =
    e => {
      const { pixel, color, pixelClick } = this.props;

      pixelClick({ pixel, color });

      e.preventDefault();
      return false;
    };

  onMouseOver =
    e => {
      const { pixelHover, pixel, color } = this.props;

      console.log('onmouseover');

      if (e.touches || e.buttons === 1) {
        pixelHover({ pixel, color });
      }

      e.preventDefault();
      return false;
    };

  render() {
    const { pixel, size } = this.props;

    const style = {
      backgroundColor: rgba.css(pixel.color),
      width: size,
      height: size,
    };

    return (
      <td
        className={classes['container']}
        onMouseDown={this.onClick}
        onMouseOver={this.onMouseOver}
        onTouchStart={this.onClick}
        onTouchMove={this.onMouseOver}
        style={style}
      ></td>
    );
  }
}

export default connect(mapStateToProps, actions)(Pixel);
