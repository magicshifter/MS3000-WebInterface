import React, { Component, PropTypes } from 'react';

import { reduxForm } from 'redux-form';

import { getIconCssClass } from 'utils/icons';

import { actions } from 'redux/modules/views/settings';

export const fields = [
  'newApSSID',
  'newApPass',
];

const validate =
  ({ newApSSID }) => {
    const errors = {};
    const isRequiredError = 'Required';

    if (!newApSSID) {
      errors.newApSSID = isRequiredError;
    }

    return errors;
  };

const mapStateToProps =
  ({ settingsView }) => {
    const {
      newApSSID, newApPass,
    } = settingsView.toJS();

    return {
      newApSSID,
      newApPass,
    };
  };

export class AddApForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    newApSSID: PropTypes.string,
    newApPass: PropTypes.string,
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    addAp: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      error: false,
    };

    this.toggleAddApMode = this.toggleAddApMode.bind(this);
    this.submitNewAp = this.submitNewAp.bind(this);

    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  toggleAddApMode() {
    this.setState({
      active: !this.state.active,
    });
  }

  submitNewAp(values, dispatch) {
    const { addAp } = this.props;

    console.log('submitNewAp', { values });

    dispatch(addAp(values));
  }

  render() {
    const {
      fields: {
        newApSSID, newApPass,
      },
      handleSubmit,
      // submitting,
    } = this.props;

    const {
      active,
    } = this.state;

    return (
      <form
        onSubmit={handleSubmit(this.submitNewAp)}
      >
        <fieldset>
          <legend>
            <button
              onClick={this.toggleAddApMode}
            >
              <i
                className={getIconCssClass('plus')}
              />
              Add Accesspoint
            </button>
          </legend>

          {
            active &&
            <ul>
              <li>
                <label>name / ssid:</label>
                <input
                  type='text'
                  {...newApSSID}
                />
              </li>

              <li>
                <label>password:</label>
                <input
                  type='text'
                  {...newApPass}
                />
              </li>
              <li>
                <input
                  type='submit'
                  value='save'
                />
              </li>
            </ul>
          }
        </fieldset>
      </form>
    );
  }
}

export default reduxForm(
  {
    form: 'AddAp',
    fields,
    validate,
  },
  mapStateToProps,
  actions,
)(AddApForm);
