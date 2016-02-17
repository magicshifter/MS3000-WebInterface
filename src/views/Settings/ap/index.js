import React, { Component, PropTypes } from 'react';

import { reduxForm } from 'redux-form';

import { onFormSubmit } from 'utils/inputs';
import { getIconCssClass } from 'utils/icons';

import classes from './ApSettings.scss';

import { actions } from 'redux/modules/views/settings';

export const fields = [
  'newApName',
  'newApPass',
  'preferredApSSID',
];

const mapStateToProps =
  ({ settingsView }) => {
    const {
      preferredApSSID, preferredApPass,
      newApName, newApPass,
      accesspoints,
    } = settingsView.toJS();

    return {
      preferredApSSID,
      preferredApPass,
      newApName,
      newApPass,
      accesspoints,
    };
  };

export class ApSettings extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    accesspoints: PropTypes.arrayOf(PropTypes.object).isRequired,
    newApName: PropTypes.string,
    newApPass: PropTypes.string,
    loadApSettings: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    addAp: PropTypes.func.isRequired,
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
    const { loadApSettings } = this.props;

    loadApSettings(this.state)
      .then(
        ({ payload }) => {
          if (!this._isMounted) return; // Protection

          console.log({ payload });
          this.setState({
            loading: false,
            error: payload.message,
          });
        }
      );
  }

  toggleAddApMode() {
    const { addApModeActive } = this.state;
    this.setState({
      addApModeActive: !addApModeActive,
    });
  }

  render() {
    const {
      fields: {
        newApName, newApPass,
        preferredApSSID,
      },
      accesspoints,
      addAp,
      // resetForm,
      submitting,
    } = this.props;

    const {
      loading, error, addApModeActive,
    } = this.state;

    return (
      <div
        className={classes['container']}
      >
        <form
          onSubmit={e => onFormSubmit(e, addAp, fields)}
        >
          <fieldset>
            <legend
              onClick={this.toggleAddApMode}
            >
              <i
                className={getIconCssClass('plus')}
              />
              Add Accesspoint
            </legend>

            {
              addApModeActive &&
              <ul>
                <li>
                  <label>name:</label>
                  <input
                    type='text'
                    {...newApName}
                  />
                </li>

                <li>
                  <label>password:</label>
                  <input
                    type='text'
                    {...newApPass}
                  />
                </li>
                <li>
                  <input
                    type='submit'
                    value='save'
                  />
                </li>
              </ul>
            }
          </fieldset>
        </form>

        <div className={classes['list_container']}>
          <input
            className={classes['list_container__input']}
            type='button'
            value='Scan Accesspoints'
            onClick={this.handleScanApClick}
          />
          {loading &&
            <i
              className={[
                getIconCssClass(['loading', 'spin']),
                classes['loading'],
              ].join(' ')}
            />
          }
          {error && <span>{error}</span>}

          <ul>
            {
              accesspoints.length
              ? accesspoints.map(
                  ap =>
                    <li>
                      <span>{ap.name}</span>
                      <i
                        className={getIconCssClass('trash')}
                      />
                      <input
                        type='radio'
                        name='preferredApSSID'
                        value={ap.name}
                        checked={preferredApSSID.value === ap.name}
                        {...preferredApSSID}
                      />
                    </li>
                )
              : <li>No Accesspoints found</li>
            }
            {accesspoints.length > 0 &&
              <li>
                <input
                  type='submit'
                  value='save'
                  disabled={submitting}
                />
              </li>
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default reduxForm(
  {
    form: 'apSettings',
    fields,
  },
  mapStateToProps,
  actions,
)(ApSettings);
