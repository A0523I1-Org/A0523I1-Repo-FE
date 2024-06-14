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
export const deleteContract = (contractId) =>{
    return axios.delete(`${API_ENDPOINT.BASE_URL}${API_ENDPOINT.CONTRACTS}/${contractId}`);
}