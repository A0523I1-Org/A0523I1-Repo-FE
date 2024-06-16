import axios from "axios";

export const registerEmployee = (employeeId, username, password) => {
    return axios.post(`http://localhost:8080/api/account/employee/${employeeId}`, {
        username,
        password,
    });
};