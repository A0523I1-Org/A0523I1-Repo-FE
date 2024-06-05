import axios from "axios";

export const findAllContract = async(page) => {
    try {
        const res = await axios.get(`http://localhost:8080/api/contract?page=${page}`);
        return res.data;
    } catch (error) {
        return error
    }
}