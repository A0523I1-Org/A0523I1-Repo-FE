import axios from "axios";

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
        await axios.post(`http://localhost:8080/api/contract?confirmPassword=${confirmPassword}`,contract);
        return true ;
    } catch (error) {
        return error.response.data;
    }

}