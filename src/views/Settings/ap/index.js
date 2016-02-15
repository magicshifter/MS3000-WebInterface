import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import AddApInput from './AddApInput';

import { getIconCssClass } from 'utils/icons';

import classes from './ApSettings.scss';

import { actions } from 'redux/modules/views/settings';

const mapStateToProps =
  state => ({
    ssid: state.settingsView.toJS().ssid,
  });

export class ApSettings extends Component {
  static propTypes = {
    ssid: PropTypes.string,
    newApName: PropTypes.string,
    newApPass: PropTypes.string,
    onFormSubmit: PropTypes.func.isRequired,
    onInputChange: PropTypes.func.isRequired,
    loadApSettings: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      ssid: props.ssid,
      addApMode: false,
    };

    this.toggleAddApMode = this.toggleAddApMode.bind(this);
    this.scanAccesspoints = this.scanAccesspoints.bind(this);
  }

  scanAccesspoints() {
    const { loadApSettings } = this.props;
    this.setState({
      loading: true,
      error: false,
    });

    loadApSettings(this.state)
      .then(({ payload }) => {
        this.setState({
          loading: false,
          error: payload.message,
        });
      });
  }

  toggleAddApMode() {
    const { addApModeActive } = this.state;
    this.setState({
      addApModeActive: !addApModeActive,
    });
  }

  render() {
    const { ssid, onInputChange, onFormSubmit, newApName, newApPass } = this.props;
    const { loading, error, addApModeActive } = this.state;

    return (
      <form
        className={classes['container']}
        onSubmit={onFormSubmit}
      >
        <fieldset>
          <legend>Accesspoint:</legend>

          <h5>Preferred Accesspoint:</h5>
          <ul>
            <li>
              <label forHtml='ssid'>ssid</label>
              <input
                name='ssid'
                type='text'
                value={ssid}
                onChange={onInputChange}
              />
            </li>
            <li>
              <label forHtml='password'>password</label>
              <input
                name='password'
                type='password'
                onChange={onInputChange}
              />
            </li>
            <li>
              <input
                value='save'
                type='submit'
              />
            </li>
          </ul>

          <h5>Available Accesspoints:</h5>

          <ul>
            <li
              onClick={this.toggleAddApMode}
            >
              <h5>
                <i
                  className={getIconCssClass('plus')}
                />
                Add Accesspoint
              </h5>
            </li>
            {addApModeActive &&
              <li>
                <AddApInput
                  name={newApName}
                  pass={newApPass}
                  onInputChange={onInputChange}
                />
              </li>
            }
            <li>
              <input
                type='button'
                value='Scan Accesspoints'
                onClick={this.scanAccesspoints}
              />
              {loading &&
                <i
                  className={getIconCssClass('download')}
                />
              }
              <span>{error}</span>
            </li>
          </ul>
        </fieldset>
      </form>
    );
  }
}

export default connect(mapStateToProps, actions)(ApSettings);
