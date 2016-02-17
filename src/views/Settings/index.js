import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { actions } from 'redux/modules/views/settings';
import { settingsViewType } from 'utils/propTypes';

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
    children: PropTypes.element.isRequired,
  };

  render() {
    const {
      children, // active subView
    } = this.props;

    return (
      <div className={[classes['container'], 'container'].join(' ')}>
        <h2>Settings:</h2>

        <nav>
          <ul>
            <li>
              <Link
                to='/settings'
                children='userinterface'
              />
            </li>
            <li>
              <Link
                to='/settings/power'
                children='powersaving'
              />
            </li>
            <li>
              <Link
                to='/settings/ap'
                children='accesspoints'
              />
            </li>
          </ul>
        </nav>

        {children}
      </div>
    );
  }
}

export default connect(mapStateToProps, actions)(SettingsView);
