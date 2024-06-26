import axios from "axios";

//VVN
export const fetchEmployees = async (page, criteria = null) => {
    try {
        let url = `http://localhost:8080/api/employee?page=${page}`;
        if (criteria) {
            const queryParams = new URLSearchParams(criteria).toString();
            url += `&${queryParams}`;
        }
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching employee data:', error);
        return {content: [], totalPages: 1};
    }
};

//VTTR
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
    } catch (e) {
        console.log("Error at EmployeeService/findEmployeeById:" + e)
    }
};

export const deleteEmployeeById = async (id) => {
    try {
        await axios.put(`http://localhost:8080/api/employee/delete/${id}`)
        return true
    } catch (e) {
        console.log("Error at EmployeeService/deleteEmployeeById:" + e)
        return false
    }
}

export const gettAllExistEmail = async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/employee/email");
        return response.data;
    } catch (error) {
        console.error('Error fetching gettAllExistEmail:', error);
        return [];
    }
}

