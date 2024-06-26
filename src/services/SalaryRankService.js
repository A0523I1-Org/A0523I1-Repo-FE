import axios from "axios";

export const getAllSalaryRanks = async (token) => {
    try {
        const response = await axios.get("http://localhost:8080/api/salary-rank",
            {
                headers: {Authorization: `Bearer ${token}`}
            }
            );
        return response.data;
    } catch (error) {
        // console.error('Error fetching salary ranks:', error);
        return [];
    }
};