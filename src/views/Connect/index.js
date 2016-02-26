import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import CloseViewButton from 'components/inputs/CloseViewButton';

import { actions } from 'redux/modules/views/settings';

import { getIconCssClass } from 'utils/icons';
import classes from './Connect.scss';

const mapStateToProps =
  ({ connect, settingsView }) => {
    const { connected, connectError, connecting, hosts } = connect.toJS();
    const { host } = settingsView.toJS();

    return {
      connected,
      connecting,
      connectError,
      hosts,
      host,
    };
  };

export class Connect extends Component {
  static propTypes = {
    connected: PropTypes.bool.isRequired,
    connecting: PropTypes.bool.isRequired,
    connectError: PropTypes.bool.isRequired,
    hosts: PropTypes.array.isRequired,
    host: PropTypes.string.isRequired,
  };

  render() {
    const { connecting, connected, hosts, host, connectError } = this.props;

    return (
      <div
        className={classes['container']}
      >
        <h5>Connect to MagicShifter</h5>

        <CloseViewButton />

        {connecting && <span>Trying to connect to the following hosts:</span>}
        {connected && <span>Connected.</span>}

        {
          hosts &&
          <ul>
            {
              hosts.map(
                h =>
                  <li key={h.path}>
                    <i
                      style={{
                        color: (
                          host === h.path.split('://')[1] &&
                          connected &&
                          'green'
                        ),
                      }}
                      className={
                        getIconCssClass(
                          connecting
                            ? ['loading', 'spin']
                            : host === h.path.split('://')[1]
                              ? 'ok'
                              : 'close'
                        )
                      }
                    />

                    <span>{h.path}</span>
                  </li>
              )
            }
          </ul>
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, actions)(Connect);
