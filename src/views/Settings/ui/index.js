import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';

import { onFormSubmit } from 'utils/inputs';

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
      host,
      syslogIp,
    };
  };

const validate =
  values => {
    const errors = {};

    if (!values.host) {
      errors.host = 'Required';
    }

    return errors;
  };

export class UiSettings extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    host: PropTypes.string.isRequired,
    syslogIp: PropTypes.string,
    setSettings: PropTypes.func.isRequired,
    // submitting: PropTypes.bool.isRequired,
    // resetForm: PropTypes.func.isRequired,
    // handleSubmit: PropTypes.func.isRequired,
  };

  constructor(props) {
    const { host, syslogIp } = props;

    props.fields.host.defaultValue = host;
    props.fields.syslogIp.defaultValue = syslogIp;

    super(props);
  }

  render() {
    const {
      fields: { host, syslogIp },
      // resetForm,
      // handleSubmit,
      // submitting,
      setSettings,
    } = this.props;

    return (
      <form
        className={classes['container']}
        onSubmit={e => onFormSubmit(e, setSettings, fields)}
      >
        <fieldset>
          <legend>Userinterface Settings:</legend>

          <ul>
            <li key='host'>
              <label>hostname:</label>
              <input
                type='text'
                {...host}
              />
            </li>

            <li key='syslogIp'>
              <label>syslog ip:</label>
              <input
                type='text'
                {...syslogIp}
              />
            </li>

            <li
              key='submit'
            >
              <input
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
    form: 'uiSettings',
    fields,
    validate,
  },
  mapStateToProps,
  actions
)(UiSettings);
