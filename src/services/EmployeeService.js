import axios from "axios";

export async function getMyProfile(token){
    try{
        const response = await axios.get(`http://localhost:8080/api/employee/my-info`, {
                headers: {Authorization: `Bearer ${token}`}
            })
        return response.data;
    }catch(err){
        throw err;
    }
}
