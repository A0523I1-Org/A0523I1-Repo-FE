import axios from "axios";

/** Call API */
export async function login(username, password){
    try {
        const response = await axios.post(`http://localhost:8080/login`, {username, password})
        console.log(response.data)
        return response.data;
    } catch(err) {
        throw err;
    }
}

export async function logout(token){
    try {
        const response = await axios.post('http://localhost:8080/logout', {
            headers: {Authorization: `Bearer ${token}`}
        });

        // Clear token from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('role');

    } catch(err) {
        throw err;
    }
}


/** AUTHENTICATION CHECKER */
export function isAuthenticated() {
    const token = localStorage.getItem('token')
    return !!token
}

export function isAdmin() {
    const role = localStorage.getItem('role')
    if (!role) {
        return false;
    }
    return role.includes('ADMIN');
}








