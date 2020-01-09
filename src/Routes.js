import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './containers/Home';
import Listing from './containers/Listing';

export default () =>
  <Switch>
    <Route exact path="/" render={() => (
      <Redirect to="/home"/>
    )}/>
    <Route path="/home" exact component={Home} />
    <Route path="/listing" exact component={Listing} />
  </Switch>;
