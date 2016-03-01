import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getIconCssClass } from 'utils/icons';

import { fetch, parseJSONResult } from 'utils/http';

import classes from './ApListForm.scss';

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

export class ApListForm extends Component {
  static propTypes = {
    accesspoints: PropTypes.array.isRequired,
    addAp: PropTypes.func.isRequired,
    host: PropTypes.string.isRequired,
    protocol: PropTypes.string.isRequired,
    // preferredApSSID: PropTypes.string,
    // preferredApPass: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      error: false,
    };

    this.toggleAddApMode = this.toggleAddApMode.bind(this);
    this.scanAccesspoints = this.scanAccesspoints.bind(this);
    this.handleScanApClick = this.handleScanApClick.bind(this);

    this.submitNewAp = this.submitNewAp.bind(this);
    this.submitAccesspoints = this.submitAccesspoints.bind(this);

    this.scanAccesspoints();
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleScanApClick() {
    this.setState({
      loading: true,
      error: false,
    });

    this.scanAccesspoints();
  }

  scanAccesspoints() {
    const { host, protocol } = this.props;

    fetch(`${protocol}://${host}/listwlans`)
      .then(
        (res) => {
          if (!this._isMounted) {
            return;
          }

          const parsed = parseJSONResult(res.response || res.responseText);

          this.setState({
            loading: false,
            accesspoints: parsed,
          });
        }
      ).catch(
        (e) =>
          console.log({ e }) ||
          this.setState({
            loading: false,
            error: e.message || 'Unknown Error',
          })
      );
  }

  toggleAddApMode() {
    this.setState({
      addApModeActive: !this.state.addApModeActive,
    });
  }

  submitNewAp(values, dispatch) {
    console.log('submitNewAp', { values });
  }

  submitAccesspoints(e, b) {
    console.log('submitAccesspoints', { e, b });
  }

  render() {
    const { accesspoints, loading, error } = this.state;

    return (
      <form
        className={classes['container']}
        onSubmit={this.submitAccesspoints}
      >
        <fieldset>
          <legend>
            List of saved Accesspoints:
          </legend>
          <div
            className={classes['scan']}
          >
            <button
              type='button'
              onClick={this.handleScanApClick}
            >

              <i
                className={[
                  getIconCssClass(loading ? ['loading', 'spin'] : 'download'),
                  loading ? classes['loading'] : '',
                ].join(' ').trim()}
              />

              {loading
                ? 'Scanning Accesspoints'
                : 'Scan Accesspoints'
              }
            </button>
            {error && <span>{error}</span>}
          </div>

          <ul>
            {
              accesspoints && accesspoints.length
              ? accesspoints.map(
                  ap =>
                    ap && ap.ssid &&
                    <li
                      key={ap.ssid}
                    >
                      <input
                        onClick={e => console.log({ e })}
                        type='radio'
                        name='selectedAp'
                      />

                      <span
                        {...ap.ssid}
                      ></span>

                      <i
                        className={getIconCssClass('trash')}
                      />

                      <input
                        type='text'
                        name='ap.ssid'
                        {...ap.pass}
                      />
                    </li>
                )
              : <li>No Accesspoints found</li>
            }
            {accesspoints && accesspoints.length &&
              <li>
                <input
                  type='submit'
                  value='save'
                  disabled={loading}
                />
              </li>
            }
          </ul>
        </fieldset>
      </form>
    );
  }
}

export default connect(mapStateToProps, actions)(ApListForm);
