import axios from "axios";

export const getAllDepartments = async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/department");
        return response.data;
    } catch (error) {
        console.error('Error fetching departments:', error);
        return [];
    }
};