import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import LoginPage from '../auth/LoginPage';
import PasswordForm from '../auth/form/PasswordForm';
import ResetForm from '../auth/ResetForm';
import {AuthorizedRoute, NotFoundRoute} from './Router';
import ClientTable from '../client/ClientTable';
import Employeer from '../employee/Employeer';
import StepperClient from '../client/StepperClient';
import {Auth} from '../auth/Auth';
import GoalChart from '../goal/GoalChart';
import ActiveProfit from '../patrimony/ActiveProfit';
import ActiveChart from '../patrimony/ActiveChart';
import Home from '../Home';

export default class Routers extends Component{

  render(){
    return (
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/login" component={ LoginPage } />
        <AuthorizedRoute exact permission="change_own_client_data" path="/patrimony/active/:id" component={ ActiveProfit } />
        <AuthorizedRoute exact permission="see_all_basic_client_data" path="/client" component={ ClientTable } />
        <AuthorizedRoute permission="see_employee_data" path="/employee" component={ Employeer } />
        <AuthorizedRoute permission="change_own_client_data" exact path="/register/steps/:id?" component={ StepperClient } />
        <AuthorizedRoute permission="see_own_client_data" path="/active_chart" component={ ActiveChart } />
        <AuthorizedRoute permission="see_own_client_data" path="/goals/:id?" component={ GoalChart } />
        <AuthorizedRoute permission="allow_any" path="/login/changepassword"
          render={ () => <PasswordForm userid={Auth.getUserId()} username={Auth.getUserName()} /> } />

        <Route path="/login/resetpassword" render={ () => <ResetForm email="marcelohpf@hotmail.com" /> } />
        <Route component={ NotFoundRoute } />
      </Switch>
    );
  }
}
