
export const PowerSettings =
  ({savePowerSettings, onInputChange, powerdownTimeUSB, powerdownTimeBattery, defaultBrightness }) =>
    <form
      action="settings/ui/set"
      onSubmit={savePowerSettings}
    >
      <fieldset>
        <legend>Set Powerdown and Brightness</legend>
        <ul>
          <li>
            <label
              htmlFor='powerdownTimeUSB'
              children='Power down time in usb mode'
            />
            <input
              type='text'
              name='powerdownTimeUSB'
              value={powerdownTimeUSB}
              onChange={onInputChange}
            />
          </li>
          <li>
            <label
              htmlFor='powerdownTimeBattery'
              children='Power down time in battery mode'
            />
            <input
              type='text'
              name='powerdownTimeBattery'
              value={powerdownTimeBattery}
              onChange={onInputChange}
            />
          </li>
          <li>
            <label
              htmlFor='defaultBrightness'
              children='Default Brightness'
            />
            <input
              type='text'
              name='defaultBrightness'
              value={defaultBrightness}
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

export default PowerSettings;
