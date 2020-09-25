import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import CreateAccount from './pages/CreateAccount/CreateAccount';

const Routes = () => (
    <Router >
        <Switch>
            <Route exact path="/">
                <CreateAccount />
            </Route>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/test">
                <Home />
            </Route>
        </Switch>
    </Router >
);

export default Routes;