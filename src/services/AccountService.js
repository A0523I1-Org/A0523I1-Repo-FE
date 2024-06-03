import axios from "axios";

export async function login(username, password){
    try {
        const response = await axios.post(`http://localhost:8080/login`, {username, password})
        return response.data;
    } catch(err) {
        throw err;
    }
}
