import axios from "axios";
//Hoai NT
export const findAllContract = async(page,customeName,landingCode,startDate,endDate,token) => {
    
    try {
        const res = await axios.get(`http://localhost:8080/api/contract?page=${page}&customerName=${customeName}
            &landingCode=${landingCode}&startDate=${startDate}&endDate=${endDate}`,
            {
                headers: {Authorization: `Bearer ${token}`}
            }
        );
        return res.data;
    } catch (error) {
        return error
    }
}
// Hoài NT
export const createContract = async(contract,confirmPassword, token) => {
    try {
        await axios.post(`http://localhost:8080/api/contract?confirmPassword=${confirmPassword}`,contract, {
            headers: {Authorization : `Bearer ${token}`}
        }

        );
        return true ;
    } catch (error) {
        return error.response.data;
    }

}