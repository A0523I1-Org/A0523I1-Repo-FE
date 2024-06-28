
import {API_ENDPOINT} from './HelperService'
import axios from "axios";
import React from "react";
export const getContractById =  async (contractId,token) =>{
    try {
        const result = await axios.get(`${API_ENDPOINT.BASE_URL}${API_ENDPOINT.CONTRACTS}/${contractId}`,{
            headers: {Authorization: `Bearer ${token}`}
        });
        return  result.data;
    }catch (e) {
        throw e.response.data;
    }

}

export const updateContract = async (contractId,contract,token) =>{
    try {
        return await axios.put(`${API_ENDPOINT.BASE_URL}${API_ENDPOINT.CONTRACTS}/${contractId}`,contract,  {
            headers: {Authorization: `Bearer ${token}`}
        });
    }catch (e) {
        if (e.response && e.response.data){
            throw e.response.data;
        }else {
            console.log(e);
        }
    }

}


export const deleteContract =  async (contractId,token) => {
      try {
          return await axios.delete(`${API_ENDPOINT.BASE_URL}${API_ENDPOINT.CONTRACTS}/${contractId}`,  {
              headers: {Authorization: `Bearer ${token}`}
          })
      }catch (e) {
          if (e.response && e.response.data){
              throw e.response.data.message;
          }else {
              console.log(e)
          }
      }

}


//Hoai NT
export const findAllContract = async(page,customeName,landingCode,startDate,endDate,fieldSort,token) => {

    try {
        const res = await axios.get(`http://localhost:8080/api/contract?page=${page}&customerName=${customeName}
            &landingCode=${landingCode}&startDate=${startDate}&endDate=${endDate}&fieldSort=${fieldSort}`,
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
    console.log(contract);
    try {
        await axios.post(`http://localhost:8080/api/contract/${confirmPassword}`,contract, {
            headers: {Authorization : `Bearer ${token}`}
        }
        );
        return true ;
    } catch (error) {
        return error.response.data;
    }

}

//Hoai NT
export const sendMailToCustomer = async(contract, token) => {
    try {
        await axios.post(`http://localhost:8080/api/contract/send-mail`,contract, {
            headers: {Authorization : `Bearer ${token}`}
        }
        );

    } catch (error) {
        return error.response.data;
    }
}

