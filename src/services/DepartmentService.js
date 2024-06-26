import axios from "axios";

export const getAllDepartments = async (token) => {
    try {
        const response = await axios.get("http://localhost:8080/api/department",
            {
                headers: {Authorization: `Bearer ${token}`}
            }
        );
        return response.data;
    } catch (error) {
        // console.error('Error fetching departments:', error);
        return [];
    }
};