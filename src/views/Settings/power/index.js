import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { actions } from 'redux/modules/views/settings';

export const fields = [
  'powerdownTimeUSB',
  'powerdownTimeBattery',
  'defaultBrightness',
];

const validate =
  ({ powerdownTimeBattery, powerdownTimeUSB, defaultBrightness }) => {
    const errors = {};
    const isRequiredError = 'Required';

    if (!powerdownTimeUSB && powerdownTimeUSB !== 0) {
      errors.powerdownTimeUSB = isRequiredError;
    }
    if (!powerdownTimeBattery && powerdownTimeBattery !== 0) {
      errors.powerdownTimeBattery = isRequiredError;
    }
    if (!defaultBrightness && defaultBrightness !== 0) {
      errors.defaultBrightness = isRequiredError;
    }

    return errors;
  };

const mapStateToProps =
  ({ settingsView }) => {
    const {
      powerdownTimeBattery,
      powerdownTimeUSB,
      defaultBrightness,
      host,
      protocol,
    } = settingsView.toJS();

    const initialValues = {
      powerdownTimeBattery,
      powerdownTimeUSB,
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

  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
  }

  submit(values, dispatch) {
    const { setSettings } = this.props;

    dispatch(setSettings(values));

    // XXX TODO transmit settings to MagicShifter
    // fetch(``);
  };

  render() {
    const {
      fields: { powerdownTimeUSB, powerdownTimeBattery, defaultBrightness },
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
                {...powerdownTimeUSB}
              />
              {
                powerdownTimeUSB.touched &&
                powerdownTimeUSB.error &&
                <p>{powerdownTimeUSB.error}</p>
              }
            </li>
            <li>
              <label>Battery Powerdown Time</label>
              <input
                type='number'
                min={0}
                max={30}
                {...powerdownTimeBattery}
              />
              {
                powerdownTimeBattery.touched &&
                powerdownTimeBattery.error &&
                <p>{powerdownTimeBattery.error}</p>
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
