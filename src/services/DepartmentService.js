import axios from "axios";

export const getAllDepartments = async () => {
    try {
        const  list = await axios.get("http://localhost:8080/api/department")
        return list.data;
    }catch (e) {
        console.log("Error at DepartmentService/getDepartmentList:" + e)
    }
}