import axios from "axios";

export const gettAllCustomers = async () => {
    try {
        const proCustomers = await axios.get(
            `http://localhost:8080/api/customer/list`
        );
        return proCustomers.data;
    } catch (e) {
        console.log(e);
    }
};
export const createCustomer = async (customer) => {
    try {
        await axios.post(`http://localhost:8080/api/customer/create`, customer);
    } catch (e) {
        console.log(e);
    }
};
export const editCustomer = async (id,customer) => {
    try {
        await axios.put(`http://localhost:8080/api/customer/${id}`,customer);
    } catch (e) {
        console.log(e);
    }
};
export const findbyCustomerId = async (id) => {
    try {
        await axios.get(`http://localhost:8080/api/customer/${id}`);
    } catch (e) {
        console.log(e);
    }
};

export const deleteCustomer = async (id)=>{
    try{
        await axios.delete(`http://localhost:8080/api/customer/${id}`)
    }catch(e){
        console.log(e)
    }
}
export const deleteCustomers = async (...ids) => {
    try {
        for (let i = 0; i < ids.length; i++) {
            await axios.delete(`http://localhost:8080/api/customer/deleteBatch?ids=${ids[i]}`);
            console.log([ids[i]])
        }
        console.log("Deleted customers successfully.");
    } catch (e) {
        console.error("Error deleting customers:", e);
    }
};

export const searchByName = async (page,nameSearch) => {
    try {
        const listSearch = await axios.get(
            `http://localhost:8080/api/customer/search?page=${page}&name=${nameSearch}`
        );
        return listSearch.data;
    } catch (e) {
        console.log(e);
    }
};

export const getPage = async (page) => {
    const response = await axios.get(`http://localhost:8080/api/customer/list?page=${page}`);
    return response.data;
};

