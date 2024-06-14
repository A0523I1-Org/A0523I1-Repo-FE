import axios from "axios";

/** Call API */
export async function login(username, password){
    try {
        const response = await axios.post(`http://localhost:8080/login`, {username, password})

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

    } catch(err) {
        throw err;
    }
}


/** AUTHENTICATION CHECKER */
export function isAuthenticated() {
    const token = localStorage.getItem('token')
    return !!token
}

// export async function isAdmin() {
//
//     // if (!role) {
//     //     return false;
//     // }
//     // return role.includes('ADMIN');
// }

// Function to get roles from backend API
export async function getRoles() {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/api/roles', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data; // Assuming response.data is an array of roles
    } catch (error) {
        console.error('Error fetching roles:', error);
        return null;
    }
}






