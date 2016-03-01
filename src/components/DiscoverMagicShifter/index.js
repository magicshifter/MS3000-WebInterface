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
    this.reconnect = this.reconnect.bind(this);

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

  foundHost({ host, protocol }) {
    const { setSettings, setConnectState } = this.props;

    setSettings({
      host,
      protocol,
    });

    setConnectState({
      connectError: false,
      connecting: false,
      connected: true,
    });
  }

  reconnect(host) {
    const { setConnectState, connected } = this.props;

    setTimeout(
      () => {
        if (!connected) {
          setConnectState({
            connectError: true,
          });
          this.connectToHost(host);
        }
      }, 1000);
  }

  connectToHost(host) {
    const { connected } = this.props;

    if (connected) {
      return;
    }

    const [protocol, hostName] = host.path.split('://');

    fetch({ url: host.path })
      .then(
        res =>
          res.status === 200
            ? this.foundHost({ host: hostName, protocol })
            : this.reconnect(host)
      )
      .catch(
        e =>
          this.reconnect(host)
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
          color: (connected && 'green') || (connectError && 'red'),
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
