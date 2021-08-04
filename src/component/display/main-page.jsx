import React from 'react';
import './main-page.scss';
import deleteIcon from '../../assets/delete-black-18dp.svg';
import updateIcon from '../../assets/create-black-18dp.svg';
import Profile1 from '../../assets/Ellipse -1.png';
import Profile2 from '../../assets/Ellipse -3.png';
import Profile3 from '../../assets/Ellipse -7.png';
import Profile4 from '../../assets/Ellipse -8.png';
import {withRouter} from 'react-router-dom';

const Display = (props) => {
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
                    <tr>
                        <td><img src={profilePicture(employee.profilePic)} alt="" /></td>
                        <td>{employee.name}</td>
                        <td>{employee.gender}</td>
                        <td>{employee.department.map(dept => (<div className="dept-label">{dept}</div>))}</td>
                        <td> ₹ {employee.salary}</td>
                        <td>{employee.startDate}</td>
                        <td><img src={deleteIcon} onClick={() => remove(employee.id)} alt="delete" />
                        <img src={updateIcon} onClick={() => edit(employee.id)} alt="edit" /></td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    )
}
const remove = (id) => {
}

const edit = (id) => {
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