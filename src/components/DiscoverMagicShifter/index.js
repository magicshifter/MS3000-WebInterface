import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getIconCssClass } from 'utils/icons';

import { actions } from 'redux/modules/connect';
import { actions as settingsActions } from 'redux/modules/views/settings';

import MenuLink from 'layouts/MenuLink';

import { fetch } from 'utils/http';

const mapStateToProps =
  ({ connect }) => {
    const { hosts, connected, connecting, connectError } = connect.toJS();

    return {
      connected,
      connecting,
      hosts,
      connectError,
    };
  };

export class DiscoverMagicShifter extends Component {
  static propTypes = {
    hosts: PropTypes.array.isRequired,
    text: PropTypes.string,
    title: PropTypes.string,
    icon: PropTypes.string,
    to: PropTypes.string.isRequired,
    connecting: PropTypes.bool.isRequired,
    connectError: PropTypes.bool.isRequired,
    connected: PropTypes.bool.isRequired,
    setSettings: PropTypes.func.isRequired,
    setConnectState: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.connectToMagicShifter = this.connectToMagicShifter.bind(this);
    this.connectToHost = this.connectToHost.bind(this);

    this._isMounted = true;
    this.connectToMagicShifter();
  }

  componentWillUnmount() {
    console.log('will unmount');
    this._isMounted = false;
  }

  connectToMagicShifter() {
    const { hosts } = this.props;

    hosts.forEach(this.connectToHost);
  }

  connectToHost(host) {
    const { setSettings, connected, setConnectState } = this.props;

    if (connected) {
      return;
    }

    const [protocol, hostName] = host.path.split('://');

    fetch(host.path)
      .then(
        res => {
          if (res.status === 200) {
            setSettings({
              host: hostName,
              protocol,
            });

            setConnectState({
              connectError: false,
              connecting: false,
              connected: true,
            });
          } else {
            setConnectState({
              connectError: true,
            });

            this.connectToHost(host);
          }
        }
      )
      .catch(
        e => {
          setConnectState({
            connectError: true,
          });

          this.connectToHost(host);
        }
      );
  }

  render() {
    const { text, icon, to, title, connecting, connected, connectError } = this.props;

    return (
      <MenuLink
        text={text}
        title={title}
        to={to}
        style={{
          color: (connectError && 'red') || (connected && 'green'),
        }}
        iconClass={
          getIconCssClass(
            connecting
              ? [icon, 'spin']
              : icon
          )
        }
      />
    );
  }
}

export default connect(
  mapStateToProps,
  {
    ...actions,
    ...settingsActions,
  }
)(DiscoverMagicShifter);
