import config from '../config/config';
import AxiosService from './axios-service';


export default class EmployeeService{
    baseUrl = config.baseUrl;
    addEmployee(employeeData){
        return AxiosService.postService(`${this.baseUrl}employee/create`, employeeData);
    }
    getAllEmployees() {
        return AxiosService.getService(`${this.baseUrl}employee`);
    }
    deleteEmployee(employeeId){
        return AxiosService.deleteService(`${this.baseUrl}employee/delete/${employeeId}`);
    }

    getEmployeeById(employeeId){
        return AxiosService.getService(`${this.baseUrl}employee/get/${employeeId}`);
    }

    updateEmployee(employeeData){
        return AxiosService.putService(`${this.baseUrl}employee/update/${employeeData.id}`,employeeData)
    }

}
