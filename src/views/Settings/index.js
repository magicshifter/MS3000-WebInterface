import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import CloseViewButton from 'components/inputs/CloseViewButton';

import classes from './SettingsView.scss';

export const SettingsView =
  ({ children }) =>
    <div className={[classes['container'], 'container'].join(' ')}>
      <h5>Settings:</h5>
      <CloseViewButton />

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
    </div>;

SettingsView.propTypes = {
  children: PropTypes.element.isRequired,
};

export default SettingsView;
