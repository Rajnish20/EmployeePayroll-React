import './App.css';
import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import PayrollForm from './component/payroll-form/payroll-form';
import HomePage from './component/home/home-page';
class App extends React.Component{
  render(){
    return(
      <div>
        <BrowserRouter>
         <Switch>
         <Route exact path = "/home"><HomePage /></Route>
           <Route exact path="/payroll-form">
             <PayrollForm/>
           </Route>
           <Route exact path="/payroll-form/:id"><PayrollForm /></Route>
           <Route exact path=""><Redirect exact from="/" to="/home" /></Route>
         </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
