import { Component } from 'react';

import { onInputChange, onFormSubmit } from 'utils/inputs';

export default class FormComponent extends Component {

  inputChange(e) {
    onInputChange(e.target, this);
  }

  formSubmit(e) {
    onFormSubmit(e, this);
  }
}
