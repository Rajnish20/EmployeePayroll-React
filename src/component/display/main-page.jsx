import React from 'react';
import './main-page.scss';
import deleteIcon from '../../assets/delete-black-18dp.svg';
import updateIcon from '../../assets/create-black-18dp.svg';
import Profile1 from '../../assets/Ellipse -1.png';
import Profile2 from '../../assets/Ellipse -3.png';
import Profile3 from '../../assets/Ellipse -7.png';
import Profile4 from '../../assets/Ellipse -8.png';
import {withRouter} from 'react-router-dom';
import EmployeeService from '../../service/employeeservice';

const Display = (props) => {
    const update = (employeeId) => {
        props.history.push(`/payroll-form/${employeeId}`);
    }
    return(
        <table id ="display" className="table">
            <tbody>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Department</th>
                    <th>Salary</th>
                    <th>Startdate</th>
                    <th>Actions</th>
                </tr>
                    {
                    props.employeeArray.map((employee) => (
                    <tr key = {employee.id}>
                        <td><img src={profilePicture(employee.profilePic)} className="profile" onClick={() => update(employee.id)} alt="" /></td>
                        <td>{employee.name}</td>
                        <td>{employee.gender}</td>
                        <td>{employee.department.map(dept => (<div className="dept-label">{dept}</div>))}</td>
                        <td> ₹ {employee.salary}</td>
                        <td>{stringifyDate(employee.startDate)}</td>
                        <td><img src={deleteIcon} className="icon" onClick={() => deleteEmployee(employee.id)} alt="delete" />
                        <img src={updateIcon} className="icon" onClick={() => update(employee.id)} alt="edit" /></td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    )
}

const stringifyDate = (date) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const newDate = !date ? "undefined" : new Date(Date.parse(date)).toLocaleDateString('en-GB', options);
    return newDate;
  }
const deleteEmployee = (employeeId) => {
    new EmployeeService().deleteEmployee(employeeId)
    .then(responseText => {
        window.location.reload();
        window.alert("Employee Removed Successfully");
    }).catch(error => {
        console.log("Error while Removing the Employee");
    })
}


const profiles = ["../../assets/Ellipse -1.png","../../assets/Ellipse -3.png","../../assets/Ellipse -7.png",
            "../../assets/Ellipse -8.png"];

const profilePicture = (profilePath) => {
    let index ;
    for(let i = 0; i < profiles.length; i++){
        if(profiles[i] === profilePath){
            index = i;
        }
    }
    switch(index){
        case 0:
            return Profile1;
        case 1:
            return Profile2;
        case 2:
            return Profile3;
        case 3:
            return Profile4;
        default:
            return null; 
    }
}
export default withRouter(Display);