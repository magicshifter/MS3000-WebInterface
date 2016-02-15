import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import { actions } from 'redux/modules/views/settings';
import { settingsViewType } from 'utils/propTypes';

import ApSettings from './ap';
import UiSettings from './ui';

import { onInputChange } from 'utils/inputs';

import classes from './SettingsView.scss';

const mapStateToProps =
  state => ({
    settings: state.settingsView.toJS(),
  });

export class SettingsView extends Component {
  static propTypes = {
    settings: settingsViewType,
    loadApSettings: PropTypes.func.isRequired,
    setSettings: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    const { settings } = props;

    this.inputChange = this.inputChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);

    this.state = settings || {};
  }

  inputChange(e) {
    onInputChange(e, this);
  }

  formSubmit(e) {
    const { setSettings } = this.props;
    setSettings(this.state);

    e.preventDefault();
    return false;
  }

  render() {
    const { protocol, host, syslogIp } = this.state;

    return (
      <div className={[classes['container'], 'container'].join(' ')}>
        <h2>Settings:</h2>

        <UiSettings
          onInputChange={e => this.inputChange(e, this)}
          protocol={protocol}
          host={host}
          syslogIp={syslogIp}
          onFormSubmit={this.formSubmit}
        />

        <ApSettings
          onInputChange={this.inputChange}
          onFormSubmit={this.formSubmit}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, actions)(SettingsView);
