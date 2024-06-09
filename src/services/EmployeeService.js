import axios from "axios";

export const addEmployee = async (employeeReqDTO) => {
    try {
        await axios.post("http://localhost:8080/api/employee/add", employeeReqDTO)
        return true;
    } catch (e) {
        console.log("Error at EmployeeService/addEmployee:" + e)
        return false;
    }
}