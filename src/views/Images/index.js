import React, { Component } from 'react';
import { connect } from 'react-redux';

import { actions } from 'redux/modules/views/image';

import ImageInput from 'components/inputs/ImageInput';

import CloseViewButton from 'components/inputs/CloseViewButton';

import classes from './Images.scss';

const mapStateToProps =
  () => ({});

export class Images extends Component {
  static propTypes = {};

  render() {
    return (
      <div
        className={classes['container']}
      >
        <h5>images</h5>
        <CloseViewButton />
        <ImageInput />
      </div>
    );
  }
}

export default connect(mapStateToProps, actions)(Images);
