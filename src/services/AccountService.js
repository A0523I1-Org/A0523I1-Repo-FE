import axios from "axios";


export async function changePassword(token, oldPassword, newPassword){
    try{
        const response = await axios.post('http://localhost:8080/change-password', {oldPassword, newPassword}, {
            headers: {Authorization: `Bearer ${token}`}
        })

        return response.data;
    }catch(err){
        throw err;
    }
}