import React from 'react';

import classes from './ApSettings.scss';

import AddApForm from './AddApForm.js';
import ApListForm from './ApListForm.js';

export const ApSettings =
  () =>
    <div
      className={classes['container']}
    >
      <ApListForm />
      <AddApForm />
    </div>;

export default ApSettings;
