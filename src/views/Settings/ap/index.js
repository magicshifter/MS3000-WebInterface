import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getIconCssClass } from 'utils/icons';

import { fetch, parseJSONResult } from 'utils/http';

import uniqueBy from 'unique-by';

import classes from './ApSettings.scss';
import errorClasses from 'styles/errors.scss';

import { actions } from 'redux/modules/views/settings';

const mapStateToProps =
  ({ settingsView }) => {
    const {
      protocol,
      host,
    } = settingsView.toJS();

    return {
      protocol,
      host,
    };
  };

export class ApSettings extends Component {
  static propTypes = {
    addAp: PropTypes.func.isRequired,
    host: PropTypes.string.isRequired,
    protocol: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      loadingAvailableAps: true,
      loadingAvailableApsError: false,
      loadingSavedAps: true,
      loadingSavedApsError: false,
      preferredAp: {},
      savedAps: [],
      availableAps: [],
      uploadingNewAp: false,
      uploadingNewApError: false,
      uploadingPreferredAp: false,
      uploadingPreferredApError: false,
      newApSSID: '',
      newApPass: '',
    };

    this.toggleAddApMode = this.toggleAddApMode.bind(this);
    this.loadAvailableAps = this.loadAvailableAps.bind(this);
    this.handleScanApClick = this.handleScanApClick.bind(this);
    this.loadsavedAps = this.loadsavedAps.bind(this);
    this.handleLoadSavedApsClick = this.handleLoadSavedApsClick.bind(this);
    this.removeSavedAp = this.removeSavedAp.bind(this);
    this.sendPreferredAp = this.sendPreferredAp.bind(this);
    this.uploadNewAp = this.uploadNewAp.bind(this);
    this.setNewApPass = this.setNewApPass.bind(this);
    this.setNewApSSID = this.setNewApSSID.bind(this);

    this.addApToState = this.addApToState.bind(this);
    this.addActiveApToState = this.addActiveApToState.bind(this);
    this.addCustomApToState = this.addCustomApToState.bind(this);

    this.handleHostActiveClick = this.handleHostActiveClick.bind(this);

    this.loadAvailableAps();
    this.loadsavedAps();
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleScanApClick() {
    this.setState({
      loadingAvailableAps: true,
      loadingAvailableApsError: false,
    });

    this.loadAvailableAps();
  }

  handleLoadSavedApsClick() {
    this.setState({
      loadingSavedAps: true,
      loadingSavedApsError: false,
    });

    this.loadsavedAps();
  }

  handleHostActiveClick(e) {
    if (e.target && e.target.value) {
      this.setState({
        activeAp: e.target.value,
      });
    }
  }

  loadPreferredAp() {
    const { protocol, host } = this.props;

    const url = `${protocol}://${host}/settings/wifi/preferred`;

    this.setState({
      loadingPreferredAp: true,
      loadingPreferredApError: false,
    });

    fetch({ url })
      .then(
        res =>
        this._isMounted &&
        this.setState({
          loadingPreferredAp: false,
          loadingPreferredApError: res.status !== 200 && 'Network Error',
          preferredAp: parseJSONResult(res.response || res.responseText),
        })
      )
      .catch(
        e =>
        this._isMounted &&
        this.setState({
          loadingPreferredAp: false,
          loadingPreferredApError: e.message || 'Network Error',
        })
      );
  }

  removeSavedAp({ e, ap = {}}) {
    const { protocol, host } = this.props;
    let { savedAps } = this.state;

    if (ap.ssid) {
      savedAps = savedAps.filter(
        testAp =>
          testAp.ssid !== ap.ssid
      );

      this.setState({
        removingSavedAp: true,
      });

      const url = `${protocol}://${host}/settings/wifi/delete?ssid=${ap.ssid}`;
      fetch({ url })
        .then(
          res =>
            this._isMounted &&
            this.setState({
              removingSavedAp: false,
              removingSavedApError: res.status !== 200 && 'Network Error',
              savedAps,
            })
        )
        .catch(
          e =>
            this._isMounted &&
            this.setState({
              removingSavedAp: false,
              removingSavedApError: e.message || 'Network Error',
            })
        );
    }
  }

  loadAvailableAps() {
    const { host, protocol } = this.props;

    fetch({ url: `${protocol}://${host}/listwlans` })
      .then(
        res =>
        this._isMounted &&
        this.setState({
          loadingAvailableAps: false,
          availableAps: uniqueBy(parseJSONResult(res.response || res.responseText), 'ssid'),
        })
      )
      .catch(
        e =>
        this._isMounted &&
        this.setState({
          loadingAvailableAps: false,
          loadingAvailableApsError: e.message || 'Unknown Error',
        })
      );
  }

  loadsavedAps() {
    const { host, protocol } = this.props;

    const url = `${protocol}://${host}/settings/wifi/list`;
    fetch({ url })
      .then(
        res =>
        this._isMounted &&
        this.setState({
          loadingSavedAps: false,
          savedAps: uniqueBy(parseJSONResult(res.response || res.responseText), 'ssid'),
        })
      ).catch(
      e =>
      this._isMounted &&
      this.setState({
        loadingSavedAps: false,
        loadingSavedApsError: e.message || 'Unknown Error',
      })
    );
  }

  toggleAddApMode() {
    this.setState({
      addApModeActive: !this.state.addApModeActive,
    });
  }

  addCustomApToState() {
    const { newApSSID, newApPass } = this.state;
    const ap = {
      ssid: newApSSID,
      pass: newApPass,
      free: true,
    };
    this.addApToState(ap);
  }

  addActiveApToState() {
    const { activeAp } = this.state;

    let newAp = {
      ssid: activeAp,
    };

    const newApPassInput = this.refs.newApPass;
    if (newApPassInput) {
      newAp.pass = newApPassInput.value;
    }

    console.log({ newAp });

    this.addApToState(newAp);
  }

  addApToState(newAp) {
    const { availableAps } = this.state;
    let { savedAps } = this.state;

    if (!newAp || !newAp.ssid) {
      console.error('newAp is not defined');
      return;
    }

    newAp = availableAps.filter(
      ap =>
        ap.ssid === newAp.ssid
    )[0] || newAp;

    console.log('add ap first if');

    if (!newAp.free && !newAp.pass) {
      this.setState({
        pwError: 'This Accesspoint needs a password',
      });

      return;
    }

    console.log('add ap second if');
    if (savedAps.some(ap => newAp.ssid === ap.ssid)) {
      savedAps = savedAps.map(
        ap =>
          ap.ssid !== newAp.ssid
            ? ap
            : {
              ...ap,
              ...newAp,
            }
      );
    } else {
      savedAps.push(newAp);
    }

    console.log({ savedAps });
    this.setState({
      savedAps,
    });
  }

  sendPreferredAp({ e, ap = {}}) {
    const { host, protocol } = this.props;
    const { savedAps } = this.state;

    if (!ap || !ap.ssid) {
      this.setState({
        uploadingPreferredApError: 'Can not send empty preferred Ap to MagicShifter',
      });
      return;
    }

    const preferredAp = savedAps.filter(
      existingAp =>
        ap.ssid === existingAp.ssid
    )[0];
    console.log({ preferredAp });

    if (!preferredAp || !preferredAp.ssid) {
      return;
    }

    this.setState({
      uploadingPreferredAp: true,
      uploadingPreferredApError: false,
      preferredAp,
    });

    const { ssid, pass } = preferredAp;
    let url = `${protocol}://${host}/settings/wifi/preferred/set?ssid=${ssid}&pwd=${pass}`;

    fetch({ url })
      .then(
        res =>
        this._isMounted &&
        this.setState({
          uploadingPreferredAp: false,
          uploadingPreferredApError: res.status !== 200 && 'Network Error',
        })
      )
      .catch(
        e =>
        this._isMounted &&
        this.setState({
          uploadingPreferredAp: false,
          uploadingPreferredApError: e.message || 'Unknown Error',
        })
      );
  }

  uploadNewAp({ e, ap = {}}) {
    const { host, protocol } = this.props;

    if (!ap || !ap.ssid) {
      return;
    }

    this.setState({
      uploadingNewAp: true,
    });

    const url = `${protocol}://${host}/settings/wifi/add?ssid=${ap.ssid}&pwd=${ap.pass}`;

    fetch({ url })
      .then(
        res =>
        this._isMounted &&
        this.setState({
          uploadingNewAp: false,
          uploadingNewApError: res.status !== 200 && 'Network Error',
        })
      )
      .catch(
        e =>
        this._isMounted &&
        this.setState({
          uploadingNewAp: false,
          uploadingNewApError: e.message || 'Unknown Error',
        })
      );
  }

  setNewApSSID(e) {
    this.setState({
      newApSSID: e.target.value,
    });
  }

  setNewApPass(e) {
    this.setState({
      newApPass: e.target.value,
    });
  }

  render() {
    const {
      availableAps, loadingAvailableAps, loadingAvailableApsError,
      savedAps, loadingSavedAps, loadingSavedApsError,
      uploadingNewAp, uploadingNewApError,
      uploadingPreferredAp, uploadingPreferredApError,
      removingSavedAp, removingSavedApError,
      addApModeActive, newApSSID, newApPass,
      activeAp, pwError, preferredAp,
      } = this.state;

    return (
      <div
        className={classes['container']}
      >

        <div
          className={classes['scan']}
        >
          <h5>
            Available Accesspoints:
          </h5>

          <button
            type='button'
            onClick={this.handleScanApClick}
          >

            <i
              className={[
                getIconCssClass(loadingAvailableAps ? ['loading', 'spin'] : 'download'),
                loadingAvailableAps ? classes['loading'] : '',
              ].join(' ').trim()}
            />

            {loadingAvailableAps
              ? 'Scanning for Accesspoints'
              : 'Scan for Accesspoints'
            }
          </button>
          {
            loadingAvailableApsError &&
            <p className={errorClasses['error']}>{loadingAvailableApsError}</p>
          }
        </div>

        <ul>
          {
            availableAps &&
            availableAps.length > 0
              ? availableAps.map(
              ap =>
              ap && ap.ssid &&
              <li
                key={'ap-' + ap.ssid}
              >
                <ul>
                  <li>
                    <input
                      onClick={this.handleHostActiveClick}
                      type='radio'
                      name='selectedAp'
                      value={ap.ssid}
                      checked={ap.ssid === activeAp}
                    />
                  </li>

                  <li>{ap.ssid}</li>

                  {
                    activeAp === ap.ssid &&
                    !ap.free &&
                    <li>
                      <label>Password:</label>
                      <input
                        type='text'
                        name='newApPass'
                        ref='newApPass'
                        defaultValue={ap.pass}
                      />
                      {
                        pwError &&
                        <p className={errorClasses['error']}>this Accesspoint needs a password.</p>
                      }
                    </li>
                  }
                </ul>
              </li>
            )
              : <li>No Accesspoints found</li>
          }
          {
            availableAps && availableAps.length > 0 &&
            <li>
              <input
                type='button'
                value='save'
                disabled={loadingAvailableAps}
                onClick={this.addActiveApToState}
              />
            </li>
          }
        </ul>

        <div
          className={classes['scan']}
        >

          <h5>Saved Accesspoints</h5>

          <button
            type='button'
            onClick={this.handleLoadSavedApsClick}
          >

            <i
              className={[
                getIconCssClass(loadingSavedAps ? ['loading', 'spin'] : 'download'),
                loadingSavedAps ? classes['loading'] : '',
              ].join(' ').trim()}
            />

            {loadingSavedAps
              ? 'Loading '
              : 'Load '
            }
            saved Accesspoints
          </button>
          {loadingSavedApsError && <p className={errorClasses['error']}>{loadingSavedApsError}</p>}
        </div>

        <ul>
          {
            savedAps &&
            savedAps.length > 0
              ? savedAps.map(
              ap =>
                <li
                  key={'savedAp-' + ap.ssid}
                >
                  <ul>
                    <li>
                      {ap.ssid}
                    </li>

                    <li>
                      <button
                        onClick={e => this.removeSavedAp({ e, ap })}
                        disabled={removingSavedAp}
                      >
                        <i
                          className={
                            getIconCssClass(
                              removingSavedAp
                                ? ['loading', 'spin']
                                : removingSavedApError
                                  ? 'close'
                                  : 'trash'
                            )
                          }
                        />
                        Delete
                      </button>
                    </li>

                    <li>
                      <button
                        disabled={uploadingPreferredAp || preferredAp.ssid === ap.ssid}
                        onClick={e => this.sendPreferredAp({ e, ap })}
                      >
                        <i
                          className={
                            getIconCssClass(
                              uploadingPreferredAp
                                ? ['loading', 'spin']
                                : preferredAp.ssid === ap.ssid
                                  ? 'ok'
                                  : uploadingPreferredApError
                                    ? 'close'
                                    : 'upload'
                            )
                          }
                        />
                        prefer
                      </button>
                    </li>

                    <li>
                      <button
                        onClick={e => this.uploadNewAp({ e, ap })}
                        disabled={uploadingNewAp}
                      >
                        <i
                          className={
                            getIconCssClass(
                              uploadingNewAp
                                ? ['loading', 'spin']
                                : uploadingNewApError
                                  ? 'close'
                                  : 'upload'
                            )
                          }
                        />
                        Upload
                      </button>
                      <p className={errorClasses['error']}>{uploadingNewApError}</p>
                    </li>
                  </ul>
                </li>
            )
              : <li>No Accesspoints found</li>
          }
        </ul>

        <button
          onClick={this.toggleAddApMode}
        >
          <i
            className={getIconCssClass('plus')}
          />
          Add Accesspoint
        </button>

        {
          addApModeActive &&
          <ul>
            <li>
              <label>name / ssid:</label>
              <input
                type='text'
                value={newApSSID}
                onChange={this.setNewApSSID}
              />
            </li>

            <li>
              <label>password:</label>
              <input
                type='text'
                value={newApPass}
                onChange={this.setNewApPass}
              />
            </li>

            <li>
              <button
                onClick={this.addCustomApToState}
              >
                save
              </button>
            </li>
          </ul>
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, actions)(ApSettings);
