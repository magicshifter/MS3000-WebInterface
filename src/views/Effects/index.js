import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import CloseViewButton from 'components/inputs/CloseViewButton';

import { pixelsType } from 'utils/propTypes';

import { actions } from 'redux/modules/pixels.js';

import classes from './Effects.scss';

const mapStateToProps =
  ({ pixels }) => ({
    pixels: pixels.toJS(),
  });

export class Effects extends Component {
  static propTypes = {
    invertPixels: PropTypes.func.isRequired, // action
    lightenPixels: PropTypes.func.isRequired, // action
    darkenPixels: PropTypes.func.isRequired, // action

    pixels: pixelsType.isRequired,
  };

  constructor(props) {
    super(props);

    this.invert = this.invert.bind(this);
    this.lighten = this.lighten.bind(this);
    this.darken = this.darken.bind(this);
  }

  invert() {
    const { pixels, invertPixels } = this.props;
    invertPixels(pixels);
  }

  lighten() {
    const { pixels, lightenPixels } = this.props;
    lightenPixels(pixels);
  }

  darken() {
    const { pixels, darkenPixels } = this.props;
    darkenPixels(pixels);
  }

  render() {
    return (
      <div
        className={classes['container']}
      >
        <h5>effects</h5>

        <CloseViewButton />

        <ul>
          <li>
            <button
              onClick={this.invert}
            >
              Invert
            </button>
          </li>
          <li>
            <button
              onClick={this.darken}
            >
              Darken
            </button>
          </li>

          <li>
            <button
              onClick={this.lighten}
            >
              Lighten
            </button>
          </li>
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps, actions)(Effects);
