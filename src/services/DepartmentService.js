import axios from "axios";

export const getDepartmentList = async () => {
    try {
        const  list = await axios.get("http://localhost:8080/api/department/list")
        return list.data;
    }catch (e) {
        console.log("Error at DepartmentService/getDepartmentList:" + e)
    }
}