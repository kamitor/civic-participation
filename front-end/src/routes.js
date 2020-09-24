import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';

const Routes = () => ( 
  <Router >
    <Switch>
      <Route exact path="/">
        <CreateAccount />
      </Route>
      <Route path="/login">
        <Login/>
      </Route>
    </Switch>
  </Router >
);

export default Routes;