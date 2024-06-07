import axios from "axios";

export const getAllFloor = async () => {
    try {
        const res = await axios.get("http://localhost:8080/landing/listFloor");
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}