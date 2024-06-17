import axios from "axios";

export const getAllSalaryRanks = async () => {
    try {
        const  list = await axios.get("http://localhost:8080/api/salary-rank")
        return list.data;
    }catch (e) {
        console.log("Error at SalaryRankService/getSalaryRankList:" + e)
    }
}

/*export const getAllSalaryRanks = async () => {
    try {
        const response = await axios.get(`${API_URL}/salary-rank`);
        return response.data;
    } catch (error) {
        console.error('Error fetching salary ranks:', error);
        return [];
    }
};*/

