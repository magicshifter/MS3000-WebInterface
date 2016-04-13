import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getIconCssClass } from 'utils/icons';

import { fetch } from 'utils/http';

import classes from './ApSettings.scss';
import errorClasses from 'styles/errors.scss';

import { actions } from 'redux/modules/views/settings';

import { actions as apActions } from 'redux/modules/accesspoints';

const mapStateToProps =
  ({ settingsView, accesspoints }) => {
    const {
      protocol,
      host,
    } = settingsView.toJS();

    const { availableAps, savedAps, preferredAp } = accesspoints.toJS();

    return {
      protocol,
      host,
      availableAps,
      savedAps,
      preferredAp,
    };
  };

export class ApSettings extends Component {
  static propTypes = {
    addAp: PropTypes.func.isRequired,
    host: PropTypes.string.isRequired,
    protocol: PropTypes.string.isRequired,
    removeSavedAp: PropTypes.func.isRequired,
    fetchAvailableAps: PropTypes.func.isRequired,
    fetchAvailableApsError: PropTypes.string,
    availableAps: PropTypes.array.isRequired,
    fetchSavedAps: PropTypes.func.isRequired,
    fetchSavedApsError: PropTypes.string,
    preferredAp: PropTypes.object,
    fetchPreferredAp: PropTypes.func.isRequired,
    fetchPreferredApError: PropTypes.string,
    postNewAp: PropTypes.func.isRequired,
    postNewApError: PropTypes.string,
    savedAps: PropTypes.array.isRequired,
  };

  state = {
    newApSSID: '',
    newApPass: '',
    fetchingAvailableAps: false,
    fetchingSavedAps: false,
    fetchingPreferredAp: false,
    postingPreferredAp: false,
    postingNewAp: false,
  };

  constructor(props) {
    super(props);

    this._isMounted = true;
  }

  componentDidMount() {
    this.fetchAvailableAps();
    this.fetchSavedAps();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleHostActiveClick =
    e => {
      if (e.target && e.target.value) {
        this.setState({
          activeAp: e.target.value,
        });
      }
    };

  fetchPreferredAp =
    () => {
      const { protocol, host, fetchPreferredAp } = this.props;

      const url = `${protocol}://${host}/settings/wifi/preferred`;

      this.setState({
        loadingPreferredAp: true,
      });

      fetchPreferredAp(url)
        .then(
          () =>
            this._isMounted &&
            this.setState({
              loadingPreferredAp: false,
            })
        );
    };

  removeSavedAp =
    ({ e, ap = {}}) => {
      const { protocol, host, removeSavedAp } = this.props;

      const { ssid } = ap;

      if (ssid) {
        const url = `${protocol}://${host}/settings/wifi/delete?ssid=${ssid}`;

        this.setState({
          removingSavedAp: true,
        });

        removeSavedAp(url)
          .then(
            res =>
              this._isMounted &&
              this.setState({
                removingSavedAp: false,
              })
          );
      }
    };

  fetchAvailableAps =
    () => {
      const { host, protocol, fetchAvailableAps } = this.props;
      const url = `${protocol}://${host}/listwlans`;

      this.setState({
        fetchingAvailableAps: true,
      });

      fetchAvailableAps(url)
        .then(
          () =>
            this.setState({
              fetchingAvailableAps: false,
            })
        );
    };

  fetchSavedAps =
    () => {
      const { host, protocol, fetchSavedAps } = this.props;
      const url = `${protocol}://${host}/settings/wifi/list`;

      this.setState({
        fetchingSavedAps: true,
      });

      fetchSavedAps(url)
        .then(
          () =>
            this.setState({
              fetchingSavedAps: false,
            })
        );
    };

  toggleAddApMode =
    () => {
      this.setState({
        addApModeActive: !this.state.addApModeActive,
      });
    };

  addCustomApToState =
    () => {
      const { newApSSID, newApPass } = this.state;
      const ap = {
        ssid: newApSSID,
        pass: newApPass,
        free: !!newApPass,
      };

      this.setApActive(ap);
    };

  addActiveApToState =
    () => {
      const { activeAp } = this.state;

      const { value = '' } = this.refs.newApPass;

      let newAp = {
        ssid: activeAp,
        pass: value,
      };

      this.setApActive(newAp);
    };

  setApActive =
    newAp => {
      const { availableAps } = this.props;
      let { savedAps } = this.props;

      if (!newAp || !newAp.ssid) {
        console.error('newAp is not defined');
        return;
      }

      const filteredAp = availableAps.filter(
        ap =>
          ap.ssid === newAp.ssid
      )[0];

      newAp = {
        ...filteredAp,
        ...newAp,
      };

      if (!newAp.free && !newAp.pass) {
        this.setState({
          pwError: 'This Accesspoint needs a password',
        });

        return;
      }

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

      this.setState({
        savedAps,
      });
    };

  sendPreferredAp =
    ({ e, ap = {}}) => {
      const { host, protocol, savedAps } = this.props;

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
      const url = `${protocol}://${host}/settings/wifi/preferred/set?ssid=${ssid}&pwd=${pass}`;

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
    };

  uploadNewAp =
    ({ e, ap = {}}) => {
      const { host, protocol, postNewAp } = this.props;

      const { ssid, pass = '' } = ap;

      if (!ssid) {
        return;
      }

      this.setState({
        uploadingNewAp: true,
      });

      const url = `${protocol}://${host}/settings/wifi/add?ssid=${ssid}&pwd=${pass}`;

      postNewAp(url)
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
    };

  setNewApSSID =
    e => {
      this.setState({
        newApSSID: e.target.value,
      });
    };

  setNewApPass =
    e => {
      this.setState({
        newApPass: e.target.value,
      });
    };

  render() {
    const {
      availableAps,
      savedAps,
      fetchAvailableApsError,
      preferredAp,
      fetchSavedApsError,
    } = this.props;

    const {
      fetchingAvailableAps,
      fetchingSavedAps,
      uploadingNewAp, uploadingNewApError,
      uploadingPreferredAp, uploadingPreferredApError,
      removingSavedAp, removingSavedApError,
      addApModeActive, newApSSID, newApPass,
      activeAp, pwError,
    } = this.state;

    return (
      <div className={classes['container']}>
        <div className={classes['scan']}>
          <h5>
            Available Accesspoints:
          </h5>

          <button
            disabled={fetchingAvailableAps}
            onClick={this.fetchAvailableAps}
          >
            <i
              className={[
                getIconCssClass(fetchingAvailableAps ? ['loading', 'spin'] : 'download'),
                fetchingAvailableAps ? classes['loading'] : '',
              ].join(' ').trim()}
            />

            {fetchingAvailableAps
              ? 'Scanning for Accesspoints'
              : 'Scan for Accesspoints'
            }
          </button>

          {
            fetchAvailableApsError &&
            <p className={errorClasses['error']}>{fetchAvailableApsError}</p>
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
                disabled={fetchingAvailableAps}
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
            onClick={this.fetchSavedAps}
          >

            <i
              className={[
                getIconCssClass(fetchingSavedAps ? ['loading', 'spin'] : 'download'),
                fetchingSavedAps ? classes['loading'] : '',
              ].join(' ').trim()}
            />

            {fetchingSavedAps
              ? 'Loading '
              : 'Load '
            }
            saved Accesspoints
          </button>
          {fetchSavedApsError && <fetchSavedApsp className={errorClasses['error']}>{fetchSavedApsError}</fetchSavedApsp>}
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
                        disabled={uploadingPreferredAp}
                        onClick={e => this.sendPreferredAp({ e, ap })}
                      >
                        <i
                          className={
                            getIconCssClass(
                              uploadingPreferredAp
                                ? ['loading', 'spin']
                                : preferredAp && preferredAp.ssid === ap.ssid
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

export default connect(mapStateToProps, { ...actions, ...apActions })(ApSettings);
