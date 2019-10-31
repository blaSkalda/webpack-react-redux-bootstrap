import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './home';
import Layout from './layout/layout';

const routes = (
  <Layout>
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </Layout>
);

export default routes;
