
import {API_ENDPOINT} from './HelperService'
import axios from "axios";

export const getContractById =  async (contractId) =>{
    try {
        const result = await axios.get(`${API_ENDPOINT.BASE_URL}${API_ENDPOINT.CONTRACTS}/${contractId}`);
        return  result.data;
    }catch (e) {
        console.log(e);
    }

}

export const updateContract = (contractId,contract) =>{

    return axios.put(`${API_ENDPOINT.BASE_URL}${API_ENDPOINT.CONTRACTS}/${contractId}`,contract);
}
export const deleteContract = (contractId) => {
    return axios.delete(`${API_ENDPOINT.BASE_URL}${API_ENDPOINT.CONTRACTS}/${contractId}`);

}

export const findAllContract = async(page,customeName,landingCode,startDate,endDate) => {
    console.log(customeName);
    try {
        const res = await axios.get(`http://localhost:8080/api/contract?page=${page}&customerName=${customeName}
            &landingCode=${landingCode}&startDate=${startDate}&endDate=${endDate}`);
            console.log(res.data);
        return res.data;
    } catch (error) {
        return error
    }
}
export const createContract = async(contract,confirmPassword) => {
    console.log(contract);
    try {
        await axios.post(`http://localhost:8080/api/contract?confirmPassword=${confirmPassword}`, contract);
        return true;
    } catch (error) {
        return error.response.data;
    }
}
