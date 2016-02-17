import React, { Component, PropTypes } from 'react';

import { reduxForm } from 'redux-form';

import { onFormSubmit, clampNumberInputValue } from 'utils/inputs';

import { actions } from 'redux/modules/views/settings';

export const fields = [
  'powerdownTimeBattery',
  'powerdownTimeUSB',
  'defaultBrightness',
];

const validate =
  values => {
    const errors = {};

    if (!values.powerdownTimeBattery) {
      errors.powerdownTimeBattery = 'Required';
    }

    if (!values.powerdownTimeUSB) {
      errors.powerdownTimeUSB = 'Required';
    }

    if (!values.defaultBrightness) {
      errors.defaultBrightness = 'Required';
    }

    return errors;
  };

export const mapStateToProps =
  ({ settingsView }) => {
    const { powerdownTimeUSB, powerdownTimeBattery, defaultBrightness } = settingsView.toJS();

    return {
      battery: powerdownTimeBattery,
      usb: powerdownTimeUSB,
      brightness: defaultBrightness,
    };
  };

export class PowerSettings extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    setSettings: PropTypes.func.isRequired,
    battery: PropTypes.number.isRequired,
    usb: PropTypes.number.isRequired,
    brightness: PropTypes.number.isRequired,
  };

  constructor(props) {
    const { usb, battery, brightness } = props;

    props.fields.powerdownTimeUSB.defaultValue = usb;
    props.fields.powerdownTimeBattery.defaultValue = battery;
    props.fields.defaultBrightness.defaultValue = brightness;

    super(props);
  }

  render() {
    const {
      fields: { powerdownTimeUSB, powerdownTimeBattery, defaultBrightness },
      // resetForm,
      // handleSubmit,
      submitting,
      setSettings,
    } = this.props;

    return (
      <form
        onSubmit={e => onFormSubmit(e, setSettings, fields)}
      >
        <fieldset>
          <legend>Set Powerdown and Brightness</legend>
          <ul>
            <li>
              <label>USB Sleep Timer</label>
              <input
                type='number'
                min={0}
                max={30}
                step={0.5}
                {...powerdownTimeUSB}
                onChange={e => clampNumberInputValue(e, 0, 30)}
              />
              <label>Power down time when attached via USB</label>
            </li>

            <li>
              <label>Battery Sleep Timer</label>
              <input
                type='number'
                min={0}
                max={30}
                step={0.5}
                {...powerdownTimeBattery}
                onChange={e => clampNumberInputValue(e, 0, 30)}
              />
              <label>Power down time in battery mode</label>
            </li>

            <li>
              <label>Default Brightness</label>
              <input
                type='number'
                min={0}
                max={1}
                step={0.1}
                {...defaultBrightness}
                onChange={e => clampNumberInputValue(e, 0, 1)}
              />
              <label>The default brightness when activating the MagicShifter3000.</label>
            </li>

            <li>
              <input
                disabled={submitting}
                type='submit'
                value='save'
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
    form: 'powerSettings',
    fields,
    validate,
  },
  mapStateToProps,
  actions
)(PowerSettings);
