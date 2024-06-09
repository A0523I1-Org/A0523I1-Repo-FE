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


export const findEmployeeById = async (id) => {
    try {

        let employee = await axios.get(`http://localhost:8080/api/employee/${id}`)
        return employee.data
    }catch (e) {
        console.log("Error at EmployeeService/findEmployeeById:" + e)
    }
}

export const deleteEmployeeById = async (id) => {
    try {

        await axios.delete(`http://localhost:8080/api/employee/delete/${id}`)
        return true
    }catch (e) {
        console.log("Error at EmployeeService/deleteEmployeeById:" + e)
        return false
    }
}