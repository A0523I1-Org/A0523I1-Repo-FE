import axios from "axios";

const API_URL = 'http://localhost:8080/api';


// VTTR
export const addEmployee = async (employeeReqDTO) => {
    try {
        const response = await axios.post("http://localhost:8080/api/employee/add", employeeReqDTO);
        return response.status === 201;
    } catch (e) {
        if (e.response && e.response.status === 400) {
            console.log("BadRequest error at EmployeeService/addEmployee:", e.response.data);
        } else {
            console.log("Error at EmployeeService/addEmployee:", e.message);
        }
        return false;
    }
}


export const findEmployeeById = async (id) => {
    try {
        let employee = await axios.get(`http://localhost:8080/api/employee/${id}`)
        return employee.data
    } catch (e) {
        console.log("Error at EmployeeService/findEmployeeById:" + e)
    }
}

export const deleteEmployeeById = async (id) => {
    try {
        await axios.put(`http://localhost:8080/api/employee/${id}`)
        return true
    } catch (e) {
        console.log("Error at EmployeeService/deleteEmployeeById:" + e)
        return false
    }
}


// Nguyen Van Vu

export const fetchEmployees = async (page, criteria = null) => {
    try {
        let url = `${API_URL}/employee?page=${page}`;
        if (criteria) {
            const queryParams = new URLSearchParams(criteria).toString();
            url += `&${queryParams}`;
        }
        console.log("CHECK THIS")
        console.log(url)
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching employee data:', error);
        return {content: [], totalPages: 1};
    }
};