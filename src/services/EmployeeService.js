import axios from "axios";

const API_URL = 'http://localhost:8080/api';

export const getAllDepartments = async () => {
    try {
        const response = await axios.get(`${API_URL}/department`);
        return response.data;
    } catch (error) {
        console.error('Error fetching departments:', error);
        return [];
    }
};

export const getAllSalaryRanks = async () => {
    try {
        const response = await axios.get(`${API_URL}/salary-rank`);
        return response.data;
    } catch (error) {
        console.error('Error fetching salary ranks:', error);
        return [];
    }
};

export const fetchEmployees = async (page, criteria = null) => {
    try {
        let url = `${API_URL}/employee?page=${page}`;
        if (criteria) {
            const queryParams = new URLSearchParams(criteria).toString();
            url += `&${queryParams}`;
        }
        console.log("CHECK THIS")
        console.log(url)
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching employee data:', error);
        return { content: [], totalPages: 1 };
    }
};
