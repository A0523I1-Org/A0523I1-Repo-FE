import axios from "axios";

//VVN
export const fetchEmployees = async (page, criteria = null, token) => {
    try {
        let url = `http://localhost:8080/api/employee?page=${page}`;
        if (criteria) {
            const queryParams = new URLSearchParams(criteria).toString();
            url += `&${queryParams}`;
        }
        const response = await axios.get(url,
            {
                headers: {Authorization: `Bearer ${token}`}
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching employee data:', error);
        return {content: [], totalPages: 1};
    }
};

export async function getMyProfile(token) {
    try {
        const response = await axios.get(`http://localhost:8080/api/employee/my-info`, {
            headers: {Authorization: `Bearer ${token}`}
        })
        console.log(response)
        return response.data;
    } catch (err) {
        throw err;
    }
}


//VTTR
export const addEmployee = async (employeeReqDTO, token) => {
    try {
        const response = await axios.post("http://localhost:8080/api/employee/add", employeeReqDTO, {
            headers: {Authorization: `Bearer ${token}`}
        });
        return response.status === 201;
    } catch (e) {
        console.log("Error at EmployeeService/addEmployee:", e.message);
        return false;
    }
}

export const findEmployeeById = async (id, token) => {
    try {
        let employee = await axios.get(`http://localhost:8080/api/employee/${id}`,
            {
                headers: {Authorization: `Bearer ${token}`}
            }
        )
        return employee.data
    } catch (e) {
        console.log("Error at EmployeeService/findEmployeeById:" + e)
    }
};

export const deleteEmployeeById = async (id, token) => {
    try {
        let res = await axios.put(`http://localhost:8080/api/employee/delete/${id}`, {},
            {
                headers: {Authorization: `Bearer ${token}`}
            }
        )
        return res.status === 200
    } catch (e) {
        console.log("Error at EmployeeService/deleteEmployeeById:", e.message);
        return false;
    }
}

export const getAllExistEmail = async (token) => {
    try {
        const response = await axios.get("http://localhost:8080/api/employee/email",
            {
                headers: {Authorization: `Bearer ${token}`}
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching getAllExistEmail:', error);
        return [];
    }
}

export const getEmployeeUpdate = async (id, token) => {
    try {

        let response = await axios.get(`http://localhost:8080/api/employee/getUpdate/${id}`,
            {
                headers: {Authorization: `Bearer ${token}`}
            }
        )
        if (response.status === 200) {
            return response.data
        } else {
            return null;
        }
    } catch (e) {
        console.log("Error at EmployeeService/getEmployeeUpdate:", e.message);
        return null;
    }
};

export const updateEmployee = async (employeeReqDTO, token) => {
    try {
        let response = await axios.put(`http://localhost:8080/api/employee/update`, employeeReqDTO,
            {
                headers: {Authorization: `Bearer ${token}`}
            }
        )
        return response.status === 200;
    } catch (e) {
        console.log("Error at EmployeeService/updateEmployee:", e.message);
        return false;
    }
}