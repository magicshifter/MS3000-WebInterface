import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';

import {pixelsType} from 'utils/propTypes';

import {actions} from 'redux/modules/pixels.js';

import classes from './Filters.scss';

const mapStateToProps =
  ({pixels}) => ({
    pixels: pixels.toJS(),
  });

export class Filters extends Component {
  static propTypes = {
    invertPixels: PropTypes.func.isRequired, // action
    lightenPixels: PropTypes.func.isRequired, // action
    darkenPixels: PropTypes.func.isRequired, // action

    pixels: pixelsType.isRequired,
  };

  render() {
    const {
      invertPixels, darkenPixels, lightenPixels, // actions
      pixels,
    } = this.props;

    return (
      <div
        className={classes['container']}
      >
        <div>
          <h5>Filters</h5>
          <ul>
            <li>
              <button
                onClick={() => invertPixels(pixels)}
              >
                Invert
              </button>
            </li>
            <li>
              <button
                onClick={() => darkenPixels(pixels)}
              >
                Darken
              </button>
            </li>

            <li>
              <button
                onClick={() => lightenPixels(pixels)}
              >
                Lighten
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, actions)(Filters);