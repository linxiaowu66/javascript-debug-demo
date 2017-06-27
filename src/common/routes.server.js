import React from 'react';
import { Route, IndexRedirect } from 'react-router';

const routes = (
  <Route path="/">
    <IndexRedirect to="/index" />
    <Route path="index" />
  </Route>
);

export default routes;
