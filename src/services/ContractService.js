
import {API_ENDPOINT} from './HelperService'
import axios from "axios";

import React from "react";
export const getContractById =  async (contractId) =>{
    try {
        const result = await axios.get(`${API_ENDPOINT.BASE_URL}${API_ENDPOINT.CONTRACTS}/${contractId}`);
        console.log(result.data)
        return  result.data;
    }catch (e) {
        throw e.response.data;
    }

}

export const updateContract = async (contractId,contract) =>{
    try {
        return await axios.put(`${API_ENDPOINT.BASE_URL}${API_ENDPOINT.CONTRACTS}/${contractId}`,contract);
    }catch (e) {
        if (e.response && e.response.data){
            throw e.response.data;
        }else {
            console.log(e);
        }
    }

}


export const deleteContract =  async (contractId) => {
      try {
          return await axios.delete(`${API_ENDPOINT.BASE_URL}${API_ENDPOINT.CONTRACTS}/${contractId}`)
      }catch (e) {
          if (e.response && e.response.data){
              throw e.response.data.message;
          }else {
              console.log(e)
          }
      }

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
