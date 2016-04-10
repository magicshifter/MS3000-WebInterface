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
      const { touches, buttons } = e;
      const touchExists = touches && touches.length > 0;

      const { target } = e;

      if (touchExists || buttons === 1) {
        console.log({ tar: target, id: pixel.id, touches: e.touches });
        // console.log({ evt: 'onmouseover', e, touches: touches });
        // console.log({ pixel, color });
        pixelHover({ pixel, color });
      }

      e.preventDefault();
      return false;
    };

  onTouchMove =
    e => {
      const { color, pixelHover } = this.props;

      const touches = e.changedTouches;
      const first = touches[0];

      const { clientX, clientY } = first;

      const target = document.elementFromPoint(clientX, clientY);

      if (target) {
        const id = target.id.replace('c-', '');
        const pixel = { id };
        pixelHover({ pixel, color });
      }

      e.preventDefault();
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
        id={`c-${pixel.id}`}
        className={classes['container']}
        onMouseDown={this.onClick}
        onMouseOver={this.onMouseOver}
        onTouchStart={this.onClick}
        onTouchMove={this.onTouchMove}
        style={style}
      ></td>
    );
  }
}

export default connect(mapStateToProps, actions)(Pixel);
