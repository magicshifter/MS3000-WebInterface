import React, { PropTypes } from 'react';

export const AddApInput =
  ({ name, pass, onInputChange, onFormSubmit }) =>
    <form
      onSubmit={onFormSubmit}
    >
      <fieldset>
        <legend>Add Accesspoint</legend>
        <ul>
          <li>
            <input
              type='text'
              name='newApName'
              value={name}
              onChange={onInputChange}
            />
          </li>

          <li>
            <input
              type='text'
              name='newApPass'
              value={pass}
              onChange={onInputChange}
            />
          </li>
          <li>
            <input
              type='submit'
              value='save'
            />
          </li>
        </ul>
      </fieldset>
    </form>;

AddApInput.propTypes = {
  name: PropTypes.string,
  pass: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};

export default AddApInput;
