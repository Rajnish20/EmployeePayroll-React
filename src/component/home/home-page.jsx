import React from 'react';
import logo from '../../assets/logo.png';
import addIcon from '../../assets/add-24px.svg';
import './home-page.scss';
import {Link, withRouter} from 'react-router-dom';
import EmployeeService from '../../service/employeeservice';
import Display from '../display/main-page.jsx'

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allEmployeeArray: [],
      employeeArray: [],
    };
    this.employeeService = new EmployeeService();    
  }

  componentDidMount() {
    this.getEmployeeList();
  }

  getEmployeeList = () => {
    this.employeeService.getAllEmployees()
    .then(responseDTO => {
      let responseData = responseDTO.data;
      console.log("Data received after GET Call :\n" + responseData.data);
      this.setState({allEmployeeArray: responseData.data});
      this.setState({employeeArray: responseData.data});
    }).catch(errror => {
      console.log("Error while fetching Employee List\nError : " + JSON.stringify(errror));
    })
  }

  render () {
    return (
      <div className="body">
        <header className="header-content">
            <div className="logo-content">
                <img src={logo} alt="Logo" />
                <div>
                    <span className="emp-text">EMPLOYEE</span><br />
                    <span className="emp-text emp-payroll">PAYROLL</span>
                </div>
            </div>
        </header>
        <div className="main-content">
            <div className="main-header">
                <div className="emp-detail-text">
                    Employee Details
                </div>
                <Link to="payroll-form" className="add-button">
                  <img src={addIcon} alt="Add Button" />Add User
                </Link>
            </div>
            <div className="table-main">
                <Display employeeArray = {this.state.employeeArray} />
            </div>
        </div>
      </div>
    );
  }
}

export default withRouter(HomePage);