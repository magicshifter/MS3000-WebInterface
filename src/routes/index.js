import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import CoreLayout from 'layouts/CoreLayout';

import InfoView from 'views/Info';

import ImagesView from 'views/Images';
import EffectsView from 'views/Effects';
import FontsView from 'views/Fonts';
import ColorsView from 'views/Colors';
import UploadView from 'views/Upload';
import ConnectView from 'views/Connect';

import SettingsView from 'views/Settings';

import UiSettingsView from 'views/Settings/ui';
import PowerSettingsView from 'views/Settings/power';
import ApSettingsView from 'views/Settings/ap';

import NotFoundView from 'views/NotFound';

export default (
  <Route path='/' component={CoreLayout}>
    <IndexRoute />
    <Route
      path='/paint'
    >
      <Route
        path='images'
        component={ImagesView}
      />

      <Route
        path='fonts'
        component={FontsView}
      />

      <Route
        path='effects'
        component={EffectsView}
      />

      <Route
        path='colors'
        component={ColorsView}
      />

      <Route
        path='upload'
        component={UploadView}
      />
    </Route>

    <Route
      path='connect'
      component={ConnectView}
    />

    <Route
      path='info'
      component={InfoView}
    />

    <Route
      path='settings'
      component={SettingsView}
    >
      <IndexRoute
        component={UiSettingsView}
      />
      <Route
        path='power'
        component={PowerSettingsView}
      />
      <Route
        path='ap'
        component={ApSettingsView}
      />
    </Route>
    <Route path='/404' component={NotFoundView} />
    <Redirect from='*' to='/404' />
  </Route>
);
