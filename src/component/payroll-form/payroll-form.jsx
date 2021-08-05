import React from 'react'
import './payroll-form.scss';
import {Link, withRouter, useParams} from 'react-router-dom';
import logo from '../../assets/logo.png'
import profile1 from '../../assets/Ellipse -3.png';
import profile2 from '../../assets/Ellipse -1.png';
import profile3 from '../../assets/Ellipse -8.png';
import profile4 from '../../assets/Ellipse -7.png';
import EmployeeService from '../../service/employeeservice';

const initialState = {
    name: '',
    profile: '',
    gender: '',
    department: [],    
    salary: 40000,
    day: '1',
    month: 'Jan',
    year: '2020',
    startDate: new Date("1 Jan 2020"),
    notes: '',
    id: '',      
    
}

class Payroll extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            name:'',
            profile:'',
            gender:'',
            allDepartment: [
                'HR', 'Sales', 'Finance', 'Engineer', 'Others'
            ],
            department:[],
            salary:'40000',
            notes:'',
            day:'1',
            month:'Jan',
            year:'2021',
            startDate:new Date("1 Jan 2021"),
            id:'',
            nameError:'',
            salaryError:'',
            dateError:'',
            isError:'',
            isUpdate:'',

        }
    }

    handleNameChange = (e) => {
        this.setState({name:e.target.value});
        const nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
        if(nameRegex.test(e.target.value)){
            this.setState({nameError: ''})
            this.setState({isError:false})
        }else{
            this.setState({nameError:'Invalid Name'});
            this.setState({isError:true})
        }
    }

    handleProfileChange = (e) => {
        this.setState({profile:e.target.value});
    }

    handleGenderChange = (e) => {
        this.setState({gender:e.target.value})
    }

    handleSalaryChange =(e) => {
        this.setState({salary:e.target.value});
        if(e.target.value < 40000){
            this.setState({salaryError:'Salary must be greater than 40000'})
            this.setState({isError:true})
        }else{
            this.setState({salaryError:''});
            this.setState({isError:false});
        }
    }

    handleNoteChange = (e) => {
        this.setState({notes:e.target.value});
    } 

    dayChangeHandler = (event) => {
        this.setState({day: event.target.value});
        this.setStartDate(event.target.value, this.state.month, this.state.year);
    }
    monthChangeHandler = (event) => {
        this.setState({month: event.target.value});
        this.setStartDate(this.state.day, event.target.value, this.state.year);
    }
    yearChangeHandler = (event) => {
        this.setState({year: event.target.value});
        this.setStartDate(this.state.day, this.state.month, event.target.value);
    }

    setStartDate = (day, month, year) => {
        let startDateValue = new Date(`${day} ${month} ${year}`);
        this.setState({startDate: startDateValue});
        let now = new Date();
        let difference = Math.abs(now.getTime() - startDateValue.getTime());
        if (startDateValue > now) {
          this.setState({dateError:'Date Cannot be future Date'});
          this.setState({isError:true})
        } else if (difference / (1000 * 60 * 60 * 24) > 30) {
            this.setState({dateError:'Date is beyond 30 days'});
            this.setState({isError:true})
        } else {
          this.setState({dateError:''});
          this.setState({isError:false});
        }
    }


     onCheckChange = (name) => {
        let index = this.state.department.indexOf(name);
        let checkArray = [...this.state.department]
        if (index > -1)
            checkArray.splice(index, 1)
        else
            checkArray.push(name);
        this.setState({department:checkArray});
    }
    getChecked = (name) => {
        return this.state.department && this.state.department.includes(name);
    }

    componentDidMount = () => {
        let id = this.props.match.params.id;
        if(id !== undefined && id !==''){
            new EmployeeService().getEmployeeById(id)
            .then(responseText => {
                this.setEmployeeForm(responseText.data);
            }).catch(error => {
                console.log("Error while Fetching Data");
            })
        }
    }

    setEmployeeForm = (employeeData) => {
        let date = (employeeData.startDate).split(" ");
        this.setState({
            id:employeeData.id,
            name:employeeData.name,
            gender:employeeData.gender,
            department:employeeData.department,
            salary:employeeData.salary,
            notes:employeeData.notes,
            profile:employeeData.profilePic,
            day:date[0],
            month:date[1],
            year:date[2],
            isUpdate:true,
        })
    }

    save = async (event) => {
        event.preventDefault();
        console.log("save button clicked");
        if(this.state.isError){
            window.alert("Please Fill correct values");
        }else{
            let employeeObject = {
                id:this.state.id,
                name: this.state.name,
                department: this.state.department,
                gender:this.state.gender,
                salary:this.state.salary,
                startDate:this.stringifyDate(this.state.startDate),
                notes:this.state.notes,
                profilePic:this.state.profile,
            }
            if(this.state.isUpdate){
                new EmployeeService().updateEmployee(employeeObject).then(responseText => {
                    console.log("data Updated successfully" +JSON.stringify(responseText.data));
                    this.props.history.push('/home');
                 })
                 .catch(err => {
                    console.log("Error While Updated");
                 })

            }else{
                new EmployeeService().addEmployee(employeeObject).then(responseText => {
                    console.log("data added successfully" +JSON.stringify(responseText.data));
                    this.props.history.push('/home');
                 })
                 .catch(err => {
                    console.log("Error While Add");
                 })
            }
        }
       
    }

    stringifyDate = (date) => {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        const newDate = !date ? "undefined" : new Date(Date.parse(date)).toLocaleDateString('en-GB', options);
        return newDate;
      }

    reset =() => {
        this.setState({...initialState});
    }
    
    render(){
        return(
            <div className="payroll-main">
                <header className="header-content">
                    <div className="logo-content">
                        <img src={logo} alt="Employee logo"/>
                        <div>
                            <span className="emp-text">EMPLOYEE</span><br/>
                            <span className="emp-text emp-payroll">PAYROLL</span>
                        </div>
                    </div>
                </header>
                <div className="form-content" onSubmit={this.save} onReset={this.reset}>
                    <form className="form" action="#">
                        <div className="form-header">Employee Payroll Form</div>
                        <div className="row-content">
                            <label className="label text" for="name">Name</label>
                            <input className="input" type="text" id="name" name="name" value={this.state.name} placeholder="Enter Your Name" onChange={(e) => this.handleNameChange(e)} required />
                            <error-output className="text-error" htmlFor="name">{this.state.nameError}</error-output>
                        </div>
                        <div className="row-content">
                            <label className="label text" htmlfor="Profile">Profile image</label>
                            <div className="profile-radio-content">
                            <label>
                                <input type="radio" id="profile1" name="profile"
                                value="../../assets/Ellipse -3.png" required onChange={(e) => this.handleProfileChange(e)} checked={this.state.profile ==='../../assets/Ellipse -3.png'} />
                                <img className="profile" id="image1"src={profile1} alt=""/>                    
                            </label>
                            <label>
                                <input type="radio" id="profile2" name="profile"
                                value="../../assets/Ellipse -1.png" required onChange={(e) => this.handleProfileChange(e)} checked={this.state.profile==='../../assets/Ellipse -1.png'}  />
                                <img className="profile" id="image2"src={profile2} alt=""/>                    
                            </label>
                            <label>
                                <input type="radio" id="profile3" name="profile"
                                value="../../assets/Ellipse -8.png" required onChange={(e) => this.handleProfileChange(e)} checked={this.state.profile==='../../assets/Ellipse -8.png'} />
                                <img className="profile" id="image3"src={profile3} alt=""/>                    
                            </label>
                            <label>
                                <input type="radio" id="profile4" name="profile"
                                value="../../assets/Ellipse -7.png" required onChange={(e) => this.handleProfileChange(e)} checked={this.state.profile==='../../assets/Ellipse -7.png'} />
                                <img className="profile" id="image4"src={profile4} alt=""/>                    
                            </label>
                            </div>
                        </div>
                        <div className="row-content">
                            <label className="label text" for="gender">Gender</label>
                            <div>
                                <input type="radio" id="male" name="gender" value="Male" checked={this.state.gender === 'Male'} onChange={(e) => this.handleGenderChange(e)} />
                                <label className="text" for="male">Male</label>
                                <input type="radio" id="female" name="gender" value="Female" checked={this.state.gender === 'Female'} onChange={(e) => this.handleGenderChange(e)}/>
                                <label className="text" for="female">Female</label>
                                <input type="radio" id="other" name="gender" value="Other" checked={this.state.gender === 'Other'}onChange={(e) => this.handleGenderChange(e)}/>
                                <label className="text" for="other">Other</label>
                            </div>
                        </div>
                        <div className="row-content">
                            <label className="label text" for="department">Department</label>
                            <div>
                            {this.state.allDepartment.map(item => (
                                <span key={item}>
                                    <input className="checkbox" type="checkbox" name={item} checked={this.getChecked(item)} onChange={() => this.onCheckChange(item)}
                                    value={item} />
                                    <label className="text" htmlFor={item}>{item}</label>
                                </span>
                            ))}
                            </div>
                        </div>
                        <div className="row-content">
                            <label className="label text" htmlFor="salary">Salary</label>
                            <input className="input" type="number" onChange={(e) => this.handleSalaryChange(e)} id="salary" name="salary" value={this.state.salary} placeholder="Salary"/>
                            <error-output className="salary-error" htmlFor="salary">{this.state.salaryError}</error-output>
                        </div>
                        <div className="row-content">
                            <label className="label text" for="notes">Note</label>
                            <textarea id="notes" className="input" name="notes" placeholder="" value={this.state.notes} onChange={(e) => this.handleNoteChange(e)}></textarea>
                        </div>
                        <div className="row-content">
                            <label className="label text" for="startDate">Start Date</label>
                            <div id="date">
                                <select id="day" name="day" value={this.state.day} onChange={(e) =>this.dayChangeHandler(e) }>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                                <option value="31">31</option>
                                </select>
                                <select id="month" name="month" value={this.state.month} onChange={(e) => this.monthChangeHandler(e)}>
                                    <option value="Jan">January</option>
                                    <option value="Feb">February</option>
                                    <option value="Mar">March</option>
                                    <option value="Apr">April</option>
                                    <option value="May">May</option>
                                    <option value="Jun">June</option>
                                    <option value="Jul">July</option>
                                    <option value="Aug">August</option>
                                    <option value="Sep">September</option>
                                    <option value="Oct">October</option>
                                    <option value="Nov">November</option>
                                    <option value="Dec">December</option>
                                </select>
                                <select id="year" name="year" value={this.state.year} onChange={(e) => this.yearChangeHandler(e)}>
                                    <option value="2021">2021</option>
                                    <option value="2020">2020</option>
                                    <option value="2019">2019</option>
                                    <option value="2018">2018</option>
                                    <option value="2017">2017</option>
                                    <option value="2016">2016</option>
                                </select>
                            </div>
                            <error-output className="date-error" htmlFor="startDate">{this.state.dateError}</error-output>
                        </div>
                        <div className="button-content">
                            <Link to="home" className="resetButton button cancelButton">
                                Cancel
                            </Link>
                            <div className="submit-reset">
                                <button type="submit" className="button submitButton" id="submitButton">Submit</button>
                                <button type="reset" className="resetButton button" id="resetBtn">Reset</button>
                            </div>
                        </div>

                    </form>

                </div>

            </div>
        );
    }
}
export default withRouter(Payroll);