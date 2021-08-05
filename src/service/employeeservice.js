import config from '../config/config';
import AxiosService from './axios-service';


export default class EmployeeService{
    baseUrl = config.baseUrl;
    addEmployee(employeeData){
        return AxiosService.postService(`${this.baseUrl}employee`,employeeData);
    }
    getAllEmployees() {
        return AxiosService.getService(`${this.baseUrl}employee`);
    }
    deleteEmployee(employeeId){
        return AxiosService.deleteService(`${this.baseUrl}employee/${employeeId}`);
    }

    getEmployeeById(employeeId){
        return AxiosService.getService(`${this.baseUrl}employee/${employeeId}`);
    }

    updateEmployee(employeeData){
        return AxiosService.putService(`${this.baseUrl}employee/${employeeData.id}`,employeeData)
    }

}
