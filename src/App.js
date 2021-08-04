import './App.css';
import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import PayrollForm from './component/payroll-form/payroll-form';
class App extends React.Component{
  render(){
    return(
      <div>
        <BrowserRouter>
         <Switch>
           <Route exact path="/payroll-form">
             <PayrollForm/>
           </Route>
         </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
