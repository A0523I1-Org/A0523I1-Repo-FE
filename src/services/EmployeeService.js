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

//VTTR
export const addEmployee = async (employeeReqDTO, token) => {
    try {
        await axios.post("http://localhost:8080/api/employee/add", employeeReqDTO,
            {
                headers: {Authorization: `Bearer ${token}`}
            }
        )
        return true;
    } catch (e) {
        console.log("Error at EmployeeService/addEmployee:" + e)
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
        await axios.put(`http://localhost:8080/api/employee/delete/${id}`,{},
            {
                headers: {Authorization: `Bearer ${token}`}
            }
        )
        return true
    } catch (e) {
        console.log("Error at EmployeeService/deleteEmployeeById:" + e)
        return false
    }
}

export const updateEmployee = async (id, token) => {
    try {
        await axios.put(`http://localhost:8080/api/employee/update`,employeeReqDTO ,
            {
                headers: {Authorization: `Bearer ${token}`}
            }
        )
        return true
    } catch (e) {
        console.log("Error at EmployeeService/updateEmployee:" + e)
        return false
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
