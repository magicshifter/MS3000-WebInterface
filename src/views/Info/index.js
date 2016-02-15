import React from 'react';

import classes from './InfoView.scss';

export default () =>
  <div className={[classes['container'], 'container'].join(' ')}>
    <h1>Welcome to the MagicShifter 3000 Web Interface!</h1>
    <p>
      The new MS3000 hardware allows so many new use cases
      for connected apps that it will take us some time to implement our
      vision of the perfect MS3000 user interface one feature at a time.
    </p>
    <p>
      If you find some bug or issue with the webinterface and want to tell us
      you can just use the public <a href='http://github.com/magicshifter/ms3000-webinterface'>github issue tracker</a>
    </p>
    <p>
      The firmware github repository is at: <a href='https://github.com/magicshifter/ms3000-firmware'>magicshifter/ms3000-firmware</a>
    </p>
    <p>
      You can also find the assets used when building the firmware at: <a href='https://github.com/magicshifter/ms3000-assets'>magicshifter/ms3000-assets</a>
    </p>

    <p>Greetings,</p>
    <p>The MagicShifter Team!</p>
  </div>;
