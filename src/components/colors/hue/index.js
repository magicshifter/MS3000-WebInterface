'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { colorType } from 'utils/propTypes';

import classes from './Hue.scss';

const actions = {};

const mapStateToProps =
  ({ imageView }) => ({
    color: imageView.get('color'),
  });

export class Hue extends Component {

  static defaultProps = {
    direction: 'vertical',
    hsl: {
      h: 0,
      s: 0,
      l: 0,
      a: 0,
    },
  };

  static propTypes = {
    color: colorType,
    hsl: PropTypes.object,
    direction: PropTypes.string,
    onChange: PropTypes.func,
  };

  componentWillUnmount() {
    this.unbindEventListeners();
  }

  handleChange =
    (e, skip) => {
      !skip && e.preventDefault();
      const { direction, hsl, onChange } = this.props;
      const { container } = this.refs;
      const { clientHeight, clientWidth } = container;
      const left = (e.pageX || e.touches[0].pageX) - (container.getBoundingClientRect().left + window.pageXOffset);
      const top = (e.pageY || e.touches[0].pageY) - (container.getBoundingClientRect().top + window.pageYOffset);

      let h;
      let percent;

      if (direction === 'vertical') {
        if (top < 0) {
          h = 359;
        } else if (top > clientHeight) {
          h = 0;
        } else {
          percent = -(top * 100 / clientHeight) + 100;
          h = (360 * percent / 100);
        }
      } else {
        if (left < 0) {
          h = 0;
        } else if (left > clientWidth) {
          h = 359;
        } else {
          percent = left * 100 / clientWidth;
          h = (360 * percent / 100);
        }
      }

      if (hsl.h !== h) {
        console.log({ h, hsl });


        onChange({
          ...hsl,
          h: h,
          source: 'rgb',
        });
      }
    };

  handleMouseDown =
    (e) => {
      this.handleChange(e, true);
      window.addEventListener('mousemove', this.handleChange);
      window.addEventListener('mouseup', this.handleMouseUp);
    };

  handleMouseUp =
    () => {
      this.unbindEventListeners();
    };

  unbindEventListeners =
    () => {
      window.removeEventListener('mousemove', this.handleChange);
      window.removeEventListener('mouseup', this.handleMouseUp);
    };

  render() {
    const { direction } = this.props;
    return (
      <div
        className={[
          classes['container'],
          classes[direction === 'vertical' ? 'vertical' : 'horizontal'],
        ].join(' ')}
        ref='container'
        onMouseDown={this.handleMouseDown}
        onTouchMove={this.handleChange}
        onTouchStart={this.handleChange}
      >
        <div
          className={classes['pointer']}
          ref='pointer'
          style={{
            top: -((this.props.hsl.h * 100) / 360) + 100 + '%',
            left: (this.props.hsl.h * 100) / 360 + '%',
          }}
        >
          <div className={classes['slider']} />
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  actions,
)(Hue);
