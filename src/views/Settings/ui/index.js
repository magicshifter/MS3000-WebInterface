import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';

import { actions } from 'redux/modules/views/settings';

import classes from './UiSettings.scss';

export const fields = [
  'host',
  'syslogIp',
];

const mapStateToProps =
  ({ settingsView }) => {
    const { host, syslogIp } = settingsView.toJS();

    return {
      initialValues: {
        host,
        syslogIp,
      },
    };
  };

const validate =
  ({ host }) => {
    const errors = {};

    if (!host) {
      errors.host = 'Required';
    }

    return errors;
  };

export class UiSettings extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    setSettings: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    resetForm: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
  }

  submit(values, dispatch) {
    const { setSettings } = this.props;
    console.log('submit form', { values });

    dispatch(setSettings(values));
    // fetch(``);
  };

  render() {
    const {
      fields: { host, syslogIp },
      resetForm,
      handleSubmit,
      submitting,
      // setSettings,
    } = this.props;

    return (
      <form
        className={classes['container']}
        onSubmit={handleSubmit(this.submit)}
      >
        <fieldset>
          <legend>Userinterface Settings:</legend>

          <ul>
            <li>
              <label>hostname:</label>
              <input
                type='text'
                {...host}
              />
            </li>

            <li>
              <label>syslog ip:</label>
              <input
                type='text'
                {...syslogIp}
              />
            </li>

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
    form: 'uiSettings',
    fields,
    validate,
  },
  mapStateToProps,
  actions
)(UiSettings);
