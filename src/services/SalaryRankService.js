import axios from "axios";

export const getSalaryRankList = async () => {
    try {
        const  list = await axios.get("http://localhost:8080/api/salary/list")
        return list.data;
    }catch (e) {
        console.log("Error at SalaryRankService/getSalaryRankList:" + e)
    }
}

