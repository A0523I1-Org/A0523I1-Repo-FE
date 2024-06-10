import axios from "axios";

export async function login(username, password){
    try {
        const response = await axios.post(`http://localhost:8080/login`, {username, password})
        return response.data;
    } catch(err) {
        throw err;
    }
}

export async function changePassword(token, oldPassword, newPassword){
    try{
        const response = await axios.post('http://localhost:8080/change-password', {oldPassword, newPassword}, {
            headers: {Authorization: `Bearer ${token}`}
        })
        // console.log(response)
        return response.data;
    }catch(err){
        throw err;
    }
}