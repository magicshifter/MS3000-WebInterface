import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { actions } from 'redux/modules/views/settings';

export const fields = [
  'timeoutHighPower',
  'timeoutLowPower',
  'defaultBrightness',
];

const validate =
  ({ timeoutLowPower, timeoutHighPower, defaultBrightness }) => {
    const errors = {};
    const isRequiredError = 'Required';

    if (!timeoutHighPower && timeoutHighPower !== 0) {
      errors.timeoutHighPower = isRequiredError;
    }
    if (!timeoutLowPower && timeoutLowPower !== 0) {
      errors.timeoutLowPower = isRequiredError;
    }
    if (!defaultBrightness && defaultBrightness !== 0) {
      errors.defaultBrightness = isRequiredError;
    }

    return errors;
  };

const mapStateToProps =
  ({ settingsView }) => {
    const {
      timeoutLowPower,
      timeoutHighPower,
      defaultBrightness,
      host,
      protocol,
    } = settingsView.toJS();

    const initialValues = {
      timeoutLowPower,
      timeoutHighPower,
      defaultBrightness,
    };

    return {
      initialValues,
      host,
      protocol,
    };
  };

class PowerSettings extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.string,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    host: PropTypes.string.isRequired,
    protocol: PropTypes.string.isRequired,
    setSettings: PropTypes.func.isRequired,
  };

  submit =
    (values, dispatch) => {
      const { setSettings } = this.props;

      dispatch(setSettings(values));

      // XXX TODO transmit settings to MagicShifter
      // fetch(``);
    };

  render() {
    const {
      fields: { timeoutHighPower, timeoutLowPower, defaultBrightness },
      error, resetForm, handleSubmit, submitting,
    } = this.props;

    return (
      <form onSubmit={handleSubmit(this.submit)}>
        <fieldset>
          <legend>
            Use this menu to configure the various
            powersaving related settings
          </legend>

          <ul>
            <li>
              <label>USB PowerDown Time</label>
              <input
                type='number'
                min={0}
                max={30}
                {...timeoutHighPower}
              />
              {
                timeoutHighPower.touched &&
                timeoutHighPower.error &&
                <p>{timeoutHighPower.error}</p>
              }
            </li>
            <li>
              <label>Battery Powerdown Time</label>
              <input
                type='number'
                min={0}
                max={30}
                {...timeoutLowPower}
              />
              {
                timeoutLowPower.touched &&
                timeoutLowPower.error &&
                <p>{timeoutLowPower.error}</p>
              }
            </li>
            <li>
              <label>Default Brightness</label>
              <input
                type='number'
                min={1}
                max={31}
                {...defaultBrightness}
              />
              {
                defaultBrightness.touched &&
                defaultBrightness.error &&
                <p>{defaultBrightness.error}</p>
              }
            </li>

            {error && <li>{error}</li>}

            <li>
              <input
                type='submit'
                disabled={submitting}
                value='save'
              />

              <input
                type='button'
                disabled={submitting}
                onClick={resetForm}
                value='reset'
              />
            </li>
          </ul>
        </fieldset>
      </form>
    );
  }
}

export default reduxForm(
  {
    form: 'PowerSettings',
    fields,
    validate,
  },
  mapStateToProps,
  actions
)(PowerSettings);
