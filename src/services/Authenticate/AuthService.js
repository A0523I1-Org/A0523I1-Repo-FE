import axios from "axios";
/** Call API */
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            // Redirect to unauthorized page
            window.location.href = '/unauthorized';
        }
        return Promise.reject(error);
    }
);

export async function login(username, password){
    try {
        const response = await axios.post(`http://localhost:8080/login`, {username, password})
        console.log(response)
        return response.data;
    } catch(err) {
        throw err;
    }
}
export async function logout(token){
    try {
        await axios.get(`http://localhost:8080/logout`, {
            headers: {Authorization: `Bearer ${token}`}
        });

        // Clear token from localStorage và sessionStorage
        localStorage.removeItem('token');
        localStorage.removeItem('role');

        sessionStorage.removeItem('token');
        sessionStorage.removeItem('role');

    } catch(err) {
        throw err;
    }
}
/** AUTHENTICATION CHECKER */
export function isAuthenticated() {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
    return !!token
}
export function isAdmin() {
    const role = localStorage.getItem('role')
    if (!role) {
        return false;
    }
    return role.includes('ADMIN');
}

// get token
export function getToken() {
    let token = localStorage.getItem('token');
    if (!token) {
        token = sessionStorage.getItem('token');
    }
    return token;
}

